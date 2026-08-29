import { copyFile, cp, mkdir, rm, writeFile } from "node:fs/promises";
import { join, sep } from "node:path";
import * as sass from "sass";

const root = process.cwd();
const result = sass.compile(join(root, "assets", "scss", "main.scss"), {
  style: "expanded",
  sourceMap: false,
});

await mkdir(join(root, "assets", "css"), { recursive: true });
await writeFile(join(root, "assets", "css", "main.css"), `${result.css}\n`, "utf8");

const dist = join(root, "dist");

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await copyFile(join(root, "index.html"), join(dist, "index.html"));
await copyFile(join(root, ".nojekyll"), join(dist, ".nojekyll"));
await cp(join(root, "web"), join(dist, "web"), { recursive: true });
await cp(join(root, "gamedev"), join(dist, "gamedev"), { recursive: true });
await cp(join(root, "templates"), join(dist, "templates"), { recursive: true });
await cp(join(root, "assets"), join(dist, "assets"), {
  recursive: true,
  filter: (source) => !source.includes(`${sep}scss${sep}`) && !source.endsWith(`${sep}scss`),
});
