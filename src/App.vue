<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { RouterView } from "vue-router";
import DemoModal from "./components/DemoModal.vue";
import SiteFooter from "./components/SiteFooter.vue";
import SiteHeader from "./components/SiteHeader.vue";

const demoOpen = ref(false);
const navigationOpen = ref(false);

function openDemo() {
  demoOpen.value = true;
}

onMounted(() => window.addEventListener("open-demo", openDemo));
onBeforeUnmount(() => window.removeEventListener("open-demo", openDemo));
</script>

<template>
  <a class="skip-link" href="#main-content" :inert="demoOpen || navigationOpen">跳到主要内容</a>
  <SiteHeader :inert="demoOpen" @navigation-state="navigationOpen = $event" />
  <main
    id="main-content"
    tabindex="-1"
    :inert="demoOpen || navigationOpen"
    :aria-hidden="demoOpen || navigationOpen ? 'true' : undefined"
  >
    <RouterView />
  </main>
  <SiteFooter
    :inert="demoOpen || navigationOpen"
    :aria-hidden="demoOpen || navigationOpen ? 'true' : undefined"
  />
  <DemoModal v-model:open="demoOpen" />
</template>
