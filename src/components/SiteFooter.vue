<script setup lang="ts">
import { ArrowUpRight } from "lucide-vue-next";
import { siteConfig } from "../config";
import { industries } from "../data";
</script>

<template>
  <footer class="site-footer">
    <div class="footer-main">
      <div class="footer-brand">
        <div class="brand brand--footer">
          <span class="brand-mark"><img :src="siteConfig.logoUrl" alt="" /></span>
          <span class="brand-copy"><strong>{{ siteConfig.brand }}</strong><small>{{ siteConfig.descriptor }}</small></span>
        </div>
        <p>为服务型门店整理预约、现场、会员与经营数据。</p>
      </div>
      <div class="footer-column">
        <strong>产品</strong>
        <RouterLink to="/product">产品能力</RouterLink>
        <RouterLink to="/pricing">产品价格</RouterLink>
        <RouterLink to="/scenarios">经营场景</RouterLink>
      </div>
      <div class="footer-column">
        <strong>行业方案</strong>
        <RouterLink v-for="industry in industries.slice(0, 4)" :key="industry.slug" :to="`/solutions/${industry.slug}`">
          {{ industry.shortName }}
        </RouterLink>
      </div>
      <div class="footer-column">
        <strong>联系</strong>
        <a v-if="siteConfig.contactPhone" :href="`tel:${siteConfig.contactPhone}`">{{ siteConfig.contactPhone }}</a>
        <RouterLink to="/about">关于平台</RouterLink>
        <a href="#main-content">返回顶部 <ArrowUpRight :size="14" /></a>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 {{ siteConfig.brand }}. 保留所有权利。</span>
      <span>预约 · 现场 · 会员 · 连锁经营</span>
    </div>
  </footer>
</template>
