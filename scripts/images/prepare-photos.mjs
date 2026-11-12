// Optimise the client's real photos into public/images/photos/<id>.webp and <id>-sm.webp,
// and build logo / favicon files from public/karunadu-new-logo.webp.
// Usage: npm run images:prepare
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { photoTasks } from "./photos.mjs";

const SRC = "source-assets/photos";
const OUT = "public/images/photos";

async function preparePhoto(task) {
  const [large, small] = task.widths ?? [900, 480];
  let base = sharp(join(SRC, task.src)).rotate();
  if (task.crop) base = base.extract(task.crop);
  const buf = await base.toBuffer();
  const meta = await sharp(buf).metadata();
  let cropped = sharp(buf);
  if (task.aspect) {
    const w = meta.width;
    const h = meta.height;
    const targetH = Math.min(h, Math.round(w / task.aspect));
    const targetW = Math.round(targetH * task.aspect);
    cropped = cropped.extract({
      left: Math.round((w - targetW) / 2),
      top: Math.round((h - targetH) * 0.55),
      width: targetW,
      height: targetH,
    });
  }
  const finalBuf = await cropped.toBuffer();
  for (const [width, suffix] of [[large, ""], [small, "-sm"]]) {
    const info = await sharp(finalBuf)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 76, effort: 6 })
      .toFile(join(OUT, `${task.id}${suffix}.webp`));
    console.log(`${task.id}${suffix}.webp ${info.width}x${info.height} ${(info.size / 1024).toFixed(0)} KB`);
  }
}

// The client's round badge logo sits on a white square; cut it to a circle so it
// works on the cream header, the dark footer and as a favicon.
const LOGO_SRC = "public/karunadu-new-logo.webp";

async function circularLogo() {
  const trimmed = await sharp(LOGO_SRC).trim({ background: "#ffffff", threshold: 20 }).png().toBuffer();
  const { width, height } = await sharp(trimmed).metadata();
  const size = Math.max(width, height);
  const square = await sharp(trimmed)
    .resize(size, size, { fit: "contain", background: "#ffffff" })
    .png()
    .toBuffer();
  const r = size / 2;
  const mask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><circle cx="${r}" cy="${r}" r="${r - 0.5}" fill="#fff"/></svg>`);
  return sharp(square).ensureAlpha().composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
}

async function prepareLogo() {
  const buf = await circularLogo();
  const clear = { r: 0, g: 0, b: 0, alpha: 0 };
  await sharp(buf).resize(192, 192, { fit: "contain", background: clear }).webp({ quality: 90 }).toFile("public/images/logo.webp");
  await sharp(buf).resize(192, 192, { fit: "contain", background: clear }).png().toFile("public/images/logo.png");
  await sharp(buf).resize(180, 180, { fit: "contain", background: "#ffffff" }).flatten({ background: "#ffffff" }).png().toFile("public/apple-touch-icon.png");
  await sharp(buf).resize(48, 48, { fit: "contain", background: clear }).png().toFile("public/favicon.png");
  await sharp(buf).resize(512, 512, { fit: "contain", background: "#ffffff" }).flatten({ background: "#ffffff" }).png().toFile("public/images/icon-512.png");
  console.log("logo + favicons written");
}

await mkdir(OUT, { recursive: true });
for (const task of photoTasks) await preparePhoto(task);
await prepareLogo();
