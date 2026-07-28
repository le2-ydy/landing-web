import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { loadEnv } from "vite";

const root = process.cwd();
const env = loadEnv("production", root, "");
const rawSiteUrl = process.env.VITE_SITE_URL || env.VITE_SITE_URL || "";
const siteUrl = rawSiteUrl.trim().replace(/\/+$/, "");
const routes = JSON.parse(await readFile(resolve(root, "src/seo-routes.json"), "utf8"));
const indexHtml = await readFile(resolve(root, "dist/index.html"), "utf8");
const robots = await readFile(resolve(root, "dist/robots.txt"), "utf8");
const notFoundHtml = await readFile(resolve(root, "dist/404.html"), "utf8");
const errors = [];

if (routes.length !== 12) errors.push(`SEO 路由应为 12 个，实际为 ${routes.length} 个`);
if (new Set(routes.map(({ path }) => path)).size !== routes.length) errors.push("SEO 路由存在重复路径");
if (new Set(routes.map(({ title }) => title)).size !== routes.length) errors.push("SEO 路由存在重复标题");

for (const route of routes) {
  for (const field of ["path", "title", "description", "image", "robots", "breadcrumbs"]) {
    if (!route[field] || (Array.isArray(route[field]) && route[field].length === 0)) {
      errors.push(`${route.path || "未知路由"} 缺少 ${field}`);
    }
  }
  if (!route.title.includes("悦店云")) errors.push(`${route.path} 标题缺少品牌名`);
  if (route.path !== "/" && route.breadcrumbs.at(-1)?.path !== route.path) {
    errors.push(`${route.path} 面包屑末级路径不一致`);
  }
}

for (const required of [
  'lang="zh-CN"',
  'name="description"',
  'property="og:title"',
  'name="twitter:card"',
  "/brand/yuedianyun-logo.png",
]) {
  if (!indexHtml.includes(required)) errors.push(`index.html 缺少 ${required}`);
}

if (!robots.includes("User-agent: *") || !robots.includes("Allow: /")) {
  errors.push("robots.txt 未允许公开页面抓取");
}
if (!notFoundHtml.includes("noindex, nofollow")) errors.push("404.html 缺少 noindex");
if ((notFoundHtml.match(/name="robots"/g) || []).length !== 1) errors.push("404.html robots 标签数量不正确");

const sitemapPath = resolve(root, "dist/sitemap.xml");
if (siteUrl) {
  try {
    const sitemap = await readFile(sitemapPath, "utf8");
    const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
    if (locations.length !== 12) errors.push(`sitemap 应为 12 个 URL，实际为 ${locations.length} 个`);
    if (locations.some((url) => !url.startsWith(`${siteUrl}/`) || url.includes("localhost"))) {
      errors.push("sitemap 包含错误域名");
    }
    if (!robots.includes(`Sitemap: ${siteUrl}/sitemap.xml`)) errors.push("robots.txt 缺少 sitemap 地址");
  } catch {
    errors.push("配置 VITE_SITE_URL 后未生成 sitemap.xml");
  }
} else {
  try {
    await access(sitemapPath);
    errors.push("未配置 VITE_SITE_URL 时不应生成 sitemap.xml");
  } catch {
    // Expected.
  }
  if (/localhost|example\.com/.test(indexHtml)) errors.push("构建产物包含占位域名");
}

const forbidden = ["ZUYU", "养和堂"];
for (const text of forbidden) {
  if (indexHtml.includes(text)) errors.push(`构建产物仍包含 ${text}`);
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log(`SEO 检查通过：${routes.length} 个公开路由${siteUrl ? "，sitemap 已生成" : "，未配置正式域名"}`);
