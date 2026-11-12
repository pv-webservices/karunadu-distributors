// Generate site imagery with the OpenAI Images API.
//   npm run images:plan                         list every task, no API calls
//   npm run images:generate                     generate all missing images
//   npm run images:generate -- tusk-range --force   regenerate specific ids
//   npm run images:optimize                     re-crop/re-encode from saved raw PNGs (no API calls)
// The key is read only from OPENAI_API_KEY (.env). It is never bundled into the website.
import sharp from "sharp";
import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { imageTasks } from "./manifest.mjs";

const config = Object.freeze({
  generateUrl: "https://api.openai.com/v1/images/generations",
  editUrl: "https://api.openai.com/v1/images/edits",
  model: process.env.OPENAI_IMAGE_MODEL || "gpt-image-2.5-flare",
  premiumModel: process.env.OPENAI_IMAGE_MODEL_PREMIUM || "gpt-image-2.5-sunburst",
  quality: process.env.OPENAI_IMAGE_QUALITY || "medium",
  premiumQuality: "high",
  sizes: { landscape: "1536x1024", portrait: "1024x1536", square: "1024x1024" },
  rawDir: "assets-src/generated",
  publicDir: "public/images/gen",
  refDir: "source-assets/photos",
  concurrency: 3,
  timeoutMs: 300_000,
});

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const force = args.includes("--force");
const optimiseOnly = args.includes("--optimize-only");
const onlyIds = args.filter((a) => !a.startsWith("--"));
const tasks = onlyIds.length ? imageTasks.filter((t) => onlyIds.includes(t.id)) : imageTasks;
const exists = (p) => access(p).then(() => true, () => false);

function routeFor(task) {
  return {
    model: task.premium ? config.premiumModel : config.model,
    quality: task.premium ? config.premiumQuality : config.quality,
    size: config.sizes[task.orientation],
  };
}

async function callApi(url, init) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), config.timeoutMs);
  try {
    const response = await fetch(url, { ...init, signal: controller.signal });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(`${response.status} ${body?.error?.message || response.statusText}`);
    const b64 = body?.data?.[0]?.b64_json;
    if (!b64) throw new Error("API response contained no image data");
    return Buffer.from(b64, "base64");
  } finally {
    clearTimeout(timer);
  }
}

async function requestImage(task, route, apiKey) {
  const auth = { Authorization: `Bearer ${apiKey}` };
  if (task.kind === "edit") {
    const form = new FormData();
    form.append("model", route.model);
    form.append("prompt", task.prompt);
    form.append("size", route.size);
    form.append("quality", route.quality);
    for (const ref of task.refs) {
      const bytes = await readFile(join(config.refDir, ref));
      form.append("image[]", new Blob([bytes], { type: "image/jpeg" }), ref.replace(/\s+/g, "-"));
    }
    return callApi(config.editUrl, { method: "POST", headers: auth, body: form });
  }
  return callApi(config.generateUrl, {
    method: "POST",
    headers: { ...auth, "Content-Type": "application/json" },
    body: JSON.stringify({ model: route.model, prompt: task.prompt, size: route.size, quality: route.quality, n: 1 }),
  });
}

async function optimise(task, pngPath) {
  const meta = await sharp(pngPath).metadata();
  const targetH = Math.min(meta.height, Math.round(meta.width / task.aspect));
  const targetW = Math.round(targetH * task.aspect);
  const cropped = await sharp(pngPath)
    // Bias portrait crops toward the top so bottle caps are never trimmed.
    .extract({ left: Math.round((meta.width - targetW) / 2), top: Math.round((meta.height - targetH) * (task.orientation === "portrait" ? 0.25 : 0.5)), width: targetW, height: targetH })
    .toBuffer();
  const [large, small] = task.widths;
  for (const [width, suffix] of [[large, ""], [small, "-sm"]]) {
    const info = await sharp(cropped)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: task.id.startsWith("hero") ? 80 : 74, effort: 6 })
      .toFile(join(config.publicDir, `${task.id}${suffix}.webp`));
    console.log(`  → ${task.id}${suffix}.webp ${info.width}x${info.height} ${(info.size / 1024).toFixed(0)} KB`);
  }
}

async function runTask(task, apiKey) {
  const route = routeFor(task);
  const rawPath = join(config.rawDir, `${task.id}.png`);
  const outPath = join(config.publicDir, `${task.id}.webp`);
  if (!force && (await exists(outPath))) {
    console.log(`[skip] ${task.id} (exists — use --force to regenerate)`);
    return true;
  }
  console.log(`[${task.id}] ${task.kind} · ${route.model} · ${route.quality} · ${route.size}`);
  try {
    let png;
    try {
      png = await requestImage(task, route, apiKey);
    } catch (error) {
      if (route.model === config.premiumModel) throw error;
      console.warn(`[${task.id}] ${error.message}; retrying with ${config.premiumModel}`);
      png = await requestImage(task, { ...route, model: config.premiumModel }, apiKey);
    }
    await writeFile(rawPath, png);
    await optimise(task, rawPath);
    return true;
  } catch (error) {
    console.error(`[${task.id}] FAILED: ${error.message}`);
    return false;
  }
}

if (dryRun) {
  for (const t of tasks) {
    const r = routeFor(t);
    console.log(`${t.id.padEnd(32)} ${t.kind.padEnd(9)} ${r.model} · ${r.quality} · ${r.size}${t.refs ? `  ref: ${t.refs.join(", ")}` : ""}`);
  }
  console.log(`\n${tasks.length} image task(s).`);
  process.exit(0);
}

if (optimiseOnly) {
  await mkdir(config.publicDir, { recursive: true });
  for (const t of tasks) {
    const raw = join(config.rawDir, `${t.id}.png`);
    if (await exists(raw)) await optimise(t, raw);
    else console.warn(`[${t.id}] no raw PNG — skipped`);
  }
  process.exit(0);
}

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey || apiKey.length < 20) {
  console.error("OPENAI_API_KEY is not set. Copy .env.example to .env, add the key, then run: npm run images:generate");
  process.exit(1);
}

await mkdir(config.rawDir, { recursive: true });
await mkdir(config.publicDir, { recursive: true });

const queue = [...tasks];
const results = [];
await Promise.all(
  Array.from({ length: config.concurrency }, async () => {
    while (queue.length) {
      const task = queue.shift();
      results.push(await runTask(task, apiKey));
    }
  }),
);
const failed = results.filter((ok) => !ok).length;
console.log(`\nDone: ${results.length - failed} ok, ${failed} failed.`);
process.exit(failed ? 1 : 0);
