import { createRouter, createWebHistory } from "vue-router";
import AboutView from "./views/AboutView.vue";
import HomeView from "./views/HomeView.vue";
import IndustryView from "./views/IndustryView.vue";
import PricingView from "./views/PricingView.vue";
import ProductView from "./views/ProductView.vue";
import ScenariosView from "./views/ScenariosView.vue";
import SolutionsView from "./views/SolutionsView.vue";
import { siteConfig } from "./config";

const brand = siteConfig.brand;

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0, behavior: "smooth" }),
  routes: [
    { path: "/", component: HomeView, meta: { title: `${brand} ${siteConfig.descriptor}`, description: "面向足浴、SPA、按摩养生门店的预约、现场、会员与连锁经营平台。" } },
    { path: "/product", component: ProductView, meta: { title: `产品能力 | ${brand}`, description: `查看${brand}如何连接预约接待、现场排班、会员权益、财务和多门店经营。` } },
    { path: "/solutions", component: SolutionsView, meta: { title: `行业解决方案 | ${brand}`, description: "足浴、SPA 美容、按摩、采耳头疗、艾灸调理与连锁养生会所解决方案。" } },
    { path: "/solutions/:slug(footbath|spa-beauty|massage|ear-head-care|moxibustion|wellness-chain)", component: IndustryView },
    { path: "/pricing", component: PricingView, meta: { title: `产品价格 | ${brand}`, description: `${brand}门店版、连锁版与企业版价格和能力对比。` } },
    { path: "/scenarios", component: ScenariosView, meta: { title: `经营场景 | ${brand}`, description: "从晚高峰接待、疗程跟进、连锁复盘和技师业绩核对理解门店经营问题。" } },
    { path: "/about", component: AboutView, meta: { title: `关于${brand}`, description: `${brand}专注服务型门店，让好服务被更清楚、更可靠的经营托住。` } },
    { path: "/:pathMatch(.*)*", redirect: "/" },
  ],
});

router.afterEach((to) => {
  document.title = (to.meta.title as string | undefined) ?? `行业解决方案 | ${brand}`;
  const description = (to.meta.description as string | undefined) ?? "面向服务型门店的预约、现场、会员与连锁经营平台。";
  document.querySelector('meta[name="description"]')?.setAttribute("content", description);
  document.querySelector('meta[property="og:title"]')?.setAttribute("content", document.title);
  document.querySelector('meta[property="og:description"]')?.setAttribute("content", description);
});

export default router;
