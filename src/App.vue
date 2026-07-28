<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { RouterView } from "vue-router";
import DemoModal from "./components/DemoModal.vue";
import SiteFooter from "./components/SiteFooter.vue";
import SiteHeader from "./components/SiteHeader.vue";
import { useRouteSeo } from "./seo";

const demoOpen = ref(false);
useRouteSeo();

function openDemo() {
  demoOpen.value = true;
}

onMounted(() => window.addEventListener("open-demo", openDemo));
onBeforeUnmount(() => window.removeEventListener("open-demo", openDemo));
</script>

<template>
  <a class="skip-link" href="#main-content">跳到主要内容</a>
  <SiteHeader />
  <main id="main-content">
    <RouterView />
  </main>
  <SiteFooter />
  <DemoModal v-model:open="demoOpen" />
</template>
