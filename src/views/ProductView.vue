<script setup lang="ts">
import { ArrowRight, Check, CircleCheckBig } from "lucide-vue-next";
import CtaBand from "../components/CtaBand.vue";
import ProductConsole from "../components/ProductConsole.vue";
import { journey, productGroups } from "../data";
import detailImage from "../../../customer-uniapp_static/static/images/service-still.jpg";
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

    <section class="section">
      <div class="section-heading">
        <div>
          <span class="eyebrow">能力地图</span>
          <h2>覆盖服务门店的完整营业周期</h2>
        </div>
        <p>每个模块既能单独解决问题，也与上下游业务自然衔接。</p>
      </div>
      <div class="capability-list">
        <article v-for="(group, index) in productGroups" :key="group.title" class="capability-row">
          <div class="capability-number">{{ String(index + 1).padStart(2, "0") }}</div>
          <component :is="group.icon" :size="27" />
          <div class="capability-copy">
            <h3>{{ group.title }}</h3>
            <p>{{ group.description }}</p>
          </div>
          <ul>
            <li v-for="item in group.items" :key="item"><Check :size="14" /> {{ item }}</li>
          </ul>
        </article>
      </div>
    </section>

    <section class="section section--soft product-flow">
      <div class="section-heading">
        <div>
          <span class="eyebrow">数据随业务流动</span>
          <h2>只在动作发生时记录一次</h2>
        </div>
      </div>
      <div class="flow-track">
        <div v-for="(step, index) in journey" :key="step.label" class="flow-node">
          <CircleCheckBig :size="20" />
          <div><strong>{{ step.label }}</strong><span>{{ step.detail }}</span></div>
          <ArrowRight v-if="index < journey.length - 1" class="flow-arrow" :size="18" />
        </div>
      </div>
    </section>

    <section class="split-feature split-feature--reverse">
      <div class="split-media"><img :src="detailImage" alt="门店服务使用的毛巾、精油和护理器具" width="1200" height="900" loading="lazy" decoding="async" /></div>
      <div class="split-copy">
        <span class="eyebrow">边界清楚，操作放心</span>
        <h2>该谁看、该谁改、发生了什么，都留有依据</h2>
        <p>总部、店长、前台、财务和技师按职责使用对应信息。退款、调价、权限调整等关键操作保留记录，方便日常核对。</p>
        <ul class="plain-checks">
          <li><Check :size="17" /> 角色与门店数据范围</li>
          <li><Check :size="17" /> 敏感操作权限控制</li>
          <li><Check :size="17" /> 业务记录与操作审计</li>
        </ul>
      </div>
    </section>
    <CtaBand title="带着你的门店流程来看产品" description="演示不从功能清单开始，从你每天最忙的环节开始。" />
  </div>
</template>
