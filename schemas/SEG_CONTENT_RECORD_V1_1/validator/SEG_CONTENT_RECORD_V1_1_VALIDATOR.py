#!/usr/bin/env python3
"""SEG_CONTENT_RECORD_V1_1_VALIDATOR

Isolated structural validator for the SEG_CONTENT_RECORD_V1_1 profile.

This validator is intentionally not an importer, adapter, migration tool, clinical
reviewer, rights approver, activation service, or publication service. It reads the
input and schema, writes only the requested validation report, and never mutates the
input record or the canonical v1.0 manifest.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from jsonschema import Draft202012Validator, FormatChecker


PROFILE_ID = "SEG_CONTENT_RECORD_V1_1"
VALIDATOR_NAME = "SEG_CONTENT_RECORD_V1_1_VALIDATOR"
VALIDATOR_VERSION = "1.0.0"


def utc_now() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def path_text(path: Any) -> str:
    parts = [str(item) for item in path]
    return ".".join(parts) if parts else "$"


def error_code(error: Any) -> str:
    message = error.message
    if error.validator == "additionalProperties":
        return "SCHEMA_UNKNOWN_FIELD"
    if error.validator == "required":
        return "REQUIRED_FIELD_MISSING"
    if error.validator == "enum":
        return "INVALID_ENUM"
    if error.validator == "pattern":
        if "record_id" in path_text(error.absolute_path) or "book_record_id" in path_text(error.absolute_path):
            return "ID_FORMAT_INVALID"
        return "VALUE_FORMAT_INVALID"
    if error.validator == "format":
        return "DATE_FORMAT_INVALID"
    if error.validator == "minItems":
        return "MIN_ITEMS_VIOLATION"
    if error.validator == "minLength":
        return "MIN_LENGTH_VIOLATION"
    if error.validator == "type":
        return "TYPE_INVALID"
    if error.validator == "oneOf":
        return "CONTENT_TYPE_PAYLOAD_MISMATCH"
    return "SCHEMA_VALIDATION_ERROR"


def structural_error(error: Any) -> dict[str, Any]:
    return {
        "status": "FAIL",
        "path": path_text(error.absolute_path),
        "code": error_code(error),
        "validator": error.validator,
        "message": error.message,
    }


def check_status(name: str, status: str, details: str, **extra: Any) -> dict[str, Any]:
    result: dict[str, Any] = {
        "check": name,
        "status": status,
        "details": details,
    }
    result.update(extra)
    return result


def base_report(args: argparse.Namespace) -> dict[str, Any]:
    return {
        "validator": VALIDATOR_NAME,
        "validator_version": VALIDATOR_VERSION,
        "profile_selection": args.profile,
        "profile_selection_required": True,
        "auto_detection": False,
        "validated_at": utc_now(),
        "input_path": str(Path(args.input).resolve()),
        "input_sha256": None,
        "schema_path": str(Path(args.schema).resolve()),
        "schema_sha256": None,
        "status": "BLOCKED",
        "record_count": 0,
        "records": [],
        "checks": [],
        "missing_fields": [],
        "errors": [],
        "observed_review_status": [],
        "bundle_duplicate_ids": [],
        "remaining_blockers": [],
        "next_allowed_governance_phase": "Stage 1 READ_ONLY intake review or explicitly documented rights/provenance review",
        "non_actions": {
            "content_modified": False,
            "clinical_review_performed": False,
            "approval_granted": False,
            "activation_performed": False,
            "publication_performed": False,
            "database_import_executed": False,
            "application_modified": False,
            "canonical_v1_0_modified": False,
        },
    }


def write_report(path: Path, report: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def validate(args: argparse.Namespace) -> int:
    output_path = Path(args.output)
    report = base_report(args)

    if args.profile != PROFILE_ID:
        report["status"] = "BLOCKED"
        report["remaining_blockers"].append("PROFILE_SELECTION_INVALID")
        report["errors"].append({
            "status": "BLOCKED",
            "path": "profile",
            "code": "PROFILE_SELECTION_INVALID",
            "message": f"Explicit profile selection must equal {PROFILE_ID}.",
        })
        write_report(output_path, report)
        return 3

    schema_path = Path(args.schema)
    input_path = Path(args.input)

    if not schema_path.is_file():
        report["remaining_blockers"].append("SCHEMA_CONTRACT_MISSING")
        report["errors"].append({
            "status": "BLOCKED",
            "path": "schema",
            "code": "SCHEMA_CONTRACT_MISSING",
            "message": f"Schema file does not exist: {schema_path}",
        })
        write_report(output_path, report)
        return 3

    report["schema_sha256"] = sha256_file(schema_path)

    if not input_path.is_file():
        report["remaining_blockers"].append("INPUT_MISSING")
        report["errors"].append({
            "status": "BLOCKED",
            "path": "input",
            "code": "INPUT_MISSING",
            "message": f"Input file does not exist: {input_path}",
        })
        write_report(output_path, report)
        return 3

    report["input_sha256"] = sha256_file(input_path)

    try:
        schema = json.loads(schema_path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        report["remaining_blockers"].append("SCHEMA_JSON_INVALID")
        report["errors"].append({
            "status": "BLOCKED",
            "path": "schema",
            "code": "SCHEMA_JSON_INVALID",
            "message": str(exc),
        })
        write_report(output_path, report)
        return 3

    try:
        raw_input = json.loads(input_path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        report["remaining_blockers"].append("INPUT_JSON_INVALID")
        report["errors"].append({
            "status": "BLOCKED",
            "path": "input",
            "code": "INPUT_JSON_INVALID",
            "message": str(exc),
        })
        write_report(output_path, report)
        return 3

    if isinstance(raw_input, list):
        records = raw_input
    elif isinstance(raw_input, dict):
        records = [raw_input]
    else:
        report["remaining_blockers"].append("RECORD_NOT_OBJECT")
        report["errors"].append({
            "status": "BLOCKED",
            "path": "$",
            "code": "RECORD_NOT_OBJECT",
            "message": "Input must be one JSON object or an array of JSON objects.",
        })
        write_report(output_path, report)
        return 3

    report["record_count"] = len(records)
    validator = Draft202012Validator(schema, format_checker=FormatChecker())
    ids: list[str] = []
    structural_failures: list[dict[str, Any]] = []

    for index, record in enumerate(records):
        record_path = f"[{index}]"
        if not isinstance(record, dict):
            failure = {
                "status": "BLOCKED",
                "path": record_path,
                "code": "RECORD_NOT_OBJECT",
                "message": "Each bundle item must be a JSON object.",
            }
            structural_failures.append(failure)
            report["records"].append({"index": index, "status": "BLOCKED", "record_id": None, "errors": [failure]})
            continue

        record_id = record.get("record_id")
        if isinstance(record_id, str):
            ids.append(record_id)
        errors = [structural_error(error) for error in sorted(validator.iter_errors(record), key=lambda item: list(item.absolute_path))]
        record_status = "FAIL" if errors else "PASS"
        if errors:
            structural_failures.extend(errors)
        report["records"].append({
            "index": index,
            "status": record_status,
            "record_id": record_id if isinstance(record_id, str) else None,
            "content_type": record.get("content_type"),
            "errors": errors,
        })
        if isinstance(record.get("medical_review"), dict):
            report["observed_review_status"].append({
                "index": index,
                "record_id": record_id if isinstance(record_id, str) else None,
                "decision": record["medical_review"].get("decision"),
                "reviewer": record["medical_review"].get("reviewer"),
            })

    duplicates = sorted({record_id for record_id in ids if ids.count(record_id) > 1})
    report["bundle_duplicate_ids"] = duplicates
    if duplicates:
        duplicate_error = {
            "status": "FAIL",
            "path": "bundle",
            "code": "ARCH_DUPLICATE_ID",
            "message": f"Duplicate record_id values: {', '.join(duplicates)}",
        }
        structural_failures.append(duplicate_error)

    report["errors"].extend(structural_failures)
    report["checks"].append(check_status(
        "explicit_profile_selection",
        "PASS",
        f"Validated using explicitly selected profile {PROFILE_ID}; auto-detection is disabled.",
    ))
    report["checks"].append(check_status(
        "closed_world_schema",
        "PASS" if not structural_failures else "FAIL",
        "Unknown properties are rejected by the v1.1 schema." if not structural_failures else "One or more structural errors were found; unknown properties and other contract violations are not repaired.",
    ))
    report["checks"].append(check_status(
        "bundle_duplicate_ids",
        "PASS" if not duplicates else "FAIL",
        "No duplicate record_id values found." if not duplicates else "Duplicate record_id values found.",
    ))
    report["checks"].append(check_status(
        "track_separation",
        "NOT_APPLICABLE",
        "No separate explicit professional-track contract was supplied; track is never inferred from title, folder, or topic.",
    ))
    report["checks"].append(check_status(
        "relationship_orphan_cycle",
        "NOT_APPLICABLE",
        "No explicit book inventory or graph contract was supplied; relationship edges are not inferred.",
    ))
    report["checks"].append(check_status(
        "clinical_review",
        "NOT_APPLICABLE",
        "The validator reports supplied medical_review metadata only; it does not perform or grant clinical approval.",
    ))
    report["checks"].append(check_status(
        "rights_gate",
        "NOT_APPLICABLE",
        "Rights fields are structurally checked by the schema; rights approval and literal-display clearance are separate gates.",
    ))

    if structural_failures:
        report["status"] = "FAIL"
        report["remaining_blockers"] = sorted({item["code"] for item in structural_failures})
        return_code = 2
    else:
        report["status"] = "PASS"
        report["remaining_blockers"] = [
            "STRUCTURAL_PASS_IS_NOT_CLINICAL_APPROVAL",
            "STRUCTURAL_PASS_IS_NOT_RIGHTS_APPROVAL",
            "STRUCTURAL_PASS_IS_NOT_IMPORT_AUTHORIZATION",
        ]
        return_code = 0

    write_report(output_path, report)
    return return_code


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog=VALIDATOR_NAME,
        description="Explicit-profile, read-only validator for SEG_CONTENT_RECORD_V1_1.",
    )
    parser.add_argument("--profile", required=False, default=None, help=f"Required explicit profile selection; must be {PROFILE_ID}.")
    parser.add_argument("--schema", required=True, help="Path to the isolated v1.1 JSON Schema artifact.")
    parser.add_argument("--input", required=True, help="Path to one JSON object or a JSON bundle array.")
    parser.add_argument("--output", required=True, help="Path for the separate validation report JSON.")
    return parser


def main() -> int:
    args = build_parser().parse_args()
    try:
        return validate(args)
    except Exception as exc:  # Defensive boundary: report blockers, never mutate input.
        output_path = Path(args.output)
        report = base_report(args)
        report["remaining_blockers"].append("VALIDATOR_RUNTIME_ERROR")
        report["errors"].append({
            "status": "BLOCKED",
            "path": "$",
            "code": "VALIDATOR_RUNTIME_ERROR",
            "message": str(exc),
        })
        write_report(output_path, report)
        return 3


if __name__ == "__main__":
    sys.exit(main())
