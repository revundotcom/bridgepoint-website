#!/usr/bin/env python3
"""
Generate Bridgepoint editorial-grade imagery via Vertex AI Imagen 4.
Documentary-photograph style. No AI-tell triggers. Hero + editorial scenes.

Auth via service account at ~/.sam-config/credentials/google-service-account.json
Project: sam-automation-485916
Model: imagen-4.0-generate-001
"""
import base64
import json
import os
import subprocess
import sys
import urllib.request
import urllib.error
from pathlib import Path

PROJECT = "sam-automation-485916"
LOCATION = "us-central1"
MODEL = "imagen-4.0-generate-001"
SA_KEY = os.path.expanduser("~/.sam-config/credentials/google-service-account.json")

OUT_HERO = Path(__file__).resolve().parents[1] / "public/img/hero"
OUT_EDIT = Path(__file__).resolve().parents[1] / "public/img/editorial"
OUT_HERO.mkdir(parents=True, exist_ok=True)
OUT_EDIT.mkdir(parents=True, exist_ok=True)


def get_access_token() -> str:
    """Get OAuth access token from service account."""
    # Activate service account first
    subprocess.run(
        ["gcloud", "auth", "activate-service-account", "--key-file", SA_KEY],
        check=True,
        capture_output=True,
    )
    out = subprocess.run(
        ["gcloud", "auth", "print-access-token"],
        check=True,
        capture_output=True,
        text=True,
    )
    return out.stdout.strip()


PROMPTS = [
    # (filename, folder, prompt, aspect)
    (
        "hero-tech-van-residential",
        "hero",
        "Documentary photograph, 50mm lens, golden hour, a service technician in a navy uniform with a small cyan accent patch standing beside an unbranded white service van in front of a brick Toronto-style two-story home. Tools at his belt. Natural light. Slight grain. Wide-angle composition with negative space top-left for headline overlay. No logos, no text, no signs. The technician is at three-quarter side angle, looking off-camera toward the home. Photorealistic, not illustrated. Editorial reportage style. Subtle film grain. 16:9 aspect.",
        "16:9",
    ),
    (
        "editorial-tech-basement-plumbing",
        "editorial",
        "Documentary photograph, 35mm lens, natural light from a basement window, a service technician kneeling in a residential basement with copper plumbing visible above, holding a wrench, focused on the work. Authentic warm light. Slight ambient blur. No logos. No face toward camera. Three-quarter back angle. Photorealistic, editorial reportage style. Subtle film grain. 16:9 aspect.",
        "16:9",
    ),
    (
        "editorial-tech-rooftop-hvac",
        "editorial",
        "Documentary photograph, 50mm lens, late afternoon golden hour, a service technician on a low residential rooftop installing or servicing a condenser unit, working with a wrench. Toronto suburban context softly visible in background. No logos, no text. Three-quarter angle, no face toward camera. Photorealistic, editorial reportage style. Subtle film grain. 16:9 aspect.",
        "16:9",
    ),
    (
        "editorial-tech-customer-door",
        "editorial",
        "Documentary photograph, 35mm lens, natural daylight, a service technician in a navy uniform handing a clipboard to a homeowner at a residential front door. Both shown at three-quarter angle, no faces directly toward camera. Authentic, restrained, not a smiling-handshake stock cliche. Brick home doorway. No logos, no text. Photorealistic, editorial reportage style. Subtle film grain. 16:9 aspect.",
        "16:9",
    ),
]


def generate(name: str, folder: str, prompt: str, aspect: str, token: str) -> bool:
    out_dir = {"hero": OUT_HERO, "editorial": OUT_EDIT}[folder]
    out_path = out_dir / f"{name}.png"
    if out_path.exists() and out_path.stat().st_size > 50_000:
        print(f"  [skip] {name} exists ({out_path.stat().st_size} bytes)")
        return True

    url = (
        f"https://{LOCATION}-aiplatform.googleapis.com/v1/projects/{PROJECT}"
        f"/locations/{LOCATION}/publishers/google/models/{MODEL}:predict"
    )
    body = {
        "instances": [{"prompt": prompt}],
        "parameters": {
            "sampleCount": 1,
            "aspectRatio": aspect,
            "personGeneration": "allow_adult",
            "safetySetting": "block_only_high",
            "addWatermark": False,
        },
    }
    req = urllib.request.Request(
        url,
        data=json.dumps(body).encode("utf-8"),
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {token}",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=180) as resp:
            data = json.loads(resp.read())
    except urllib.error.HTTPError as e:
        body_text = e.read().decode("utf-8", errors="ignore")[:800]
        print(f"  [HTTP {e.code}] {name}: {body_text}", file=sys.stderr)
        return False
    except Exception as e:
        print(f"  [err] {name}: {e}", file=sys.stderr)
        return False

    preds = data.get("predictions") or []
    if not preds:
        print(f"  [empty] {name}: {json.dumps(data)[:400]}", file=sys.stderr)
        return False
    img_b64 = preds[0].get("bytesBase64Encoded")
    if not img_b64:
        print(f"  [no-image] {name}: keys={list(preds[0].keys())}", file=sys.stderr)
        return False
    img_bytes = base64.b64decode(img_b64)
    out_path.write_bytes(img_bytes)
    print(f"  [ok]   {name} ({len(img_bytes)} bytes)", flush=True)
    return True


def main():
    print("Getting access token...", flush=True)
    token = get_access_token()
    print(f"Token acquired ({len(token)} chars)", flush=True)
    succ, fail = 0, 0
    for name, folder, prompt, aspect in PROMPTS:
        print(f"-> {folder}/{name}", flush=True)
        if generate(name, folder, prompt, aspect, token):
            succ += 1
        else:
            fail += 1
    print(f"\nDone. {succ} ok, {fail} failed.")
    return 0 if fail == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
