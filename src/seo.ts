import { useHead } from "@unhead/vue";
import { toValue, type MaybeRefOrGetter } from "vue";
import { siteConfig } from "./config";

export type SeoBreadcrumb = {
  name: string;
  path: string;
};

export type PageSeo = {
  path: string;
  title: string;
  description: string;
  robots?: string;
  breadcrumbs?: SeoBreadcrumb[];
};

function absoluteUrl(path: string) {
  return siteConfig.siteUrl ? new URL(path, `${siteConfig.siteUrl}/`).toString() : "";
}

function buildStructuredData(seo: Required<PageSeo>) {
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
                price: siteConfig.pricing.chain,
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

export function usePageSeo(source: MaybeRefOrGetter<PageSeo>) {
  useHead(() => {
    const page = toValue(source);
    const seo: Required<PageSeo> = {
      robots: "index, follow",
      breadcrumbs: [],
      ...page,
    };
    const canonical = absoluteUrl(seo.path);
    const shareImage = absoluteUrl("/brand/yuedianyun-share.jpg") || "/brand/yuedianyun-share.jpg";

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
      script: buildStructuredData(seo).map((value) => ({
        type: "application/ld+json",
        textContent: JSON.stringify(value),
      })),
    };
  });
}
