<script setup lang="ts">
import { ArrowRight, MoveRight } from "lucide-vue-next";
import { openDemo } from "../config";
import { industries, journey } from "../data";
import CtaBand from "../components/CtaBand.vue";
import ProductConsole from "../components/ProductConsole.vue";
import PulseRail from "../components/PulseRail.vue";
import heroImage from "../assets/images/store-interior.jpg";
import serviceImage from "../assets/images/therapy-hero.jpg";
</script>

<template>
  <div>
    <section class="home-hero">
      <img
        class="hero-media"
        :src="heroImage"
        alt="安静有序的服务门店接待空间"
        width="1200"
        height="900"
        fetchpriority="high"
        decoding="async"
      />
      <div class="hero-shade" />
      <div class="home-hero-content">
        <span class="hero-kicker">服务型门店经营平台</span>
        <h1>门店越忙，<br />经营越要有序</h1>
        <p>把预约、房间、技师、收银和会员放在同一套经营节奏里。从一家店，到一组好门店。</p>
        <div class="hero-actions">
          <button class="button button--light" @click="openDemo">预约产品演示 <ArrowRight :size="18" /></button>
          <RouterLink class="text-link text-link--light" to="/product">查看产品能力 <MoveRight :size="17" /></RouterLink>
        </div>
      </div>
      <PulseRail />
    </section>

    <section class="section section--intro">
      <div class="intro-statement">
        <span class="eyebrow">一个营业日，一套共同语言</span>
        <h2>前台看安排，技师看服务，店长看现场，总部看经营。</h2>
      </div>
      <p class="intro-side">不再让每个角色维护一份自己的表格。业务发生时，经营数据同步留下。</p>
    </section>

    <section class="section product-proof">
      <div class="section-heading">
        <div>
          <span class="eyebrow">今日营业工作台</span>
          <h2>先处理现场，再看懂经营</h2>
        </div>
        <p>不是只在月底出现的报表。每一次预约、开单、履约和收银，都在同一套数据里发生。</p>
      </div>
      <ProductConsole />
      <p class="console-caption">界面与经营数据均为产品能力示意</p>
    </section>

    <section class="section section--wide section--dark">
      <div class="section-heading section-heading--light">
        <div>
          <span class="eyebrow eyebrow--light">完整经营闭环</span>
          <h2>顾客从预约到复购，门店不丢掉任何一环</h2>
        </div>
        <RouterLink class="text-link text-link--light" to="/solutions">查看解决方案 <ArrowRight :size="17" /></RouterLink>
      </div>
      <div class="journey-line">
        <div v-for="(step, index) in journey" :key="step.label" class="journey-step">
          <div class="journey-index">{{ String(index + 1).padStart(2, "0") }}</div>
          <component :is="step.icon" :size="24" />
          <strong>{{ step.label }}</strong>
          <span>{{ step.detail }}</span>
        </div>
      </div>
    </section>

    <section class="split-feature">
      <div class="split-media">
        <img :src="serviceImage" alt="服务人员正在准备按摩房间" width="1200" height="900" loading="lazy" decoding="async" />
      </div>
      <div class="split-copy">
        <span class="eyebrow">懂系统，也懂门店现场</span>
        <h2>流程不应该打断服务，而应该托住服务</h2>
        <p>高峰期要快，交接时要清楚，月底核对要有依据。产品设计从这些真实动作出发，而不是把一张复杂表格搬到屏幕上。</p>
        <div class="split-points">
          <span><strong>少问</strong> 状态实时同步</span>
          <span><strong>少等</strong> 安排提前校验</span>
          <span><strong>少错</strong> 业务自动留痕</span>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="section-heading">
        <div>
          <span class="eyebrow">行业方案</span>
          <h2>同样是服务门店，经营方式并不相同</h2>
        </div>
        <p>为每种业态保留自己的现场语言和管理重点。</p>
      </div>
      <div class="industry-editorial-list">
        <RouterLink
          v-for="(industry, index) in industries"
          :key="industry.slug"
          class="industry-editorial-item"
          :to="`/solutions/${industry.slug}`"
          :style="{ '--industry-accent': industry.accent }"
        >
          <div class="industry-editorial-media">
            <img :src="industry.heroImage" :alt="`${industry.name}经营空间示意`" width="1200" height="720" loading="lazy" decoding="async" />
            <span>{{ String(index + 1).padStart(2, "0") }}</span>
          </div>
          <div class="industry-editorial-copy">
            <component :is="industry.icon" :size="22" />
            <span>{{ industry.eyebrow }}</span>
            <h3>{{ industry.name }}</h3>
            <p>{{ industry.summary }}</p>
            <strong>查看方案 <ArrowRight :size="16" /></strong>
          </div>
        </RouterLink>
      </div>
    </section>

    <CtaBand />
  </div>
</template>
