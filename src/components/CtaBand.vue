<script setup lang="ts">
import { ArrowRight } from "lucide-vue-next";
import { openDemo } from "../config";

withDefaults(defineProps<{ title?: string; description?: string }>(), {
  title: "把门店的忙，变成看得见的秩序",
  description: "预约一次产品演示，从你的实际经营流程开始。",
});
</script>

<template>
  <section class="cta-band">
    <div>
      <span class="eyebrow eyebrow--light">下一步</span>
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
    </div>
    <button class="button button--light" @click="openDemo">预约产品演示 <ArrowRight :size="18" /></button>
  </section>
</template>
