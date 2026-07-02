#!/usr/bin/env python3
"""Generate Bridgepoint imagery via Google Imagen 4 (Generative Language API)."""
import base64
import json
import os
import sys
import urllib.request
import urllib.error
from pathlib import Path

API_KEY = os.environ.get("GOOGLE_GENAI_API_KEY")
if not API_KEY:
    raise RuntimeError("GOOGLE_GENAI_API_KEY not set")
# Imagen 4 endpoint via the Generative Language API
ENDPOINT = (
    "https://generativelanguage.googleapis.com/v1beta/"
    "models/imagen-4.0-generate-001:predict?key={key}"
)

OUT_BRANDED = Path(__file__).resolve().parents[1] / "public/img/branded"
OUT_TRADE = Path(__file__).resolve().parents[1] / "public/img/trade"
OUT_GALLERY = Path(__file__).resolve().parents[1] / "public/img/gallery"
OUT_BRANDED.mkdir(parents=True, exist_ok=True)
OUT_TRADE.mkdir(parents=True, exist_ok=True)
OUT_GALLERY.mkdir(parents=True, exist_ok=True)

PROMPTS = [
    # (filename, folder, prompt, aspect)
    (
        "van-residential",
        "branded",
        "A clean modern white commercial Mercedes Sprinter style service van. The van has bold cyan-turquoise side branding with the words BRIDGEPOINT MAINTENANCE in white sans-serif type. The van is parked on a residential driveway in front of a Toronto suburban two-story brick home. Golden hour daylight. Photorealistic. No people. Sharp focus. Professional commercial photography. 16:9 wide aspect ratio.",
        "16:9",
    ),
    (
        "van-condo",
        "branded",
        "Photorealistic photograph of a clean modern white commercial service van with cyan turquoise side branding reading 'BRIDGEPOINT MAINTENANCE' in bold white type, parked outside a modern Toronto condo building with glass facade, clean overcast daylight, professional architectural photography, no people, sharp focus, editorial commercial style, 16:9 aspect",
        "16:9",
    ),
    (
        "tech-uniform-toolbox",
        "branded",
        "Photorealistic photograph of a male HVAC technician in his thirties wearing a cyan turquoise polo shirt with a subtle small white Bridgepoint logo patch on the chest, holding a metal toolbox, standing in a modern residential garage, friendly approachable expression, neutral professional pose, sharp focus, soft daylight, commercial editorial photography style, no other branding visible, 3:4 aspect",
        "3:4",
    ),
    (
        "tech-rooftop-condenser",
        "branded",
        "Photorealistic photograph of a male technician in cyan turquoise work uniform shirt servicing a rooftop HVAC condenser unit, kneeling next to the unit with tools, blue sky background, mid-morning natural light, professional trade photography, sharp focus, no visible competitor logos, editorial commercial style, 16:9 aspect",
        "16:9",
    ),
    (
        "tech-under-sink-plumbing",
        "branded",
        "Photorealistic close-up photograph of a male plumber in a cyan turquoise uniform shirt kneeling under a kitchen sink working on copper plumbing pipes with a wrench, focused expression, modern white kitchen interior, soft natural light from a window, sharp focus, no logos visible, editorial style, 16:9 aspect",
        "16:9",
    ),
    (
        "techs-tablet-van",
        "branded",
        "Two male HVAC technicians in matching cyan-turquoise polo shirts with no chest text, standing outdoors next to the open rear doors of a plain white service van with no logos visible, looking together at a tablet computer, friendly professional expressions, daylight, sharp focus, photorealistic commercial photography, 16:9 wide aspect.",
        "16:9",
    ),
    (
        "fleet-row",
        "branded",
        "Photorealistic photograph of three identical white commercial service vans with cyan turquoise side branding reading 'BRIDGEPOINT MAINTENANCE' in white bold type, parked side-by-side in a clean asphalt commercial lot, golden hour, professional architectural commercial photography, sharp focus, no people, 16:9 wide aspect",
        "16:9",
    ),
    # Trade scenes (no van required, just clean trade work)
    (
        "trade-water-heater",
        "trade",
        "Photorealistic photograph of a male technician installing a residential tankless water heater on a basement utility wall, copper piping visible, focused work, natural utility lighting, sharp focus, professional trade photography, 16:9 aspect",
        "16:9",
    ),
    (
        "trade-furnace-basement",
        "trade",
        "A modern high-efficiency residential furnace standing on a basement floor, attached to silver galvanized ductwork above. Clean white walls. Bright lighting. No text, no logos, no people. Realistic photograph. 4:3 aspect.",
        "4:3",
    ),
    (
        "trade-thermostat-smart",
        "trade",
        "Photorealistic photograph of a hand mounting a modern smart thermostat on a clean white living room wall, soft daylight, shallow depth of field, professional product-in-place commercial photography, sharp focus, 4:3 aspect",
        "4:3",
    ),
    (
        "trade-electrical-panel",
        "trade",
        "Photorealistic photograph of a licensed electrician's hands installing a new circuit breaker into a clean modern residential electrical panel, sharp focus, professional trade photography, neutral basement utility lighting, no logos, 16:9 aspect",
        "16:9",
    ),
    (
        "trade-ductwork",
        "trade",
        "Photorealistic photograph of newly installed silver galvanized HVAC ductwork in a residential basement ceiling space, professional architectural detail photography, sharp focus, no people, 16:9 aspect",
        "16:9",
    ),
    # Gallery before/after pairs (residential)
    (
        "gallery-furnace-before",
        "gallery",
        "An old dusty rust-stained beige residential furnace standing in a dim cluttered basement utility room. Beat-up condition. No text, no logos, no people. Realistic photograph. 4:3 aspect.",
        "4:3",
    ),
    (
        "gallery-furnace-after",
        "gallery",
        "A brand new modern silver residential furnace standing in a clean bright basement utility room with white walls. Polished and freshly installed. No text, no logos, no people. Realistic photograph. 4:3 aspect.",
        "4:3",
    ),
    (
        "gallery-pipe-before",
        "gallery",
        "Photorealistic photograph of a corroded burst residential copper water pipe with visible water damage on a basement ceiling, before-repair realism, sharp focus, 4:3 aspect",
        "4:3",
    ),
    (
        "gallery-pipe-after",
        "gallery",
        "Photorealistic photograph of newly soldered clean copper plumbing pipes in a residential basement ceiling, professional plumbing repair work, bright neutral lighting, sharp focus, 4:3 aspect",
        "4:3",
    ),
    (
        "gallery-panel-before",
        "gallery",
        "Photorealistic photograph of an outdated cluttered residential electrical panel with messy wiring, before-renovation, sharp focus, 4:3 aspect",
        "4:3",
    ),
    (
        "gallery-panel-after",
        "gallery",
        "Photorealistic photograph of a clean brand new residential electrical panel with neatly organized wiring, professional electrician work, bright lighting, sharp focus, 4:3 aspect",
        "4:3",
    ),
]


def generate(name: str, folder: str, prompt: str, aspect: str) -> bool:
    out_dir = {"branded": OUT_BRANDED, "trade": OUT_TRADE, "gallery": OUT_GALLERY}[
        folder
    ]
    out_path = out_dir / f"{name}.png"
    if out_path.exists() and out_path.stat().st_size > 50_000:
        print(f"  [skip] {name} exists ({out_path.stat().st_size} bytes)")
        return True

    body = {
        "instances": [{"prompt": prompt}],
        "parameters": {
            "sampleCount": 1,
            "aspectRatio": aspect,
            "personGeneration": "allow_adult",
        },
    }
    url = ENDPOINT.format(key=API_KEY)
    req = urllib.request.Request(
        url,
        data=json.dumps(body).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            data = json.loads(resp.read())
    except urllib.error.HTTPError as e:
        body_text = e.read().decode("utf-8", errors="ignore")[:500]
        print(f"  [HTTP {e.code}] {name}: {body_text}", file=sys.stderr)
        return False
    except Exception as e:
        print(f"  [err] {name}: {e}", file=sys.stderr)
        return False

    preds = data.get("predictions") or []
    if not preds:
        print(f"  [empty] {name}: {json.dumps(data)[:300]}", file=sys.stderr)
        return False
    img_b64 = preds[0].get("bytesBase64Encoded")
    if not img_b64:
        print(f"  [no-image] {name}: keys={list(preds[0].keys())}", file=sys.stderr)
        return False
    img_bytes = base64.b64decode(img_b64)
    out_path.write_bytes(img_bytes)
    print(f"  [ok]   {name} ({len(img_bytes)} bytes)")
    return True


def main():
    succ, fail = 0, 0
    for name, folder, prompt, aspect in PROMPTS:
        print(f"-> {folder}/{name}")
        if generate(name, folder, prompt, aspect):
            succ += 1
        else:
            fail += 1
    print(f"\nDone. {succ} ok, {fail} failed.")
    return 0 if fail == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
