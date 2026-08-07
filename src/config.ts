function normalizeUrl(value: string | undefined) {
  return (value ?? "").trim().replace(/\/+$/, "");
}

const siteUrl = normalizeUrl(
  import.meta.env.VITE_SITE_URL || (import.meta.env.DEV ? window.location.origin : ""),
);
const demoUrl = normalizeUrl(import.meta.env.VITE_DEMO_URL);

export const siteConfig = {
  brand: "悦店云",
  descriptor: "门店经营平台",
  logoUrl: "/brand/yuedianyun-logo.png",
  siteUrl,
  demoUrl,
  googleSiteVerification: (import.meta.env.VITE_GOOGLE_SITE_VERIFICATION ?? "").trim(),
  baiduSiteVerification: (import.meta.env.VITE_BAIDU_SITE_VERIFICATION ?? "").trim(),
  wecomQrUrl: "",
  wecomAvailable: false,
  contactPhone: "400-800-2026",
  pricing: {
    store: "699",
    chain: "1,999",
  },
};

export function openDemo() {
  window.dispatchEvent(new CustomEvent("open-demo"));
}
