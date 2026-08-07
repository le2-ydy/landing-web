import { nextTick } from "vue";
import { ViteSSG } from "vite-ssg";
import { START_LOCATION } from "vue-router";
import App from "./App.vue";
import { routes, scrollBehavior } from "./router";
import "./styles.scss";

export const createApp = ViteSSG(
  App,
  { routes, scrollBehavior },
  ({ router }) => {
    if (import.meta.env.SSR) return;

    router.afterEach(async (_to, from) => {
      if (from === START_LOCATION) return;
      await nextTick();
      document.querySelector<HTMLElement>("#main-content")?.focus({ preventScroll: true });
    });
  },
);
