#!/usr/bin/env python3
"""Exhaustive overlap check across ALL pairs (not just 20 sampled). HARD GATE 20%."""
import json, re
from itertools import combinations
from pathlib import Path

PATCH = Path(__file__).resolve().parent / "patch.json"
TARGET_CITIES = [
    "toronto-on", "mississauga-on", "brampton-on", "hamilton-on", "ottawa-on",
    "los-angeles-ca", "san-francisco-ca", "san-diego-ca",
]
TARGET_SLUGS = ["facility-maintenance", "plumber", "electrician", "hvac", "commercial-contracting"]


def strip_html(s):
    return re.sub(r"<[^>]+>", " ", s)


def page_text(p):
    parts = [p.get("intro", ""), p.get("local_context", ""), p.get("service_details", ""), strip_html(p.get("deep_dive", ""))]
    for f in p.get("faq", []):
        parts.append(f.get("q", ""))
        parts.append(f.get("a", ""))
    return " ".join(parts).lower()


def shingles(text, n=5):
    toks = re.findall(r"\w+", text)
    return set(tuple(toks[i:i+n]) for i in range(len(toks)-n+1))


def jaccard(a, b):
    if not a or not b:
        return 0.0
    return len(a & b) / len(a | b)


def main():
    with open(PATCH) as f:
        patch = json.load(f)

    pages = {}
    for ck in TARGET_CITIES:
        for sl in TARGET_SLUGS:
            url = f"/{ck}-{sl}"
            if url in patch:
                pages[(ck, sl)] = patch[url]

    page_shingles = {k: shingles(page_text(v)) for k, v in pages.items()}

    fails_svc = []
    fails_city = []
    worst_svc = 0.0
    worst_city = 0.0

    # Same-service different-city (ALL pairs)
    print("=== Same-service different-city (ALL pairs) ===")
    for sl in TARGET_SLUGS:
        keys = [(ck, sl) for ck in TARGET_CITIES if (ck, sl) in pages]
        for a, b in combinations(keys, 2):
            j = jaccard(page_shingles[a], page_shingles[b])
            if j > worst_svc:
                worst_svc = j
            if j > 0.20:
                fails_svc.append((a, b, j))
                print(f"  FAIL {a[0]} vs {b[0]} [{sl}]: {j*100:.1f}%")
    print(f"worst same-service: {worst_svc*100:.1f}%, fails: {len(fails_svc)}")

    print()
    print("=== Same-city different-service (ALL pairs) ===")
    for ck in TARGET_CITIES:
        keys = [(ck, sl) for sl in TARGET_SLUGS if (ck, sl) in pages]
        for a, b in combinations(keys, 2):
            j = jaccard(page_shingles[a], page_shingles[b])
            if j > worst_city:
                worst_city = j
            if j > 0.20:
                fails_city.append((a, b, j))
                print(f"  FAIL {a[1]} vs {b[1]} [{ck}]: {j*100:.1f}%")
    print(f"worst same-city: {worst_city*100:.1f}%, fails: {len(fails_city)}")

    print()
    print(f"WORST OVERALL: {max(worst_svc, worst_city)*100:.1f}%")
    print(f"Total fails: {len(fails_svc) + len(fails_city)}")
    if fails_svc or fails_city:
        return 1
    print("GATE: PASS")
    return 0


if __name__ == "__main__":
    import sys
    sys.exit(main())
