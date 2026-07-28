import { useHead } from "@unhead/vue";
import { useRoute } from "vue-router";
import { siteConfig } from "./config";
import seoRoutesData from "./seo-routes.json";

export type SeoBreadcrumb = {
  name: string;
  path: string;
};

export type SeoRoute = {
  path: string;
  title: string;
  description: string;
  image: string;
  robots: string;
  breadcrumbs: SeoBreadcrumb[];
};

export const seoRoutes = seoRoutesData as SeoRoute[];

const fallbackSeo: SeoRoute = {
  path: "/404",
  title: `页面未找到｜${siteConfig.brand}`,
  description: `没有找到你访问的页面。返回${siteConfig.brand}首页，或继续查看产品能力与行业解决方案。`,
  image: "/brand/yuedianyun-share.jpg",
  robots: "noindex, nofollow",
  breadcrumbs: [],
};

function absoluteUrl(path: string) {
  return siteConfig.siteUrl ? new URL(path, `${siteConfig.siteUrl}/`).toString() : "";
}

function buildStructuredData(seo: SeoRoute) {
  if (!siteConfig.siteUrl || seo.robots.startsWith("noindex")) return [];

  if (seo.path === "/") {
    const organizationId = `${siteConfig.siteUrl}/#organization`;
    return [
      {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": organizationId,
            name: siteConfig.brand,
            url: `${siteConfig.siteUrl}/`,
            logo: absoluteUrl(siteConfig.logoUrl),
          },
          {
            "@type": "WebSite",
            "@id": `${siteConfig.siteUrl}/#website`,
            name: `${siteConfig.brand} ${siteConfig.descriptor}`,
            url: `${siteConfig.siteUrl}/`,
            publisher: { "@id": organizationId },
            inLanguage: "zh-CN",
          },
          {
            "@type": "SoftwareApplication",
            name: siteConfig.brand,
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            description: seo.description,
            url: `${siteConfig.siteUrl}/product`,
            provider: { "@id": organizationId },
            offers: [
              {
                "@type": "Offer",
                name: "门店版",
                price: siteConfig.pricing.store,
                priceCurrency: "CNY",
                url: `${siteConfig.siteUrl}/pricing`,
              },
              {
                "@type": "Offer",
                name: "连锁版",
                price: siteConfig.pricing.chain.replace(",", ""),
                priceCurrency: "CNY",
                url: `${siteConfig.siteUrl}/pricing`,
              },
            ],
          },
        ],
      },
    ];
  }

  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: seo.breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: absoluteUrl(item.path),
      })),
    },
  ];
}

export function useRouteSeo() {
  const route = useRoute();

  useHead(() => {
    const seo = seoRoutes.find((item) => item.path === route.path) ?? fallbackSeo;
    const canonical = absoluteUrl(seo.path);
    const shareImage = absoluteUrl(seo.image) || seo.image;
    const structuredData = buildStructuredData(seo);

    return {
      title: seo.title,
      htmlAttrs: { lang: "zh-CN" },
      meta: [
        { name: "description", content: seo.description },
        { name: "robots", content: seo.robots },
        { property: "og:title", content: seo.title },
        { property: "og:description", content: seo.description },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: "zh_CN" },
        { property: "og:site_name", content: siteConfig.brand },
        { property: "og:image", content: shareImage },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "900" },
        { property: "og:image:alt", content: `${siteConfig.brand}${siteConfig.descriptor}` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: seo.title },
        { name: "twitter:description", content: seo.description },
        { name: "twitter:image", content: shareImage },
        ...(canonical ? [{ property: "og:url", content: canonical }] : []),
        ...(siteConfig.googleSiteVerification
          ? [{ name: "google-site-verification", content: siteConfig.googleSiteVerification }]
          : []),
        ...(siteConfig.baiduSiteVerification
          ? [{ name: "baidu-site-verification", content: siteConfig.baiduSiteVerification }]
          : []),
      ],
      link: canonical ? [{ rel: "canonical", href: canonical }] : [],
      script: structuredData.map((value) => ({
        type: "application/ld+json",
        textContent: JSON.stringify(value),
      })),
    };
  });
}
