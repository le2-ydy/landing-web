<script setup lang="ts">
import { ChevronDown, Menu, X } from "lucide-vue-next";
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { openDemo, siteConfig } from "../config";
import { industries } from "../data";

const route = useRoute();
const mobileOpen = ref(false);
const solutionsOpen = ref(false);

watch(
  () => route.fullPath,
  () => {
    mobileOpen.value = false;
    solutionsOpen.value = false;
  },
);

watch(mobileOpen, (open) => {
  document.body.classList.toggle("nav-open", open);
});

function handleKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") {
    mobileOpen.value = false;
    solutionsOpen.value = false;
  }
}

onMounted(() => window.addEventListener("keydown", handleKeydown));
onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeydown);
  document.body.classList.remove("nav-open");
});
</script>

<template>
  <header class="site-header">
    <div class="header-inner">
      <RouterLink class="brand" to="/" :aria-label="`${siteConfig.brand}首页`">
        <span class="brand-mark"><img :src="siteConfig.logoUrl" alt="" /></span>
        <span class="brand-copy">
          <strong>{{ siteConfig.brand }}</strong>
          <small>{{ siteConfig.descriptor }}</small>
        </span>
      </RouterLink>

      <nav class="desktop-nav" aria-label="主要导航">
        <RouterLink to="/product">产品</RouterLink>
        <div class="nav-popover" @mouseenter="solutionsOpen = true" @mouseleave="solutionsOpen = false">
          <button :aria-expanded="solutionsOpen" @click="solutionsOpen = !solutionsOpen">
            解决方案
            <ChevronDown :size="15" />
          </button>
          <div v-show="solutionsOpen" class="solution-menu">
            <RouterLink class="menu-overview" to="/solutions">
              <span>全部行业方案</span>
              <small>按门店经营方式选择</small>
            </RouterLink>
            <RouterLink v-for="industry in industries" :key="industry.slug" :to="`/solutions/${industry.slug}`">
              <component :is="industry.icon" :size="18" />
              {{ industry.shortName }}
            </RouterLink>
          </div>
        </div>
        <RouterLink to="/scenarios">经营场景</RouterLink>
        <RouterLink to="/pricing">价格</RouterLink>
        <RouterLink to="/about">关于</RouterLink>
      </nav>

      <button class="button button--primary header-cta" @click="openDemo">预约演示</button>
      <button
        class="mobile-menu-button"
        :aria-label="mobileOpen ? '关闭导航' : '打开导航'"
        :aria-expanded="mobileOpen"
        aria-controls="mobile-navigation"
        @click="mobileOpen = !mobileOpen"
      >
        <X v-if="mobileOpen" :size="22" />
        <Menu v-else :size="22" />
      </button>
    </div>

    <nav v-if="mobileOpen" id="mobile-navigation" class="mobile-nav" aria-label="移动导航">
      <RouterLink to="/product">产品能力</RouterLink>
      <RouterLink to="/solutions">解决方案</RouterLink>
      <RouterLink v-for="industry in industries" :key="industry.slug" class="mobile-sub-link" :to="`/solutions/${industry.slug}`">
        {{ industry.shortName }}
      </RouterLink>
      <RouterLink to="/scenarios">经营场景</RouterLink>
      <RouterLink to="/pricing">产品价格</RouterLink>
      <RouterLink to="/about">关于平台</RouterLink>
      <button class="button button--primary" @click="openDemo">预约演示</button>
    </nav>
  </header>
</template>
