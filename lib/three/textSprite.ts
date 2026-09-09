import * as THREE from "three";

interface LabelOptions {
  text: string;
  color?: string;
  background?: string | null;
  fontSize?: number;
  /** World-space height of the resulting sprite. */
  height: number;
}

/**
 * Renders text to an offscreen canvas and returns a camera-facing sprite.
 * Avoids any runtime font download (labels are short accents only).
 */
export function makeLabelSprite({
  text,
  color = "#10162f",
  background = null,
  fontSize = 44,
  height,
}: LabelOptions): THREE.Sprite {
  const canvas = document.createElement("canvas");
  const paddingX = 26;
  const paddingY = 14;
  const font = `600 ${fontSize}px Arial, Helvetica, sans-serif`;

  const measure = canvas.getContext("2d");
  if (!measure) throw new Error("Canvas 2D unavailable");
  measure.font = font;
  const textWidth = Math.ceil(measure.measureText(text).width);

  canvas.width = Math.ceil(textWidth + paddingX * 2);
  canvas.height = Math.ceil(fontSize * 1.4 + paddingY * 2);

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D unavailable");
  ctx.font = font;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  if (background) {
    ctx.fillStyle = background;
    const radius = canvas.height / 2;
    const path = new Path2D();
    path.roundRect(0, 0, canvas.width, canvas.height, radius);
    ctx.fill(path);
    ctx.fillStyle = color;
  } else {
    ctx.fillStyle = color;
  }
  ctx.fillText(text, canvas.width / 2, canvas.height / 2 + 1);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;

  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthWrite: false,
    opacity: 0.94,
  });
  const sprite = new THREE.Sprite(material);
  const aspect = canvas.width / canvas.height;
  sprite.scale.set(aspect * height, height, 1);
  return sprite;
}

/** Soft radial glow used behind the centre node. */
export function makeHaloSprite(scale = 3.4, color = "14,110,106"): THREE.Sprite {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D unavailable");

  const gradient = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  );
  gradient.addColorStop(0, `rgba(${color},0.5)`);
  gradient.addColorStop(0.35, `rgba(${color},0.18)`);
  gradient.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;

  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(scale, scale, 1);
  return sprite;
}