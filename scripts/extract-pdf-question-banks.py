from __future__ import annotations

import hashlib
import json
import re
import sys
from dataclasses import dataclass
from pathlib import Path

from pypdf import PdfReader


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "SEG_CONTENT_LIBRARY" / "02_PROCESSED_CONTENT" / "RESIDENT_EMERGENCY_MEDICINE"
SOURCES = {
    "OXFORD_SCE": Path(r"D:\study\best+of+five+MCQs+acute+medicine++sce+2016.pdf"),
    "ROSEN_10E": Path(r"D:\study\Rosen s+Emergency+Medicine+10e+(Q A).pdf"),
    "TINTINALLI_9E": Path(r"D:\study\Tintinallis+EM+Examination+and+board+review+2023.pdf"),
}


@dataclass
class Page:
    number: int
    text: str


def clean(value: str) -> str:
    value = value.replace("\u00ad", "").replace("�", "'").replace("\xa0", " ")
    value = re.sub(r"(?<=\w)-\s*\n\s*(?=[a-z])", "", value)
    value = re.sub(r"[ \t]+", " ", value)
    value = re.sub(r" *\n *", "\n", value)
    return re.sub(r"\n{3,}", "\n\n", value).strip()


def pages(path: Path) -> list[Page]:
    reader = PdfReader(str(path))
    return [Page(index + 1, clean(page.extract_text() or "")) for index, page in enumerate(reader.pages)]


def option_pairs(block: str, style: str) -> list[dict[str, str]]:
    pattern = r"(?m)^\s*\(([A-E])\)\s*" if style == "paren" else r"(?m)^\s*([A-Ea-e])[\.)]\s*"
    matches = list(re.finditer(pattern, block))
    result = []
    for index, match in enumerate(matches):
        end = matches[index + 1].start() if index + 1 < len(matches) else len(block)
        result.append({"key": match.group(1).upper(), "text": clean(block[match.end():end])})
    return result


def record(source: str, chapter_number: int, chapter_title: str, question_number: int,
           question: str, options: list[dict[str, str]], answer_key: str,
           explanation: str, question_page: int, answer_page: int) -> dict:
    identifier = f"{source.lower().replace('_', '-')}-ch-{chapter_number:02d}-q-{question_number:04d}"
    answer_text = next((item["text"] for item in options if item["key"] == answer_key), answer_key)
    return {
        "id": identifier,
        "track": "resident-emergency-medicine",
        "family": source,
        "chapterNumber": chapter_number,
        "chapterTitle": chapter_title,
        "sourceQuestionNumber": question_number,
        "question": clean(question),
        "options": options,
        "correctAnswerKey": answer_key,
        "correctAnswer": f"{answer_key}. {answer_text}",
        "englishExplanation": clean(explanation),
        "arabicExplanation": "",
        "arabicExplanationStatus": "pending-generation",
        "references": [],
        "sourceLocator": {
            "file": SOURCES[source].name,
            "questionPdfPage": question_page,
            "answerPdfPage": answer_page,
        },
        "governanceStatus": "under-review",
        "usageScope": "private-pilot",
    }


def numbered_blocks(text: str) -> list[tuple[int, str, int]]:
    matches = list(re.finditer(r"(?m)^\s*(\d{1,3})\.\s+", text))
    return [(int(match.group(1)), text[match.end():matches[index + 1].start() if index + 1 < len(matches) else len(text)], match.start()) for index, match in enumerate(matches)]


def page_for_offset(markers: list[tuple[int, int]], offset: int) -> int:
    candidate = markers[0][1]
    for start, page_number in markers:
        if start > offset:
            break
        candidate = page_number
    return candidate


def joined(selected: list[Page]) -> tuple[str, list[tuple[int, int]]]:
    chunks, markers, cursor = [], [], 0
    for page in selected:
        markers.append((cursor, page.number))
        chunks.append(page.text)
        cursor += len(page.text) + 2
    return "\n\n".join(chunks), markers


def extract_separated(source: str, all_pages: list[Page], question_heading: str,
                      answer_heading: str, option_style: str,
                      answer_pattern: str) -> list[dict]:
    qstarts, astarts = [], []
    for index, page in enumerate(all_pages):
        if re.search(question_heading, page.text, re.I) and re.search(r"(?m)^\s*1\.\s+", page.text):
            qstarts.append(index)
        if re.search(answer_heading, page.text, re.I) and re.search(answer_pattern.replace("{n}", "1"), page.text, re.I | re.M):
            astarts.append(index)
    results = []
    for chapter_index, qstart in enumerate(qstarts):
        chapter_number = chapter_index + 1
        astart = next((value for value in astarts if value > qstart), None)
        if astart is None:
            continue
        next_q = qstarts[chapter_index + 1] if chapter_index + 1 < len(qstarts) else len(all_pages)
        question_pages = all_pages[qstart:astart]
        answer_pages = all_pages[astart:next_q]
        qtext, qmarkers = joined(question_pages)
        atext, amarkers = joined(answer_pages)
        title_match = re.search(question_heading, question_pages[0].text, re.I)
        title = clean(title_match.group("title")) if title_match and "title" in title_match.groupdict() else f"Chapter {chapter_number}"
        qblocks = numbered_blocks(qtext)
        answers = []
        amatches = list(re.finditer(answer_pattern.replace("{n}", r"(?P<n>\d{1,3})"), atext, re.I | re.M))
        for idx, match in enumerate(amatches):
            end = amatches[idx + 1].start() if idx + 1 < len(amatches) else len(atext)
            answers.append((int(match.group("n")), match.group("key").upper(), clean(atext[match.end():end]), match.start()))
        answer_map = {number: (key, explanation, offset) for number, key, explanation, offset in answers}
        for number, body, offset in qblocks:
            options = option_pairs(body, option_style)
            if len(options) < 4 or number not in answer_map:
                continue
            first_option = re.search(r"(?m)^\s*(?:\([A-E]\)|[A-E][\.)])\s*", body)
            key, explanation, answer_offset = answer_map[number]
            results.append(record(source, chapter_number, title, number,
                                  body[:first_option.start()] if first_option else body,
                                  options, key, explanation,
                                  page_for_offset(qmarkers, offset), page_for_offset(amarkers, answer_offset)))
    # Page furniture and figure labels can repeat a source number. Keep the
    # first complete record deterministically and make IDs unique by design.
    return list({item["id"]: item for item in results}.values())


def extract_oxford(all_pages: list[Page]) -> list[dict]:
    heading = r"(?P<title>[A-Z][A-Z\s,&\-]+?)\s*(?:\|\s*)?QUESTIONS"
    return extract_separated("OXFORD_SCE", all_pages, heading, r"(?:\|\s*ANSWERS|chapter\s+\d+\s+ANSWERS)", "letter", r"^\s*{n}\.\s*(?P<key>[A-E])\.\s*")


def extract_tintinalli(all_pages: list[Page]) -> list[dict]:
    heading = r"(?P<title>[A-Z][A-Za-z\- ,&]+)\s+QUESTIONS"
    return extract_separated("TINTINALLI_9E", all_pages, heading, r"\bANSWERS\b", "paren", r"^\s*{n}\.\s*The answer is\s+(?P<key>[A-D])\s*\.?")


def extract_rosen(all_pages: list[Page]) -> list[dict]:
    results = []
    chapter = None
    title = "Rosen's Emergency Medicine"
    stream, markers = joined(all_pages)
    headers = list(re.finditer(r"CHAPTER\s+(\d+):\s*QUESTIONS AND ANSWERS(?:—CONT'D\.)?", stream, re.I))
    for header_index, header in enumerate(headers):
        if "CONT" not in header.group(0).upper():
            chapter = int(header.group(1))
        if chapter is None:
            continue
        end = headers[header_index + 1].start() if header_index + 1 < len(headers) else len(stream)
        segment = stream[header.end():end]
        pattern = re.compile(r"(?ms)^\s*(\d{1,3})\.\s+(.*?)(?=^Answer:)^Answer:\s*(.*?)(?=^\s*\d{1,3}\.\s+|\Z)")
        for match in pattern.finditer(segment):
            number, body, answer = int(match.group(1)), clean(match.group(2)), clean(match.group(3))
            options = option_pairs(body, "letter")
            key_match = re.match(r"(?:Statement\s+)?([A-Ea-e])(?:\.|\s+is\b)", answer)
            first_option = re.search(r"(?m)^\s*[A-Ea-e][\.)]\s*", body)
            if len(options) < 3 or not key_match or not first_option:
                continue
            answer_key = key_match.group(1).upper()
            explanation = re.sub(r"^(?:Statement\s+)?[A-Ea-e](?:\.|\s+is\s+(?:the\s+best\s+answer|false|true)\.?)\s*", "", answer, flags=re.I)
            absolute = header.end() + match.start()
            page_number = page_for_offset(markers, absolute)
            results.append(record("ROSEN_10E", chapter, title, number, body[:first_option.start()], options,
                                  answer_key, explanation, page_number, page_number))
    deduped = {}
    for item in results:
        deduped[item["id"]] = item
    return list(deduped.values())


def validate(items: list[dict]) -> dict:
    ids = [item["id"] for item in items]
    return {
        "questions": len(items),
        "duplicateIds": len(ids) - len(set(ids)),
        "missingQuestion": sum(not item["question"] for item in items),
        "fewerThanThreeOptions": sum(len(item["options"]) < 3 for item in items),
        "missingAnswer": sum(not item["correctAnswerKey"] for item in items),
        "missingEnglishExplanation": sum(not item["englishExplanation"] for item in items),
        "pendingArabicExplanation": sum(not item["arabicExplanation"] for item in items),
    }


def main() -> None:
    missing = [str(path) for path in SOURCES.values() if not path.is_file()]
    if missing:
        raise SystemExit(f"Missing PDF sources: {missing}")
    banks = {
        "OXFORD_SCE": extract_oxford(pages(SOURCES["OXFORD_SCE"])),
        "ROSEN_10E": extract_rosen(pages(SOURCES["ROSEN_10E"])),
        "TINTINALLI_9E": extract_tintinalli(pages(SOURCES["TINTINALLI_9E"])),
    }
    OUTPUT.mkdir(parents=True, exist_ok=True)
    for family, items in banks.items():
        target = OUTPUT / f"{family.lower().replace('_', '-')}-question-bank.jsonl"
        target.write_text("\n".join(json.dumps(item, ensure_ascii=False) for item in items) + "\n", encoding="utf-8")
    manifest = {
        "schemaVersion": 1,
        "generatedBy": "scripts/extract-pdf-question-banks.py",
        "governanceStatus": "under-review",
        "usageScope": "private-pilot",
        "sources": {family: {"path": str(path), "sha256": hashlib.sha256(path.read_bytes()).hexdigest(), **validate(banks[family])} for family, path in SOURCES.items()},
    }
    (OUTPUT / "pdf-question-banks-manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(manifest, ensure_ascii=False, indent=2))
    if any(stats[key] for stats in manifest["sources"].values() for key in ("duplicateIds", "missingQuestion", "fewerThanThreeOptions", "missingAnswer", "missingEnglishExplanation")):
        sys.exit(2)


if __name__ == "__main__":
    main()
