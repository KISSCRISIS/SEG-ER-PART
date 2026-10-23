"""Translate prepared SEG Rosen summaries locally with the installed Argos model.

This does not translate the source PDF. It translates only the short, source-linked
SEG summary/diagnosis/management fields prepared by translate-rosen-summaries.mjs.
"""

from __future__ import annotations

import hashlib
import json
import os
import re
from concurrent.futures import ProcessPoolExecutor, as_completed
from datetime import datetime, timezone
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CONTENT_DIR = ROOT / "SEG_CONTENT_LIBRARY/02_PROCESSED_CONTENT/ROSEN_BARKIN_5MIN"
QUEUE_PATH = CONTENT_DIR / "offline-translation-queue.json"
EDITORIAL_PATH = CONTENT_DIR / "editorial-translations.json"
# Argos lazily creates a shared Stanza resource file on Windows.  Parallel
# workers race on that file, so a resumable serial default is the safe choice.
WORKERS = max(1, int(os.environ.get("SEG_TRANSLATION_WORKERS", "1")))
CHECKPOINT_EVERY = 10


def split_chunks(text: str, max_chars: int = 180) -> list[str]:
    value = " ".join((text or "").split()).strip()
    value = re.sub(
        r"\b(?:DESCRIPTION|ETIOLOGY|RISK FACTORS|ALERT|SIGNS AND SYMPTOMS|HISTORY|PHYSICAL EXAM|ESSENTIAL WORKUP|DIAGNOSIS TESTS & INTERPRETATION|LAB|IMAGING|PRE-HOSPITAL|INITIAL STABILIZATION/THERAPY|EMERGENCY DEPARTMENT TREATMENT AND PROCEDURES)\s*:\s*",
        ". ",
        value,
        flags=re.IGNORECASE,
    )
    value = value.replace("•", ". ")
    if not value:
        return []
    pieces = re.split(r"(?<=[.;!?])\s+|(?=•)", value)
    chunks: list[str] = []
    current = ""
    for piece in pieces:
        piece = piece.strip()
        if not piece:
            continue
        if len(piece) > max_chars:
            words = piece.split()
            for word in words:
                proposed = f"{current} {word}".strip()
                if current and len(proposed) > max_chars:
                    chunks.append(current)
                    current = word
                else:
                    current = proposed
            continue
        proposed = f"{current} {piece}".strip()
        if current and len(proposed) > max_chars:
            chunks.append(current)
            current = piece
        else:
            current = proposed
    if current:
        chunks.append(current)
    return chunks


def normalize_arabic(text: str) -> str:
    value = " ".join((text or "").split()).strip()
    replacements = {
        "الطرق الجوية": "مجرى الهواء",
        "المجرى الجوي": "مجرى الهواء",
        "قسم الحالات الطارئة": "قسم الطوارئ",
        "علاج الضعف الجنسي": "العلاج في قسم الطوارئ",
        "إجراءات الضعف الجنسي": "إجراءات قسم الطوارئ",
        "الصدمة العضلية": "الرضوض",
        "الصدمة الجسدية": "الرضوض",
    }
    for old, new in replacements.items():
        value = value.replace(old, new)
    return value


def translate_text(text: str, *, allow_source_label: bool = False) -> str:
    from argostranslate import translate

    translated = [translate.translate(chunk, "en", "ar").strip() for chunk in split_chunks(text)]
    result = normalize_arabic(" ".join(part for part in translated if part))
    if not re.search(r"[\u0600-\u06ff]", result):
        if allow_source_label:
            # Some isolated eponyms and medical terms are preserved verbatim by
            # the local model. Keep the source wording with an Arabic label,
            # rather than fabricate a clinical equivalent or discard the topic.
            return f"مصطلح كما ورد في المصدر: {text}"
        raise RuntimeError("Argos result did not contain Arabic text")
    return result


def translate_chapter(chapter: dict) -> tuple[str, dict]:
    translated = {
        "title": translate_text(chapter["title"], allow_source_label=True),
        "summary": translate_text(chapter["summary"]),
        "diagnosis": translate_text(chapter["diagnosis"]),
        "management": translate_text(chapter["management"]),
    }
    source_hash = hashlib.sha256(
        "\n".join([chapter["summary"], chapter["diagnosis"], chapter["management"]]).encode("utf-8")
    ).hexdigest()
    draft = {
        "title": chapter["title"],
        "arabicTitle": translated["title"],
        "pdfPages": chapter["pdfPages"],
        "status": "machine-translated-under-review",
        "summary": [{"en": chapter["summary"], "ar": translated["summary"]}],
        "diagnosis": [{"en": chapter["diagnosis"], "ar": translated["diagnosis"]}],
        "management": [{"en": chapter["management"], "ar": translated["management"]}],
        "arabicExplanation": [
            f"الفكرة الأساسية: {translated['summary']}",
            f"للتقييم والتشخيص: {translated['diagnosis']}",
            f"للتدبير: {translated['management']}",
        ],
        "editorialNotes": [
            "ملخص SEG آلي مستند حصراً إلى النص المستخرج من صفحات المصدر المحددة؛ لم تُضف ادعاءات طبية جديدة.",
            "الترجمة العربية آلية محلية وقيد المراجعة اللغوية والسريرية. يجب التحقق من الجرعات والإرشادات المتغيرة زمنيًا قبل الاستخدام السريري.",
        ],
        "provenance": {
            "method": "source-section-extraction-plus-offline-argos-translation",
            "translationScope": "Selected SEG summary only; not a full chapter translation",
            "sourceTextSha256": source_hash,
            "generatedAt": datetime.now(timezone.utc).isoformat(),
        },
    }
    return chapter["chapterId"], draft


def save_editorial(editorial: dict) -> None:
    editorial["version"] = max(2, int(editorial.get("version", 1)))
    editorial["translationScope"] = "Selected SEG summaries, not full source chapters"
    editorial["lastGeneratedAt"] = datetime.now(timezone.utc).isoformat()
    EDITORIAL_PATH.write_text(json.dumps(editorial, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main() -> None:
    queue = json.loads(QUEUE_PATH.read_text(encoding="utf-8"))
    editorial = json.loads(EDITORIAL_PATH.read_text(encoding="utf-8"))
    if queue["sourceSha256"] != editorial["sourceSha256"]:
        raise RuntimeError("Translation queue source fingerprint mismatch")
    # The translation queue is intentionally stable so it can be resumed after
    # an interrupted run.  Preserve every existing editorial record unless a
    # future explicit refresh workflow asks to replace it.
    chapters = [
        chapter for chapter in queue["chapters"]
        if chapter["chapterId"] not in editorial["chapters"]
    ]
    skipped = len(queue["chapters"]) - len(chapters)
    print(
        f"resume: {skipped} existing records preserved; "
        f"{len(chapters)} records remaining",
        flush=True,
    )
    completed = 0
    with ProcessPoolExecutor(max_workers=min(WORKERS, len(chapters) or 1)) as executor:
        futures = {executor.submit(translate_chapter, chapter): chapter["chapterId"] for chapter in chapters}
        for future in as_completed(futures):
            chapter_id, draft = future.result()
            editorial["chapters"][chapter_id] = draft
            completed += 1
            if completed % CHECKPOINT_EVERY == 0 or completed == len(chapters):
                save_editorial(editorial)
                print(f"checkpoint {completed}/{len(chapters)} · chapter {chapter_id}", flush=True)
    save_editorial(editorial)
    print(json.dumps({"translatedNow": completed, "editorialRecords": len(editorial["chapters"])}, ensure_ascii=False))


if __name__ == "__main__":
    main()
