export const siteConfig = {
  brand: "ZUYU",
  descriptor: "门店经营平台",
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
