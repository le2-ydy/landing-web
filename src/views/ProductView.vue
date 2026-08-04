<script setup lang="ts">
import { ArrowRight } from "lucide-vue-next";
import CtaBand from "../components/CtaBand.vue";
import ProductConsole from "../components/ProductConsole.vue";
import { productGroups } from "../data";
</script>

<template>
  <div>
    <section class="product-stage-hero">
      <div class="product-stage-copy">
        <span class="eyebrow">产品能力</span>
        <h1>每天在发生的经营，<br />都值得被看清</h1>
        <p>从顾客预约到总部复盘，关键动作使用同一套业务数据，不必在多个工具之间重复登记。</p>
        <RouterLink class="button button--primary" to="/pricing">查看产品价格 <ArrowRight :size="18" /></RouterLink>
      </div>
      <div class="product-stage-console"><ProductConsole /></div>
      <span class="product-stage-note">产品界面与数据示意</span>
    </section>

    <section
      v-for="(group, index) in productGroups"
      :key="group.title"
      class="capability-chapter"
      :class="{ 'capability-chapter--soft': index % 2 === 1 }"
    >
      <div class="capability-chapter-inner" :class="{ 'capability-chapter-inner--reverse': index % 2 === 1 }">
        <div class="capability-chapter-copy">
          <div class="capability-chapter-label">
            <span>{{ String(index + 1).padStart(2, "0") }}</span>
            <component :is="group.icon" :size="20" aria-hidden="true" />
            <strong>{{ group.title }}</strong>
          </div>
          <h2>{{ group.headline }}</h2>
          <p class="capability-chapter-intro">{{ group.description }}</p>
          <div class="capability-feature-list">
            <article v-for="(feature, featureIndex) in group.features" :key="feature.title">
              <span>{{ String(featureIndex + 1).padStart(2, "0") }}</span>
              <div>
                <h3>{{ feature.title }}</h3>
                <p>{{ feature.description }}</p>
              </div>
            </article>
          </div>
        </div>

        <aside class="capability-preview" :aria-label="`${group.title}业务状态示意`">
          <div class="capability-preview-header">
            <div>
              <span>{{ group.preview.eyebrow }}</span>
              <h3>{{ group.preview.title }}</h3>
            </div>
            <small>业务状态</small>
          </div>
          <div class="capability-preview-rows">
            <div
              v-for="row in group.preview.rows"
              :key="`${row.label}-${row.value}`"
              class="capability-preview-row"
              :class="`capability-preview-row--${row.state}`"
            >
              <span class="capability-status-dot" aria-hidden="true" />
              <div>
                <strong>{{ row.label }}</strong>
                <span>{{ row.detail }}</span>
              </div>
              <b>{{ row.value }}</b>
            </div>
          </div>
        </aside>
      </div>
    </section>
    <CtaBand title="带着你的门店流程来看产品" description="演示不从功能清单开始，从你每天最忙的环节开始。" />
  </div>
</template>
