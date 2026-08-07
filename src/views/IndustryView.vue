<script setup lang="ts">
import { ArrowLeft, ArrowRight, Check, Clock3 } from "lucide-vue-next";
import { computed } from "vue";
import CtaBand from "../components/CtaBand.vue";
import { openDemo, siteConfig } from "../config";
import { industries } from "../data";
import { usePageSeo } from "../seo";

const props = defineProps<{ slug: string }>();
const industry = computed(() => industries.find((item) => item.slug === props.slug) ?? industries[0]);
const related = computed(() => industries.filter((item) => item.slug !== industry.value.slug).slice(0, 3));

usePageSeo(() => ({
  path: `/solutions/${industry.value.slug}`,
  title: industry.value.seoTitle,
  description: industry.value.seoDescription,
  breadcrumbs: [
    { name: "首页", path: "/" },
    { name: "行业解决方案", path: "/solutions" },
    { name: industry.value.name, path: `/solutions/${industry.value.slug}` },
  ],
}));
</script>

<template>
  <div :style="{ '--industry-accent': industry.accent }">
    <section class="industry-hero">
      <img
        class="hero-media"
        :src="industry.heroImage"
        :alt="`${industry.name}服务空间`"
        width="1200"
        height="720"
        fetchpriority="high"
        decoding="async"
      />
      <div class="hero-shade" />
      <div class="industry-hero-copy">
        <RouterLink class="back-link" to="/solutions"><ArrowLeft :size="16" /> 行业解决方案</RouterLink>
        <span class="hero-kicker">{{ industry.eyebrow }}</span>
        <h1>{{ industry.headline }}</h1>
        <p>{{ industry.summary }}</p>
        <div class="hero-actions">
          <button class="button button--light" @click="openDemo">
            联系产品顾问 <ArrowRight :size="18" />
          </button>
        </div>
      </div>
      <div class="industry-proof">
        <div class="proof-head"><span class="live-dot" /><strong>{{ industry.proofTitle }}</strong><small>实时状态</small></div>
        <div v-for="row in industry.proofRows" :key="row.label" class="proof-row">
          <span>{{ row.label }}</span><strong :class="`state--${row.state}`">{{ row.value }}</strong>
        </div>
      </div>
    </section>

    <section class="section section--intro">
      <div class="intro-statement">
        <span class="eyebrow">{{ industry.shortName }}经营重点</span>
        <h2>不是一套通用表格，而是一条贴合现场的服务流程。</h2>
      </div>
      <div class="focus-tags">
        <span v-for="focus in industry.operationalFocus" :key="focus"><Check :size="15" /> {{ focus }}</span>
      </div>
    </section>

    <section class="section">
      <div class="section-heading">
        <div><span class="eyebrow">从进店到复购</span><h2>关键动作自然衔接</h2></div>
        <p>减少口头交接和重复登记，把时间留给顾客与现场。</p>
      </div>
      <div class="industry-workflow">
        <article v-for="(step, index) in industry.workflow" :key="step.title">
          <span>{{ String(index + 1).padStart(2, "0") }}</span>
          <Clock3 :size="22" />
          <h3>{{ step.title }}</h3>
          <p>{{ step.detail }}</p>
        </article>
      </div>
    </section>

    <section class="section section--soft">
      <div class="section-heading">
        <div><span class="eyebrow">同一平台，继续生长</span><h2>相邻业态也有对应经营方式</h2></div>
      </div>
      <div class="related-solutions">
        <RouterLink v-for="item in related" :key="item.slug" :to="`/solutions/${item.slug}`">
          <component :is="item.icon" :size="22" />
          <span>{{ item.eyebrow }}</span>
          <strong>{{ item.name }}</strong>
          <ArrowRight :size="18" />
        </RouterLink>
      </div>
    </section>
    <CtaBand :title="`看看${siteConfig.brand}如何适配${industry.name}`" description="带着现有排班、项目和会员流程来，产品顾问会按真实场景沟通。" />
  </div>
</template>
