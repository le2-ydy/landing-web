<script setup lang="ts">
import {
  Bell,
  Building2,
  CalendarDays,
  Clock3,
  Search,
  TrendingUp,
  UsersRound,
  WalletCards,
} from "lucide-vue-next";
import { computed, ref, watch } from "vue";
import { siteConfig } from "../config";
import { consoleViews, type ConsoleView } from "../data";

const props = withDefaults(defineProps<{ initialView?: ConsoleView }>(), {
  initialView: "operations",
});

const activeView = ref<ConsoleView>(props.initialView);
const tabRefs = ref<HTMLButtonElement[]>([]);

watch(
  () => props.initialView,
  (view) => {
    activeView.value = view;
  },
);

const metrics = computed(() => {
  if (activeView.value === "members") {
    return [
      { label: "活跃会员", value: "2,486", helper: "本月新增 126", tone: "positive" },
      { label: "待回访", value: "38", helper: "今日到期 9", tone: "warning" },
      { label: "疗程资产", value: "¥386,200", helper: "数据示意", tone: "neutral" },
    ];
  }
  if (activeView.value === "headquarters") {
    return [
      { label: "营业门店", value: "12", helper: "华东区域", tone: "neutral" },
      { label: "预约达成", value: "86%", helper: "较上周 +3.2%", tone: "positive" },
      { label: "本月实收", value: "¥842,600", helper: "数据示意", tone: "positive" },
    ];
  }
  return [
    { label: "今日预约", value: "32", helper: "待到店 8", tone: "warning" },
    { label: "服务中", value: "12", helper: "房间占用 68%", tone: "neutral" },
    { label: "今日实收", value: "¥12,680", helper: "数据示意", tone: "positive" },
  ];
});

function selectView(view: ConsoleView) {
  activeView.value = view;
}

function onTabKeydown(event: KeyboardEvent, index: number) {
  if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
  event.preventDefault();
  let next = index;
  if (event.key === "ArrowRight") next = (index + 1) % consoleViews.length;
  if (event.key === "ArrowLeft") next = (index - 1 + consoleViews.length) % consoleViews.length;
  if (event.key === "Home") next = 0;
  if (event.key === "End") next = consoleViews.length - 1;
  const view = consoleViews[next];
  activeView.value = view.id;
  tabRefs.value[next]?.focus();
}
</script>

<template>
  <div class="product-console" aria-label="门店经营工作台界面示意">
    <div class="console-sidebar" aria-hidden="true">
      <div class="console-logo"><img :src="siteConfig.logoUrl" alt="" /></div>
      <span class="console-nav-dot is-active" />
      <span class="console-nav-dot" />
      <span class="console-nav-dot" />
      <span class="console-nav-dot" />
    </div>

    <div class="console-main">
      <div class="console-topbar">
        <div>
          <small>演示门店 · 7月27日</small>
          <strong>{{ consoleViews.find((view) => view.id === activeView)?.label }}</strong>
        </div>
        <div class="console-actions" aria-hidden="true">
          <Search :size="16" />
          <Bell :size="16" />
          <span class="console-avatar">林</span>
        </div>
      </div>

      <div class="console-tabs" role="tablist" aria-label="工作台视角">
        <button
          v-for="(view, index) in consoleViews"
          :id="`console-tab-${view.id}`"
          :key="view.id"
          ref="tabRefs"
          type="button"
          role="tab"
          :aria-controls="`console-panel-${view.id}`"
          :aria-selected="activeView === view.id"
          :tabindex="activeView === view.id ? 0 : -1"
          @click="selectView(view.id)"
          @keydown="onTabKeydown($event, index)"
        >
          {{ view.label }}
        </button>
      </div>

      <div class="console-kpis">
        <div v-for="metric in metrics" :key="metric.label">
          <span>{{ metric.label }}</span>
          <strong>{{ metric.value }}</strong>
          <small :class="`metric--${metric.tone}`">{{ metric.helper }}</small>
        </div>
      </div>

      <div
        :id="`console-panel-${activeView}`"
        class="console-workspace"
        role="tabpanel"
        :aria-labelledby="`console-tab-${activeView}`"
        aria-live="polite"
      >
        <template v-if="activeView === 'operations'">
          <div class="console-schedule">
            <div class="console-section-head">
              <strong><CalendarDays :size="16" /> 营业日程</strong>
              <span class="console-context">14:00–18:00</span>
            </div>
            <div class="timeline">
              <div class="time-column"><span>14:00</span><span>15:00</span><span>16:00</span><span>17:00</span></div>
              <div class="schedule-column">
                <div class="booking booking--green"><strong>肩颈舒缓</strong><span>李明 · 雅竹房</span></div>
                <div class="booking booking--gold"><strong>芳香护理</strong><span>王芳 · 兰庭房</span></div>
              </div>
              <div class="schedule-column">
                <div class="booking booking--blue"><strong>足部养护</strong><span>周师傅 · 足浴位 06</span></div>
                <div class="booking booking--wine"><strong>沉浸采耳</strong><span>林晓 · 听雨房</span></div>
              </div>
            </div>
          </div>
          <div class="console-team">
            <div class="console-section-head"><strong><UsersRound :size="16" /> 技师状态</strong></div>
            <div v-for="person in [
              ['李明', '服务中', '4 单'],
              ['王芳', '空闲', '3 单'],
              ['周师傅', '服务中', '5 单'],
              ['林晓', '休息', '2 单'],
            ]" :key="person[0]" class="team-row">
              <span class="team-avatar">{{ person[0].slice(0, 1) }}</span>
              <div><strong>{{ person[0] }}</strong><small>{{ person[1] }}</small></div>
              <span><Clock3 :size="12" /> {{ person[2] }}</span>
            </div>
          </div>
        </template>

        <template v-else-if="activeView === 'members'">
          <div class="console-member-list">
            <div class="console-section-head">
              <strong><WalletCards :size="16" /> 今日会员跟进</strong>
              <span class="console-context">按紧急度排序</span>
            </div>
            <div v-for="member in [
              ['周女士', '肩颈疗程剩余 2 次', '3 天后到期', 'urgent'],
              ['林先生', '距上次到店 28 天', '建议回访', 'normal'],
              ['许女士', '储值余额 ¥860', '生日月', 'accent'],
              ['陈先生', '首次服务已完成', '待评价', 'muted'],
            ]" :key="member[0]" class="member-row">
              <span class="member-avatar">{{ member[0].slice(0, 1) }}</span>
              <div><strong>{{ member[0] }}</strong><small>{{ member[1] }}</small></div>
              <span :class="`member-state member-state--${member[3]}`">{{ member[2] }}</span>
            </div>
          </div>
          <div class="console-member-summary">
            <span>本周复购进度</span>
            <strong>68%</strong>
            <div class="summary-bar"><span /></div>
            <small>已完成 86 / 目标 126</small>
          </div>
        </template>

        <template v-else>
          <div class="console-store-ranking">
            <div class="console-section-head">
              <strong><Building2 :size="16" /> 门店经营对比</strong>
              <span class="console-context">本月</span>
            </div>
            <div v-for="store in [
              ['徐汇店', '92%', '¥126,800', 92],
              ['浦东店', '86%', '¥112,460', 86],
              ['长宁店', '78%', '¥96,200', 78],
              ['静安店', '74%', '¥88,640', 74],
            ]" :key="store[0]" class="store-rank-row">
              <strong>{{ store[0] }}</strong>
              <div class="rank-bar"><span :style="{ width: `${store[3]}%` }" /></div>
              <span>{{ store[1] }}</span>
              <small>{{ store[2] }}</small>
            </div>
          </div>
          <div class="console-trend">
            <TrendingUp :size="19" />
            <span>预约达成</span>
            <strong>86%</strong>
            <small>连续 4 周改善</small>
            <div class="mini-bars" aria-hidden="true">
              <span v-for="height in [38, 46, 43, 58, 64, 72, 81]" :key="height" :style="{ height: `${height}%` }" />
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
