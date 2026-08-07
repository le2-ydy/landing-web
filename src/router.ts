import type { RouteRecordRaw, RouterScrollBehavior } from "vue-router";
import AboutView from "./views/AboutView.vue";
import HomeView from "./views/HomeView.vue";
import IndustryView from "./views/IndustryView.vue";
import NotFoundView from "./views/NotFoundView.vue";
import PricingView from "./views/PricingView.vue";
import ProductView from "./views/ProductView.vue";
import ScenariosView from "./views/ScenariosView.vue";
import SolutionsView from "./views/SolutionsView.vue";
import { industries } from "./data";

const industryRoutes: RouteRecordRaw[] = industries.map(({ slug }) => ({
  path: `/solutions/${slug}`,
  component: IndustryView,
  props: { slug },
}));

export const routes: RouteRecordRaw[] = [
  { path: "/", component: HomeView },
  { path: "/product", component: ProductView },
  { path: "/solutions", component: SolutionsView },
  ...industryRoutes,
  { path: "/pricing", component: PricingView },
  { path: "/scenarios", component: ScenariosView },
  { path: "/about", component: AboutView },
  { path: "/404", component: NotFoundView },
  { path: "/:pathMatch(.*)*", component: NotFoundView },
];

export const scrollBehavior: RouterScrollBehavior = () => ({
  top: 0,
  behavior:
    typeof window !== "undefined" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "smooth"
      : "auto",
});
