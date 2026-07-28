import { createRouter, createWebHistory } from "vue-router";
import AboutView from "./views/AboutView.vue";
import HomeView from "./views/HomeView.vue";
import IndustryView from "./views/IndustryView.vue";
import NotFoundView from "./views/NotFoundView.vue";
import PricingView from "./views/PricingView.vue";
import ProductView from "./views/ProductView.vue";
import ScenariosView from "./views/ScenariosView.vue";
import SolutionsView from "./views/SolutionsView.vue";

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0, behavior: "smooth" }),
  routes: [
    { path: "/", component: HomeView },
    { path: "/product", component: ProductView },
    { path: "/solutions", component: SolutionsView },
    { path: "/solutions/:slug(footbath|spa-beauty|massage|ear-head-care|moxibustion|wellness-chain)", component: IndustryView },
    { path: "/pricing", component: PricingView },
    { path: "/scenarios", component: ScenariosView },
    { path: "/about", component: AboutView },
    { path: "/:pathMatch(.*)*", component: NotFoundView },
  ],
});

export default router;
