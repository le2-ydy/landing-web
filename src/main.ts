import { createApp } from "vue";
import { createHead } from "@unhead/vue/client";
import App from "./App.vue";
import router from "./router";
import "./styles.scss";

createApp(App).use(router).use(createHead()).mount("#app");
