#!/usr/bin/env python3
"""
Generate Bridgepoint INTERIOR PAGE editorial-grade imagery via Vertex AI Imagen 4.
Documentary-photograph style. Saved to public/img/editorial/.

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

OUT_EDIT = Path(__file__).resolve().parents[1] / "public/img/editorial"
OUT_EDIT.mkdir(parents=True, exist_ok=True)


def get_access_token() -> str:
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


# Interior page heroes. Each tagged ed- prefix to keep separate from existing editorial set.
PROMPTS = [
    (
        "ed-about-hero",
        "Documentary photograph, 50mm lens, late afternoon, a service van parked in front of a brick residential home in a Toronto neighborhood, golden hour light, no logos visible, photorealistic, restrained, editorial. Subtle film grain. 16:9 aspect.",
        "16:9",
    ),
    (
        "ed-services-hero",
        "Documentary photograph, 35mm lens, natural light, a tradesman's leather tool belt and copper pipes on a wooden workbench, soft window light, no faces, photorealistic, restrained. Subtle film grain. 16:9 aspect.",
        "16:9",
    ),
    (
        "ed-plumbing-hero",
        "Documentary photograph, 35mm lens, natural light, a plumber's hand turning a wrench on a copper pipe under a bathroom sink, sharp focus on hands and tools, soft ambient light, no faces, photorealistic. Subtle film grain. 16:9 aspect.",
        "16:9",
    ),
    (
        "ed-heating-hero",
        "Documentary photograph, 50mm lens, late afternoon, a residential furnace being serviced, technician hands visible turning a valve, soft natural light, no logos, photorealistic. Subtle film grain. 16:9 aspect.",
        "16:9",
    ),
    (
        "ed-cooling-hero",
        "Documentary photograph, 50mm lens, late afternoon, a residential air conditioning condenser unit being serviced, technician hands visible turning a valve on the unit, soft natural light, no logos, photorealistic. Subtle film grain. 16:9 aspect.",
        "16:9",
    ),
    (
        "ed-drain-hero",
        "Documentary photograph, natural light, a drain auger machine on a residential basement floor with copper plumbing visible, photorealistic, restrained. Subtle film grain. 16:9 aspect.",
        "16:9",
    ),
    (
        "ed-water-damage-hero",
        "Documentary photograph, 35mm lens, natural light, hands placing a dehumidifier or fan in a residential basement with damp drywall visible, no faces, photorealistic, mature. Subtle film grain. 16:9 aspect.",
        "16:9",
    ),
    (
        "ed-property-managers-hero",
        "Documentary photograph, 50mm lens, natural light, a clipboard and tablet on a residential building's lobby table, technician hands visible reviewing notes, photorealistic editorial restraint. Subtle film grain. 16:9 aspect.",
        "16:9",
    ),
    (
        "ed-find-tech-hero",
        "Documentary photograph, 35mm lens, golden hour, a service van approaching a residential street with brick homes, no logos visible, photorealistic warm afternoon light. Subtle film grain. 16:9 aspect.",
        "16:9",
    ),
    (
        "ed-contact-hero",
        "Documentary photograph, natural light, a notebook and pen on a clean wooden desk in a small office, soft window light, no faces, photorealistic, restrained. Subtle film grain. 16:9 aspect.",
        "16:9",
    ),
    (
        "ed-quote-hero",
        "Documentary photograph, natural light, a notebook and fountain pen on a clean wooden desk in a small office with a coffee cup, soft window light, no faces, photorealistic, restrained editorial. Subtle film grain. 16:9 aspect.",
        "16:9",
    ),
    (
        "ed-gallery-hero",
        "Documentary photograph, 35mm lens, natural light, a residential bathroom with copper plumbing visible, soft window light, no faces, photorealistic restoration narrative, editorial. Subtle film grain. 16:9 aspect.",
        "16:9",
    ),
    (
        "ed-pricing-hero",
        "Documentary photograph, 50mm lens, soft window light, a clipboard with a written estimate on a wooden workbench beside a wrench and copper fittings, no faces, photorealistic, restrained editorial. Subtle film grain. 16:9 aspect.",
        "16:9",
    ),
    (
        "ed-help-hero",
        "Documentary photograph, 35mm lens, natural light, an open notebook with handwritten notes and a coffee cup on a wooden desk, technician's leather work gloves placed beside, no faces, photorealistic, restrained editorial. Subtle film grain. 16:9 aspect.",
        "16:9",
    ),
    (
        "ed-locations-hero",
        "Documentary photograph, 35mm lens, golden hour, a residential street in a Toronto neighborhood with brick homes lining the road, no people, no logos, photorealistic warm afternoon light, editorial. Subtle film grain. 16:9 aspect.",
        "16:9",
    ),
]


def generate(name: str, prompt: str, aspect: str, token: str) -> bool:
    out_path = OUT_EDIT / f"{name}.png"
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
    for name, prompt, aspect in PROMPTS:
        print(f"-> {name}", flush=True)
        if generate(name, prompt, aspect, token):
            succ += 1
        else:
            fail += 1
    print(f"\nDone. {succ} ok, {fail} failed.", flush=True)
    return 0 if fail == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
