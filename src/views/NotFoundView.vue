<script setup lang="ts">
import { ArrowLeft, LayoutGrid } from "lucide-vue-next";
</script>

<template>
  <section class="not-found">
    <span class="eyebrow">404 · 页面未找到</span>
    <h1>这条路径暂时没有内容</h1>
    <p>地址可能已经变更。你可以返回首页，或从行业解决方案继续浏览。</p>
    <div class="not-found-actions">
      <RouterLink class="button button--primary" to="/"><ArrowLeft :size="18" /> 返回首页</RouterLink>
      <RouterLink class="text-link" to="/solutions">查看行业方案 <LayoutGrid :size="17" /></RouterLink>
    </div>
  </section>
</template>
