import * as THREE from "three";
import { cssFontStack } from "@/lib/utils";
import { profile } from "@/data/profile";

/**
 * The GLB from fattahmaulana/3D_CARD ships a baked texture atlas showing the
 * original author's artwork. Rather than shipping a second binary, both card
 * faces are redrawn at runtime on a 2D canvas so the badge carries the real
 * name, the real photo, and the monochrome palette.
 *
 * Atlas layout, measured from the mesh's own UVs:
 *   front face -> u 0.00-0.50, v 0.004-0.755  (upright)
 *   back face  -> u 0.50-1.00, v 0.002-0.757  (mirrored on X)
 *
 * The card is 0.72 x 1.0 in object space but each half of the atlas is
 * 512 x 771 px, so the artwork is drawn at its true aspect and squeezed into
 * the slot; the mesh stretches it back out.
 */
// Rendered at 2x and downsampled into the atlas below (see `face()`). The
// card's on-screen scale grew a lot (2.25 -> 3.85) after it was first built
// at this resolution, and stretching a 1024px atlas that far blurred both the
// photo and the name text. Supersampling keeps the same coordinate math
// everywhere else in this file while doubling the real pixel detail.
const SUPERSAMPLE = 3;
const ATLAS = 1024 * SUPERSAMPLE;
const FACE_W = 512 * SUPERSAMPLE;
const FACE_TOP = 3 * SUPERSAMPLE;
const FACE_H = 771 * SUPERSAMPLE;
const DESIGN_W = 554; // 771 * 0.72, the card's real proportion
const DESIGN_H = 771;

const INK = "#0b0b0e";
const INK_DEEP = "#08080a";
const PAPER = "#ece9e4";
const MUTE = "#7d7d84";
const LINE = "rgba(236, 233, 228, 0.16)";

const SERIF_FALLBACK = "Georgia, serif";
const MONO_FALLBACK = "ui-monospace, monospace";

function fonts() {
  return {
    display: cssFontStack("--ff-display", SERIF_FALLBACK),
    mono: cssFontStack("--ff-mono", MONO_FALLBACK),
  };
}

/** Canvas has no letter-spacing, so tracked text is laid out one glyph at a time. */
function tracked(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  spacing: number,
) {
  let cursor = x;
  for (const char of text) {
    ctx.fillText(char, cursor, y);
    cursor += ctx.measureText(char).width + spacing;
  }
}

function trackedWidth(
  ctx: CanvasRenderingContext2D,
  text: string,
  spacing: number,
) {
  let total = 0;
  for (const char of text) total += ctx.measureText(char).width + spacing;
  return total - spacing;
}

function panel(ctx: CanvasRenderingContext2D) {
  const gradient = ctx.createLinearGradient(0, 0, DESIGN_W * 0.6, DESIGN_H);
  gradient.addColorStop(0, "#121216");
  gradient.addColorStop(0.55, INK);
  gradient.addColorStop(1, INK_DEEP);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, DESIGN_W, DESIGN_H);

  ctx.strokeStyle = LINE;
  ctx.lineWidth = 1.5;
  ctx.strokeRect(20.5, 20.5, DESIGN_W - 41, DESIGN_H - 41);
}

/**
 * Computes a "cover" crop rect, the canvas equivalent of CSS
 * object-fit: cover, so a source photo of any aspect ratio fills the badge
 * slot without stretching. Vertically anchored toward the top by default
 * since most source photos (waist-up or full-body) put the face in the
 * upper portion of the frame, not dead centre.
 */
function coverCrop(
  sourceW: number,
  sourceH: number,
  targetW: number,
  targetH: number,
  anchorY = 0.16,
) {
  const targetAspect = targetW / targetH;
  const sourceAspect = sourceW / sourceH;

  if (sourceAspect > targetAspect) {
    // Source is relatively wider than the slot: fill the height, crop the sides.
    const sw = sourceH * targetAspect;
    return { sx: (sourceW - sw) / 2, sy: 0, sw, sh: sourceH };
  }

  // Source is relatively taller than the slot: fill the width, crop top/bottom.
  const sh = sourceW / targetAspect;
  return { sx: 0, sy: (sourceH - sh) * anchorY, sw: sourceW, sh };
}

/**
 * Card front: just the photo, full-bleed, nothing else drawn on top. No
 * header, name, fields or barcode. Whole photo shown (contain-fit, not
 * cropped), centered on the card; the panel's dark gradient shows through
 * any thin letterbox margin left by the aspect mismatch.
 */
function drawFront(
  ctx: CanvasRenderingContext2D,
  photo: HTMLImageElement | null,
) {
  panel(ctx);
  if (!photo) return;

  const naturalW = photo.naturalWidth || photo.width;
  const naturalH = photo.naturalHeight || photo.height;

  const scale = Math.min(DESIGN_W / naturalW, DESIGN_H / naturalH);
  const drawW = naturalW * scale;
  const drawH = naturalH * scale;
  const drawX = (DESIGN_W - drawW) / 2;
  const drawY = (DESIGN_H - drawH) / 2;

  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(photo, 0, 0, naturalW, naturalH, drawX, drawY, drawW, drawH);
}

/**
 * Card back. `background`, when loaded, is a LOCAL-ONLY placeholder image
 * (public/images/hxh.jpg) the project owner chose to use for personal,
 * non-published use. Swap it for original artwork before this site is ever
 * deployed publicly, since it is not licensed for redistribution.
 */
function drawBack(ctx: CanvasRenderingContext2D, background: HTMLImageElement | null) {
  const { display, mono } = fonts();

  const inset = 34;
  const cx = DESIGN_W / 2;

  if (background) {
    const naturalW = background.naturalWidth || background.width;
    const naturalH = background.naturalHeight || background.height;
    const crop = coverCrop(naturalW, naturalH, DESIGN_W, DESIGN_H, 0.5);
    ctx.drawImage(background, crop.sx, crop.sy, crop.sw, crop.sh, 0, 0, DESIGN_W, DESIGN_H);

    // Darkens the edges only, so the art stays visible in the middle while the
    // frame and top/bottom text keep their contrast.
    const shade = ctx.createLinearGradient(0, 0, 0, DESIGN_H);
    shade.addColorStop(0, "rgba(6, 6, 7, 0.55)");
    shade.addColorStop(0.22, "rgba(6, 6, 7, 0.06)");
    shade.addColorStop(0.78, "rgba(6, 6, 7, 0.06)");
    shade.addColorStop(1, "rgba(6, 6, 7, 0.6)");
    ctx.fillStyle = shade;
    ctx.fillRect(0, 0, DESIGN_W, DESIGN_H);
  } else {
    panel(ctx);
  }

  // Double frame, the picture-frame border a collectible card back always has
  ctx.strokeStyle = "rgba(236, 233, 228, 0.55)";
  ctx.lineWidth = 3;
  ctx.strokeRect(inset, inset, DESIGN_W - inset * 2, DESIGN_H - inset * 2);
  ctx.strokeStyle = "rgba(236, 233, 228, 0.22)";
  ctx.lineWidth = 1;
  ctx.strokeRect(
    inset + 10,
    inset + 10,
    DESIGN_W - (inset + 10) * 2,
    DESIGN_H - (inset + 10) * 2,
  );

  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = PAPER;
  ctx.font = "400 34px " + display;
  ctx.fillText("Koleksi Portofolio", cx, inset + 62);

  ctx.strokeStyle = "rgba(236, 233, 228, 0.28)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(inset + 34, inset + 80);
  ctx.lineTo(DESIGN_W - inset - 34, inset + 80);
  ctx.stroke();

  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = MUTE;
  ctx.font = "500 12px " + mono;
  const rarity = "EDISI TERBATAS / TANPA NILAI JUAL";
  tracked(ctx, rarity, (DESIGN_W - trackedWidth(ctx, rarity, 1.6)) / 2, DESIGN_H - 150, 1.6);

  ctx.fillStyle = "rgba(236, 233, 228, 0.5)";
  ctx.font = "400 12px " + mono;
  const site = "GITHUB.COM/NATANAELVINEDJAPRI";
  tracked(ctx, site, (DESIGN_W - trackedWidth(ctx, site, 1.6)) / 2, DESIGN_H - 122, 1.6);

  ctx.strokeStyle = LINE;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(inset + 34, DESIGN_H - inset - 78);
  ctx.lineTo(DESIGN_W - inset - 34, DESIGN_H - inset - 78);
  ctx.stroke();

  ctx.textAlign = "left";
  ctx.fillStyle = MUTE;
  ctx.font = "500 12px " + mono;
  tracked(ctx, "UNTAR 2028", inset + 20, DESIGN_H - inset - 40, 2.4);
  ctx.textAlign = "right";
  ctx.fillText("NON-TRANSFERABLE", DESIGN_W - inset - 20, DESIGN_H - inset - 40);
  ctx.textAlign = "left";
}

/** Renders one face into an offscreen canvas at its true proportion. */
function face(draw: (ctx: CanvasRenderingContext2D) => void) {
  const canvas = document.createElement("canvas");
  canvas.width = DESIGN_W * SUPERSAMPLE;
  canvas.height = DESIGN_H * SUPERSAMPLE;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    // Every coordinate in drawFront/drawBack is written against the DESIGN_W
    // x DESIGN_H space; scaling the context up front means none of that math
    // has to change while the canvas still renders at full native resolution.
    ctx.scale(SUPERSAMPLE, SUPERSAMPLE);
    draw(ctx);
  }
  return canvas;
}

export function paintCardAtlas(
  canvas: HTMLCanvasElement,
  photo: HTMLImageElement | null = null,
  cardBack: HTMLImageElement | null = null,
) {
  canvas.width = ATLAS;
  canvas.height = ATLAS;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.fillStyle = INK_DEEP;
  ctx.fillRect(0, 0, ATLAS, ATLAS);

  ctx.drawImage(
    face((faceCtx) => drawFront(faceCtx, photo)),
    0,
    FACE_TOP,
    FACE_W,
    FACE_H,
  );

  // The back half of the atlas is mirrored so it reads correctly from behind
  ctx.save();
  ctx.translate(ATLAS, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(
    face((faceCtx) => drawBack(faceCtx, cardBack)),
    0,
    FACE_TOP,
    FACE_W,
    FACE_H,
  );
  ctx.restore();
}

export function paintStrap(canvas: HTMLCanvasElement) {
  canvas.width = 1024;
  canvas.height = 248;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const { mono } = fonts();

  const gradient = ctx.createLinearGradient(0, 0, 0, 248);
  gradient.addColorStop(0, "#141418");
  gradient.addColorStop(0.5, "#1d1d22");
  gradient.addColorStop(1, "#0d0d10");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1024, 248);

  // Woven edge stitching
  ctx.strokeStyle = "rgba(236, 233, 228, 0.18)";
  ctx.lineWidth = 2;
  ctx.setLineDash([10, 12]);
  ctx.beginPath();
  ctx.moveTo(0, 26);
  ctx.lineTo(1024, 26);
  ctx.moveTo(0, 222);
  ctx.lineTo(1024, 222);
  ctx.stroke();
  ctx.setLineDash([]);

  // Drawn mirrored on purpose: the strap material tiles with a negative repeat
  // (repeat.x = -3) to run the weave in the strap's own direction, which would
  // otherwise reverse the lettering. Mirroring here cancels that out.
  ctx.save();
  ctx.translate(1024, 0);
  ctx.scale(-1, 1);
  ctx.fillStyle = "rgba(236, 233, 228, 0.86)";
  ctx.font = "500 46px " + mono;
  ctx.textBaseline = "middle";
  ctx.textAlign = "left";
  const label = "NATANAEL VINE DJAPRI";
  tracked(ctx, label, (1024 - trackedWidth(ctx, label, 9)) / 2, 126, 9);
  ctx.restore();
}

/** Generic image loader. Resolves to null instead of rejecting on failure. */
function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const image = new window.Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = src;
  });
}

/** Loads the badge portrait. Resolves to null if it cannot be fetched. */
export function loadPortrait(): Promise<HTMLImageElement | null> {
  return loadImage(profile.photoLanyard);
}

/**
 * Loads the back-of-card background art. Local-only asset: swap this out
 * before this site is ever deployed publicly, since it isn't original artwork.
 */
export function loadCardBackImage(): Promise<HTMLImageElement | null> {
  return loadImage("/images/hxh.jpg");
}

/**
 * Builds a CanvasTexture. Card art keeps flipY off to match the glTF UV
 * convention (origin top-left); the strap keeps the normal image orientation.
 */
export function makeTexture(
  paint: (canvas: HTMLCanvasElement) => void,
  flipY = false,
) {
  const canvas = document.createElement("canvas");
  paint(canvas);
  const texture = new THREE.CanvasTexture(canvas);
  texture.flipY = flipY;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 16;
  texture.needsUpdate = true;
  return { texture, canvas };
}
