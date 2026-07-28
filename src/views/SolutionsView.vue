<script setup lang="ts">
import { ArrowRight } from "lucide-vue-next";
import CtaBand from "../components/CtaBand.vue";
import { industries, journey, moreIndustries } from "../data";
</script>

<template>
  <div>
    <section class="solution-mosaic-hero">
      <div class="solution-mosaic" aria-hidden="true">
        <img v-for="industry in industries" :key="industry.slug" :src="industry.heroImage" alt="" />
      </div>
      <div class="hero-shade" />
      <div class="image-page-hero-copy">
        <span class="hero-kicker">行业解决方案</span>
        <h1>保留每种服务的特色，<br />统一每家门店的秩序</h1>
        <p>足浴、SPA、按摩、采耳和调理门店，现场语言各不相同，但都需要清楚的预约、履约、会员与经营闭环。</p>
      </div>
    </section>

    <section class="section">
      <div class="section-heading">
        <div>
          <span class="eyebrow">六类行业方案</span>
          <h2>从你的经营方式开始</h2>
        </div>
        <p>每套方案都使用对应的角色、资源、流程和经营指标。</p>
      </div>
      <div class="solution-list">
        <RouterLink
          v-for="(industry, index) in industries"
          :key="industry.slug"
          class="solution-row"
          :to="`/solutions/${industry.slug}`"
          :style="{ '--industry-accent': industry.accent }"
        >
          <div class="solution-thumb">
            <img :src="industry.heroImage" alt="" />
            <span>{{ String(index + 1).padStart(2, "0") }}</span>
          </div>
          <component :is="industry.icon" :size="28" />
          <div><small>{{ industry.eyebrow }}</small><h2>{{ industry.name }}</h2><p>{{ industry.summary }}</p></div>
          <ArrowRight :size="22" />
        </RouterLink>
      </div>
    </section>

    <section class="section section--dark">
      <div class="section-heading section-heading--light">
        <div>
          <span class="eyebrow eyebrow--light">共同经营闭环</span>
          <h2>业务不同，数据仍能沿着同一条路径沉淀</h2>
        </div>
      </div>
      <div class="journey-line journey-line--compact">
        <div v-for="(step, index) in journey" :key="step.label" class="journey-step">
          <div class="journey-index">{{ String(index + 1).padStart(2, "0") }}</div>
          <component :is="step.icon" :size="23" />
          <strong>{{ step.label }}</strong>
          <span>{{ step.detail }}</span>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="section-heading">
        <div><span class="eyebrow">更多适用业态</span><h2>相同经营模型，也能自然适配</h2></div>
        <p>这些业态作为能力延展展示，不占用主要行业导航。</p>
      </div>
      <div class="more-industry-grid">
        <div v-for="item in moreIndustries" :key="item.name">
          <component :is="item.icon" :size="22" />
          <strong>{{ item.name }}</strong>
        </div>
      </div>
    </section>
    <CtaBand title="不确定属于哪一种方案？" description="说说你的门店规模和服务流程，我们从实际经营方式判断。" />
  </div>
</template>
