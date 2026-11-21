import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

export function listFiles(dir: string, extensions: string[], out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) listFiles(path, extensions, out);
    else if (extensions.some((extension) => path.endsWith(extension))) out.push(path);
  }
  return out;
}

export const read = (path: string) => readFileSync(path, "utf8");
