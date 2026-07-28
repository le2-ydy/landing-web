<script setup lang="ts">
import { ArrowRight, Check, Minus } from "lucide-vue-next";
import CtaBand from "../components/CtaBand.vue";
import { openDemo, siteConfig } from "../config";
import { pricingFeatures } from "../data";

const comparison = [
  ["预约、收银与现场管理", true, true, true],
  ["会员、储值与疗程卡", true, true, true],
  ["单店经营报表", true, true, true],
  ["多门店经营总览", false, true, true],
  ["统一会员与总部权限", false, true, true],
  ["高级组织与实施方案", false, false, true],
] as const;
</script>

<template>
  <div>
    <section class="centered-hero">
      <span class="eyebrow">产品价格</span>
      <h1>按门店阶段选择，<br />不把价格藏起来</h1>
      <p>从单店日常经营，到连锁总部协同。企业版按组织、实施和接口需求评估。</p>
    </section>

    <section class="section pricing-section">
      <div class="pricing-grid">
        <article class="price-card">
          <span class="plan-label">门店版</span>
          <h2>一家店，先把每天经营理顺</h2>
          <div class="price"><small>¥</small><strong>{{ siteConfig.pricing.store }}</strong><span>/ 月</span></div>
          <p>适合单店足浴、SPA、按摩、采耳与调理门店。</p>
          <button class="button button--secondary" @click="openDemo">预约方案演示 <ArrowRight :size="17" /></button>
          <ul><li v-for="item in pricingFeatures.store" :key="item"><Check :size="15" /> {{ item }}</li></ul>
        </article>

        <article class="price-card price-card--featured">
          <div class="recommended">成长门店常用</div>
          <span class="plan-label">连锁版</span>
          <h2>多家店，用一套标准协同</h2>
          <div class="price"><small>¥</small><strong>{{ siteConfig.pricing.chain }}</strong><span>/ 月起</span></div>
          <p>适合成长型连锁与需要总部管理的综合养生会所。</p>
          <button class="button button--primary" @click="openDemo">预约方案演示 <ArrowRight :size="17" /></button>
          <ul><li v-for="item in pricingFeatures.chain" :key="item"><Check :size="15" /> {{ item }}</li></ul>
        </article>

        <article class="price-card">
          <span class="plan-label">企业版</span>
          <h2>复杂组织，按实际需求规划</h2>
          <div class="price price--custom"><strong>定制报价</strong></div>
          <p>适合大型连锁、复杂权限或有专属实施要求的组织。</p>
          <button class="button button--secondary" @click="openDemo">预约方案演示 <ArrowRight :size="17" /></button>
          <ul><li v-for="item in pricingFeatures.enterprise" :key="item"><Check :size="15" /> {{ item }}</li></ul>
        </article>
      </div>

      <p class="pricing-note">以上为月度方案价格；硬件、短信和定制实施费用按实际需求另行确认。</p>
    </section>

    <section class="section comparison-section">
      <div class="section-heading">
        <div><span class="eyebrow">版本对比</span><h2>差异集中在连锁协同与实施深度</h2></div>
      </div>
      <div class="comparison-table" role="table" aria-label="产品版本能力对比">
        <div class="comparison-row comparison-head" role="row">
          <strong role="columnheader">核心能力</strong><strong role="columnheader">门店版</strong><strong role="columnheader">连锁版</strong><strong role="columnheader">企业版</strong>
        </div>
        <div v-for="row in comparison" :key="row[0]" class="comparison-row" role="row">
          <span role="cell">{{ row[0] }}</span>
          <span v-for="(value, index) in row.slice(1)" :key="index" role="cell">
            <Check v-if="value" :size="17" /><Minus v-else :size="17" />
          </span>
        </div>
      </div>
    </section>
    <CtaBand title="价格清楚，是否合适还要看流程" description="预约一次演示，确认版本是否覆盖你的门店规模和经营方式。" />
  </div>
</template>
