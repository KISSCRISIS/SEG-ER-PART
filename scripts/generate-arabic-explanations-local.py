from __future__ import annotations

import json
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / ".local-py"))
from argostranslate import translate  # type: ignore

ROOT = Path(__file__).resolve().parents[1] / "SEG_CONTENT_LIBRARY" / "02_PROCESSED_CONTENT" / "RESIDENT_EMERGENCY_MEDICINE"
FILES = ["oxford-sce-question-bank.jsonl", "rosen-10e-question-bank.jsonl", "tintinalli-9e-question-bank.jsonl"]


def brief(text: str) -> str:
    normalized = re.sub(r"\s+", " ", text).strip()
    sentences = re.split(r"(?<=[.!?])\s+", normalized)
    return " ".join(sentences[:2])[:900]


def save(path: Path, records: list[dict]) -> None:
    path.write_text("\n".join(json.dumps(item, ensure_ascii=False) for item in records) + "\n", encoding="utf-8")


for name in FILES:
    path = ROOT / name
    records = [json.loads(line) for line in path.read_text(encoding="utf-8").splitlines() if line.strip()]
    pending = [item for item in records if not item.get("arabicExplanation")]
    print(f"{name}: {len(pending)} pending", flush=True)
    for index, item in enumerate(pending, 1):
        source = brief(f"The correct answer is {item['correctAnswer']}. {item['englishExplanation']}")
        item["arabicExplanation"] = translate.translate(source, "en", "ar").strip()
        item["arabicExplanationStatus"] = "local-machine-translation-under-review"
        if index % 20 == 0:
            save(path, records)
            print(f"{name}: {index}/{len(pending)}", flush=True)
    save(path, records)
