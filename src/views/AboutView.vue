<script setup lang="ts">
import { ArrowRight, Building2, Focus, Layers3, Route } from "lucide-vue-next";
import { openDemo, siteConfig } from "../config";
import CtaBand from "../components/CtaBand.vue";
import image from "../assets/images/therapy-hero.jpg";

const principles = [
  { title: "从现场动作出发", detail: "先理解接待、排班、服务和交接，再决定界面应该出现什么。", icon: Route },
  { title: "让边界保持清楚", detail: "角色、权限、金额和状态都应该有明确来源，减少模糊地带。", icon: Focus },
  { title: "让系统可以生长", detail: "从一家店的日常操作开始，也能承接多门店的统一经营。", icon: Layers3 },
];
</script>

<template>
  <div>
    <section class="about-hero">
      <div class="about-wordmark" aria-hidden="true"><img :src="siteConfig.logoUrl" alt="" /></div>
      <div class="about-intro">
        <span class="eyebrow">关于平台</span>
        <h1>让好服务，<br />被更好的经营托住</h1>
        <p>{{ siteConfig.brand }}专注服务型门店，把预约、现场、会员与经营数据连接起来，让一线更从容，让管理更清楚。</p>
        <button class="button button--primary" @click="openDemo">预约产品演示 <ArrowRight :size="18" /></button>
      </div>
    </section>

    <section class="about-image-band"><img :src="image" alt="服务人员正在整理按摩床和毛巾" width="1200" height="900" loading="lazy" decoding="async" /></section>

    <section class="section about-mission">
      <div>
        <span class="eyebrow">我们相信</span>
        <h2>好的门店系统，不该让服务人员把更多时间花在系统上。</h2>
      </div>
      <p>它应该在高峰期快速响应，在交接时给出清楚状态，在月底核对时保留依据。日常操作自然完成，经营视角随之形成。</p>
    </section>

    <section class="section section--soft">
      <div class="principle-grid">
        <article v-for="principle in principles" :key="principle.title">
          <component :is="principle.icon" :size="27" />
          <h2>{{ principle.title }}</h2>
          <p>{{ principle.detail }}</p>
        </article>
      </div>
    </section>

    <section class="section contact-strip">
      <Building2 :size="28" />
      <div><span class="eyebrow">从一家店到多家店</span><h2>今天操作简单，明天仍能继续生长</h2></div>
      <p>从单店的营业日程开始，逐步连接会员、财务和总部管理，不让系统成为扩张的新负担。</p>
    </section>
    <CtaBand />
  </div>
</template>
