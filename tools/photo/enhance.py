"""
Photo pipeline for the portfolio.

    python tools/photo/enhance.py tools/photo/source.jpg

Needs: pip install pillow numpy rembg onnxruntime
(On Windows install into a venv at a SHORT path, e.g. C:\\pv — onnxruntime's
files exceed the 260-char path limit inside deep folders.)

Produces
  public/profile.jpg           enhanced photo, original backdrop, corner vignette
  public/profile-cutout.webp   transparent subject for the 3D hero portrait
  tools/resume/photo.jpg       headshot crop for the résumé (no matte edges)

Steps: 3x Lanczos upscale + two-pass unsharp mask, teal-shadow grade, rembg
(u2net_human_seg) background removal with the alpha pulled inward so the
low-res matte edge never shows, and the LinkedIn export's black rotated-crop
corner wedges treated as background.
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageEnhance, ImageFilter

ROOT = Path(__file__).resolve().parents[2]
SRC = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).with_name("source.jpg")
PUBLIC = ROOT / "public"
RESUME_PHOTO = ROOT / "tools" / "resume" / "photo.jpg"

SIZE = 1200


def upscale_and_sharpen(img: Image.Image) -> Image.Image:
    img = img.convert("RGB").resize((SIZE, SIZE), Image.LANCZOS)
    img = img.filter(ImageFilter.UnsharpMask(radius=1.4, percent=110, threshold=2))
    img = img.filter(ImageFilter.UnsharpMask(radius=4.0, percent=35, threshold=4))
    return img


def grade(img: Image.Image, teal: bool = True) -> Image.Image:
    """Gentle S-curve; optional teal shadow split-tone that stays natural on skin."""
    arr = np.asarray(img).astype(np.float32) / 255.0
    if teal:
        luma = 0.2126 * arr[..., 0] + 0.7152 * arr[..., 1] + 0.0722 * arr[..., 2]
        shadow_w = np.clip(1.0 - luma * 1.6, 0.0, 1.0)[..., None]
        arr = np.clip(arr + shadow_w * np.array([-0.035, 0.012, 0.045], dtype=np.float32), 0.0, 1.0)
    arr = np.clip((arr - 0.5) * 1.08 + 0.5, 0.0, 1.0)
    out = Image.fromarray((arr * 255).astype(np.uint8))
    return ImageEnhance.Color(out).enhance(0.94)


def vignette(img: Image.Image, strength: float = 0.28) -> Image.Image:
    w, h = img.size
    y, x = np.mgrid[0:h, 0:w].astype(np.float32)
    r = np.sqrt(((x - w / 2) / (w / 2)) ** 2 + ((y - h / 2) / (h / 2)) ** 2)
    mask = np.clip(1.0 - strength * np.clip(r - 0.55, 0, 1) ** 1.6 * 2.2, 0.0, 1.0)
    arr = np.asarray(img).astype(np.float32) * mask[..., None]
    return Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8))


def wedge_and_backdrop_mask(img: Image.Image) -> Image.Image:
    """Alpha that removes the light backdrop and black corner wedges connected to the frame edge."""
    small = img.resize((300, 300), Image.LANCZOS)
    arr = np.asarray(small).astype(np.float32) / 255.0
    mx, mn = arr.max(axis=2), arr.min(axis=2)
    sat = np.where(mx > 0, (mx - mn) / np.maximum(mx, 1e-6), 0)
    luma = 0.2126 * arr[..., 0] + 0.7152 * arr[..., 1] + 0.0722 * arr[..., 2]
    cand = ((luma > 0.52) & (sat < 0.24)) | (mx < 0.09)

    h, w = cand.shape
    bg = np.zeros_like(cand)
    stack = [(y, x) for y in range(h) for x in (0, w - 1) if cand[y, x]]
    stack += [(y, x) for x in range(w) for y in (0, h - 1) if cand[y, x]]
    for y, x in stack:
        bg[y, x] = True
    while stack:
        y, x = stack.pop()
        for ny, nx in ((y - 1, x), (y + 1, x), (y, x - 1), (y, x + 1)):
            if 0 <= ny < h and 0 <= nx < w and cand[ny, nx] and not bg[ny, nx]:
                bg[ny, nx] = True
                stack.append((ny, nx))

    alpha = Image.fromarray(((~bg) * 255).astype(np.uint8)).resize(img.size, Image.BILINEAR)
    return alpha.filter(ImageFilter.MinFilter(7)).filter(ImageFilter.GaussianBlur(2.0))


def cutout(img: Image.Image) -> Image.Image:
    fallback = wedge_and_backdrop_mask(img)
    try:
        from rembg import new_session, remove
    except ImportError:
        print("rembg not installed — using flood-fill matte only")
        rgba = img.convert("RGBA")
        rgba.putalpha(fallback)
        return rgba

    rgba = remove(img, session=new_session("u2net_human_seg"), alpha_matting=False).convert("RGBA")
    a = rgba.getchannel("A")
    a = Image.fromarray(np.minimum(np.asarray(a), np.asarray(fallback)))
    # Pull the boundary inward and soften it — hides the ragged matte edge of a 400px source.
    a = a.filter(ImageFilter.MinFilter(9)).filter(ImageFilter.GaussianBlur(2.2))
    rgba.putalpha(a)
    return rgba


def main() -> None:
    PUBLIC.mkdir(exist_ok=True)
    base = upscale_and_sharpen(Image.open(SRC))

    vignette(grade(base)).save(PUBLIC / "profile.jpg", quality=90, optimize=True, subsampling=0)
    print("wrote public/profile.jpg")

    cut = cutout(grade(base))
    cut.save(PUBLIC / "profile-cutout.webp", quality=90, method=6)
    print("wrote public/profile-cutout.webp")

    # Résumé headshot: original backdrop, cropped to head + shoulders so the corner wedges fall outside.
    head = grade(base, teal=False).crop((180, 0, 1020, 840))
    RESUME_PHOTO.parent.mkdir(parents=True, exist_ok=True)
    head.save(RESUME_PHOTO, quality=92, optimize=True, subsampling=0)
    print("wrote tools/resume/photo.jpg")


if __name__ == "__main__":
    main()
