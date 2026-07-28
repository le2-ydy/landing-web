import { copyFile, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { loadEnv } from "vite";

const root = process.cwd();
const env = loadEnv("production", root, "");
const rawSiteUrl = process.env.VITE_SITE_URL || env.VITE_SITE_URL || "";
const siteUrl = rawSiteUrl.trim().replace(/\/+$/, "");
const routes = JSON.parse(await readFile(resolve(root, "src/seo-routes.json"), "utf8"));
const dist = resolve(root, "dist");

let robots = "User-agent: *\nAllow: /\n";

if (siteUrl) {
  const urls = routes
    .map(({ path }) => `  <url><loc>${new URL(path, `${siteUrl}/`).toString()}</loc></url>`)
    .join("\n");
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  await writeFile(resolve(dist, "sitemap.xml"), sitemap, "utf8");
  robots += `Sitemap: ${siteUrl}/sitemap.xml\n`;
}

await writeFile(resolve(dist, "robots.txt"), robots, "utf8");
await copyFile(resolve(dist, "index.html"), resolve(dist, "404.html"));

const notFoundPath = resolve(dist, "404.html");
const notFoundHtml = (await readFile(notFoundPath, "utf8"))
  .replace(/<title>.*?<\/title>/, "<title>页面未找到｜悦店云</title>")
  .replace(
    /<meta name="robots" content=".*?" \/>/,
    '<meta name="robots" content="noindex, nofollow" />',
  );
await writeFile(notFoundPath, notFoundHtml, "utf8");
