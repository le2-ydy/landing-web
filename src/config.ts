export const siteConfig = {
  brand: "悦店云",
  descriptor: "门店经营平台",
  logoUrl: "/brand/yuedianyun-logo.png",
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
