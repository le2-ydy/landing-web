<script setup lang="ts">
import { ArrowRight, CheckCircle2, XCircle } from "lucide-vue-next";
import CtaBand from "../components/CtaBand.vue";
import { scenarioGroups } from "../data";
import heroImage from "../assets/images/service-still.jpg";
import { usePageSeo } from "../seo";

usePageSeo({
  path: "/scenarios",
  title: "服务门店经营场景：排班、会员与对账｜悦店云",
  description: "从晚高峰接待、疗程到期跟进、连锁经营复盘和技师业绩核对，了解悦店云如何解决常见门店经营摩擦。",
  breadcrumbs: [
    { name: "首页", path: "/" },
    { name: "经营场景", path: "/scenarios" },
  ],
});
</script>

<template>
  <div>
    <section class="page-hero scenario-hero">
      <div class="page-hero-copy">
        <span class="eyebrow">典型经营场景</span>
        <h1>问题不在报表里，<br />它发生在每天的交接里</h1>
        <p>这里不使用虚构客户和夸张收益，只展示服务门店常见的经营摩擦，以及系统如何参与解决。</p>
        <RouterLink class="button button--primary" to="/solutions">按行业查看方案 <ArrowRight :size="18" /></RouterLink>
      </div>
      <div class="scenario-image"><img :src="heroImage" alt="门店服务使用的精油、艾灸与护理用品" width="1200" height="900" fetchpriority="high" decoding="async" /></div>
    </section>

    <section class="section scenario-list">
      <article v-for="(scenario, index) in scenarioGroups" :key="scenario.title" class="scenario-row">
        <div class="scenario-title">
          <span>{{ String(index + 1).padStart(2, "0") }}</span>
          <component :is="scenario.icon" :size="28" />
          <h2>{{ scenario.title }}</h2>
        </div>
        <div class="scenario-before">
          <XCircle :size="19" />
          <div><strong>现场摩擦</strong><p>{{ scenario.problem }}</p></div>
        </div>
        <div class="scenario-after">
          <CheckCircle2 :size="19" />
          <div><strong>有序之后</strong><p>{{ scenario.result }}</p></div>
        </div>
      </article>
    </section>

    <section class="section section--soft boundary-section">
      <div class="section-heading">
        <div><span class="eyebrow">表达边界</span><h2>用可验证的流程说话</h2></div>
      </div>
      <div class="boundary-grid">
        <div><strong>不虚构客户</strong><p>没有授权案例时，不展示品牌名称、门店照片或客户评价。</p></div>
        <div><strong>不承诺收益</strong><p>经营结果取决于门店自身条件，不使用无法验证的提升比例。</p></div>
        <div><strong>不替代管理</strong><p>系统帮助流程清晰和数据留痕，最终经营判断仍由团队完成。</p></div>
      </div>
    </section>
    <CtaBand title="把你最耗时间的经营环节带来" description="我们用真实流程演示，不用一套固定话术覆盖所有门店。" />
  </div>
</template>
