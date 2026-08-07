function normalizeUrl(value: string | undefined) {
  return (value ?? "").trim().replace(/\/+$/, "");
}

const siteUrl = normalizeUrl(
  import.meta.env.VITE_SITE_URL ||
    (import.meta.env.DEV && typeof window !== "undefined" ? window.location.origin : ""),
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
  wecomQrUrl: "/brand/wecom-contact-qr.png",
  wecomAvailable: true,
  contactPhone: "",
  pricing: {
    store: "199",
    chain: "999",
  },
};

export function openDemo() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-demo"));
  }
}
