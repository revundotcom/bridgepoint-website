#!/usr/bin/env python3
"""Apply patch.json into content.json. Backs up the original first."""
import json, shutil, time
from pathlib import Path

WEBSITE_ROOT = Path(__file__).resolve().parents[2]
CONTENT_JSON = WEBSITE_ROOT / "lib" / "silo" / "content.json"
PATCH = Path(__file__).resolve().parent / "patch.json"


def main():
    backup = CONTENT_JSON.with_suffix(f".json.bak-{int(time.time())}")
    shutil.copy(CONTENT_JSON, backup)
    print(f"Backup: {backup}")

    with open(CONTENT_JSON) as f:
        bundle = json.load(f)
    with open(PATCH) as f:
        patch = json.load(f)

    pages = bundle["pages"]
    by_url = {p["url"]: p for p in pages}

    updated = 0
    for url, fields in patch.items():
        if url not in by_url:
            print(f"MISSING: {url}")
            continue
        for k, v in fields.items():
            by_url[url][k] = v
        updated += 1

    with open(CONTENT_JSON, "w") as f:
        json.dump(bundle, f, indent=2)
    print(f"Updated {updated} pages in {CONTENT_JSON}")


if __name__ == "__main__":
    main()
