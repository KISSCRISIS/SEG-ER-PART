import hashlib
import json
from pathlib import Path

from argostranslate import translate

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "client/public/content/summary-books/tintinalli-high-yield.json"
EDITORIAL = ROOT / "SEG_CONTENT_LIBRARY/02_PROCESSED_CONTENT/TINTINALLI_MANUAL_8E/editorial-translations.json"


def translated(text: str) -> str:
    value = " ".join((text or "").split()).strip()
    if not value:
        return ""
    result = translate.translate(value, "en", "ar").strip()
    replacements = {
        "الطرق الجوية": "مجرى الهواء",
        "قسم الطوارئ": "قسم الطوارئ",
        "الاستعراض": "التقييم",
    }
    for old, new in replacements.items():
        result = result.replace(old, new)
    return result


data = json.loads(SOURCE.read_text(encoding="utf-8"))
editorial = json.loads(EDITORIAL.read_text(encoding="utf-8")) if EDITORIAL.exists() else {}
pending = [chapter for chapter in data["chapters"] if chapter["unitId"] not in editorial]

for index, chapter in enumerate(pending, 1):
    summary_en = " ".join(chapter.get("highYieldSummary", []))
    diagnosis_en = " ".join(chapter.get("diagnosis", []))
    management_en = " ".join(chapter.get("management", []))
    sections = [f"ملخص عربي مبسط:\n{translated(summary_en)}"]
    diagnosis_ar = translated(diagnosis_en)
    management_ar = translated(management_en)
    if diagnosis_ar:
        sections.append(f"التشخيص والتقييم:\n{diagnosis_ar}")
    if management_ar:
        sections.append(f"التدبير والعلاج:\n{management_ar}")
    editorial[chapter["unitId"]] = {
        "arabicTitle": translated(chapter["title"]),
        "arabicExplanation": "\n\n".join(sections),
        "status": "machine-translated-under-review",
        "provenance": "Offline English-to-Arabic translation of the extracted SEG summary only; no new clinical claims added.",
        "sourceTextSha256": hashlib.sha256((summary_en + diagnosis_en + management_en).encode("utf-8")).hexdigest(),
    }
    if index % 5 == 0 or index == len(pending):
        EDITORIAL.write_text(json.dumps(editorial, ensure_ascii=False, indent=2), encoding="utf-8")
        print(f"checkpoint {index}/{len(pending)}", flush=True)

print(f"Translated {len(pending)} pending Tintinalli chapters; total editorial records: {len(editorial)}")
