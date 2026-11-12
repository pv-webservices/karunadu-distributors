// Resolves an image id at build time:
//   1. AI-generated   public/images/gen/<id>.webp     (npm run images:generate)
//   2. Real photo     public/images/photos/<id>.webp  (npm run images:prepare)
//   3. null           -> components render an illustrated tile instead
import { existsSync } from "node:fs";
import { join } from "node:path";

export interface ResolvedImage {
  src: string;
  srcSm: string;
  source: "generated" | "photo";
}

const ROOT = process.cwd();

function check(folder: string, id: string): ResolvedImage | null {
  const file = join(ROOT, "public", "images", folder, `${id}.webp`);
  if (!existsSync(file)) return null;
  const hasSm = existsSync(join(ROOT, "public", "images", folder, `${id}-sm.webp`));
  const src = `/images/${folder}/${id}.webp`;
  return { src, srcSm: hasSm ? `/images/${folder}/${id}-sm.webp` : src, source: folder === "gen" ? "generated" : "photo" };
}

export function resolveImage(...ids: Array<string | undefined>): ResolvedImage | null {
  for (const id of ids) {
    if (!id) continue;
    const found = check("gen", id) ?? check("photos", id);
    if (found) return found;
  }
  return null;
}
