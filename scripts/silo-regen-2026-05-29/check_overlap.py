#!/usr/bin/env python3
"""
20% overlap gate — token-shingle (5-gram) Jaccard similarity.
- Sample 20 same-service different-city pairs
- Sample 20 same-city different-service pairs
- Combine intro + local_context + service_details + deep_dive (stripped) + faq
- HARD GATE: if any pair > 0.20, return non-zero exit code.
"""
import json, re, random
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

    random.seed(7)

    print("=== Same-service different-city (5-gram Jaccard) ===")
    same_svc_pairs = []
    for sl in TARGET_SLUGS:
        cities_for_sl = [(ck, sl) for ck in TARGET_CITIES if (ck, sl) in pages]
        pairs = list(combinations(cities_for_sl, 2))
        random.shuffle(pairs)
        same_svc_pairs.extend(pairs[:4])

    worst_same_svc = 0.0
    worst_pair_svc = None
    for a, b in same_svc_pairs[:20]:
        sa = shingles(page_text(pages[a]))
        sb = shingles(page_text(pages[b]))
        j = jaccard(sa, sb)
        if j > worst_same_svc:
            worst_same_svc = j
            worst_pair_svc = (a, b)
        marker = " FAIL" if j > 0.20 else ""
        print(f"  {a[0]} vs {b[0]} [{a[1]}]: {j*100:.1f}%{marker}")
    print(f"worst same-service-different-city: {worst_same_svc*100:.1f}%")

    print()
    print("=== Same-city different-service ===")
    same_city_pairs = []
    for ck in TARGET_CITIES:
        services_for_ck = [(ck, sl) for sl in TARGET_SLUGS if (ck, sl) in pages]
        pairs = list(combinations(services_for_ck, 2))
        random.shuffle(pairs)
        same_city_pairs.extend(pairs[:3])

    worst_same_city = 0.0
    worst_pair_city = None
    for a, b in same_city_pairs[:20]:
        sa = shingles(page_text(pages[a]))
        sb = shingles(page_text(pages[b]))
        j = jaccard(sa, sb)
        if j > worst_same_city:
            worst_same_city = j
            worst_pair_city = (a, b)
        marker = " FAIL" if j > 0.20 else ""
        print(f"  {a[1]} vs {b[1]} [{a[0]}]: {j*100:.1f}%{marker}")
    print(f"worst same-city-different-service: {worst_same_city*100:.1f}%")

    worst_total = max(worst_same_svc, worst_same_city)
    print()
    print(f"WORST OVERALL: {worst_total*100:.1f}%")
    print(f"  same-service worst pair: {worst_pair_svc}")
    print(f"  same-city worst pair: {worst_pair_city}")
    print()
    if worst_total > 0.20:
        print("GATE: FAIL (over 20%)")
        return 1
    print("GATE: PASS (under 20%)")
    return 0


if __name__ == "__main__":
    import sys
    sys.exit(main())
