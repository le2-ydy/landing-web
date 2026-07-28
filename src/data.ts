import {
  Armchair,
  BadgePercent,
  Banknote,
  Bath,
  BedDouble,
  Blocks,
  CalendarCheck,
  ChartNoAxesCombined,
  CircleDollarSign,
  ClipboardCheck,
  Ear,
  Flame,
  Footprints,
  HandPlatter,
  Headphones,
  HeartHandshake,
  LayoutDashboard,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Store,
  UsersRound,
  WalletCards,
  type LucideIcon,
} from "lucide-vue-next";
import footbathHero from "./assets/industries/footbath.jpg";
import spaBeautyHero from "./assets/industries/spa-beauty.jpg";
import massageHero from "./assets/industries/massage.jpg";
import earHeadCareHero from "./assets/industries/ear-head-care.jpg";
import moxibustionHero from "./assets/industries/moxibustion.jpg";
import wellnessChainHero from "./assets/industries/wellness-chain.jpg";

export type ConsoleView = "operations" | "members" | "headquarters";

export type Industry = {
  slug: string;
  name: string;
  shortName: string;
  eyebrow: string;
  headline: string;
  summary: string;
  accent: string;
  heroImage: string;
  icon: LucideIcon;
  operationalFocus: string[];
  workflow: Array<{ title: string; detail: string }>;
  proofTitle: string;
  proofRows: Array<{ label: string; value: string; state: string }>;
};

export const industries: Industry[] = [
  {
    slug: "footbath",
    name: "足浴门店",
    shortName: "足浴",
    eyebrow: "钟房与翻台协同",
    headline: "从排钟到结账，每个足浴位都清清楚楚",
    summary: "把轮牌、加钟、点钟、足浴位和收银放进同一条服务流程，前台少问一次，钟房少跑一趟。",
    accent: "#a57b45",
    heroImage: footbathHero,
    icon: Footprints,
    operationalFocus: ["智能轮牌", "足浴位状态", "加钟与点钟", "服务提成"],
    workflow: [
      { title: "迎宾开单", detail: "到店顾客、预约顾客统一进入接待队列。" },
      { title: "钟房排钟", detail: "按轮牌规则、技师状态和顾客偏好安排服务。" },
      { title: "房态联动", detail: "足浴位、包间、加钟与换房实时同步。" },
      { title: "收银结算", detail: "项目、商品、会员权益与技师业绩一次结清。" },
    ],
    proofTitle: "今晚钟房",
    proofRows: [
      { label: "A12 · 2号足浴位", value: "服务中 46'", state: "normal" },
      { label: "B07 · 6号足浴位", value: "待加钟", state: "warn" },
      { label: "C18 · 云水包间", value: "待清洁", state: "muted" },
    ],
  },
  {
    slug: "spa-beauty",
    name: "SPA 与美容美体",
    shortName: "SPA 美业",
    eyebrow: "疗程与会员经营",
    headline: "把每一次护理，沉淀为下一次到店",
    summary: "从顾问接待、房间安排到疗程核销和会员跟进，让高质量服务和长期复购使用同一份顾客档案。",
    accent: "#8c3d48",
    heroImage: spaBeautyHero,
    icon: Sparkles,
    operationalFocus: ["疗程管理", "顾问业绩", "房间预约", "会员回访"],
    workflow: [
      { title: "顾问预约", detail: "项目偏好、护理周期与顾问归属提前可见。" },
      { title: "护理准备", detail: "房间、护理师和耗材需求随预约同步。" },
      { title: "疗程核销", detail: "次数、有效期、赠送权益和签字记录清晰留痕。" },
      { title: "到期回访", detail: "按护理周期生成跟进名单，不靠个人记忆。" },
    ],
    proofTitle: "今日护理",
    proofRows: [
      { label: "面部焕活 · 90分钟", value: "兰庭房", state: "normal" },
      { label: "芳香舒缓 · 120分钟", value: "顾问待确认", state: "warn" },
      { label: "身体护理 · 60分钟", value: "已备房", state: "muted" },
    ],
  },
  {
    slug: "massage",
    name: "按摩养生门店",
    shortName: "按摩养生",
    eyebrow: "预约与技师排班",
    headline: "让顾客选得到时间，让门店排得开技师",
    summary: "项目时长、技师能力、房间资源和预约库存同步计算，减少撞单、空档和反复确认。",
    accent: "#25637a",
    heroImage: massageHero,
    icon: HandPlatter,
    operationalFocus: ["在线预约", "技师排班", "服务履约", "评价复购"],
    workflow: [
      { title: "项目预约", detail: "顾客按项目、门店、技师和可用时段预约。" },
      { title: "库存校验", detail: "技师、房间与项目时长同时参与可约判断。" },
      { title: "到店履约", detail: "核销、开始、完成和服务备注按节点推进。" },
      { title: "评价复购", detail: "完成后自动进入评价与再次预约路径。" },
    ],
    proofTitle: "下午排班",
    proofRows: [
      { label: "李技师 · 肩颈舒缓", value: "14:00–15:00", state: "normal" },
      { label: "王技师 · 全身按摩", value: "15:30–17:00", state: "normal" },
      { label: "周技师 · 运动恢复", value: "待到店", state: "warn" },
    ],
  },
  {
    slug: "ear-head-care",
    name: "采耳与头疗",
    shortName: "采耳头疗",
    eyebrow: "组合项目与包间",
    headline: "项目越细，前台越需要一套简单的安排方式",
    summary: "组合项目、技师手法、服务时长与包间状态统一管理，既保留服务特色，也守住高峰期的接待秩序。",
    accent: "#745f8d",
    heroImage: earHeadCareHero,
    icon: Ear,
    operationalFocus: ["组合项目", "包间房态", "手法标签", "周期复购"],
    workflow: [
      { title: "需求识别", detail: "按采耳、头疗和组合服务快速选择项目。" },
      { title: "技师匹配", detail: "按掌握手法、排班和顾客偏好推荐可选技师。" },
      { title: "包间安排", detail: "服务时长自动占用包间并预留清洁缓冲。" },
      { title: "复购提醒", detail: "按上次服务和周期形成顾客跟进任务。" },
    ],
    proofTitle: "包间状态",
    proofRows: [
      { label: "听雨 · 沉浸采耳", value: "服务中", state: "normal" },
      { label: "松风 · 头疗组合", value: "16:20 入场", state: "warn" },
      { label: "月白 · 深度采耳", value: "可预约", state: "muted" },
    ],
  },
  {
    slug: "moxibustion",
    name: "艾灸与经络调理",
    shortName: "艾灸调理",
    eyebrow: "周期与资源设备",
    headline: "疗程有周期，经营也该有节奏",
    summary: "疗程卡、艾灸床、调理记录和下次预约形成闭环，让周期服务不再散落在纸本和聊天记录里。",
    accent: "#9b593d",
    heroImage: moxibustionHero,
    icon: Flame,
    operationalFocus: ["疗程卡", "设备资源", "调理记录", "周期预约"],
    workflow: [
      { title: "建立疗程", detail: "记录项目次数、周期、有效期和适用门店。" },
      { title: "预约资源", detail: "同步校验调理师、艾灸床与服务时长。" },
      { title: "服务记录", detail: "每次核销留下项目、备注和顾客偏好。" },
      { title: "周期续约", detail: "按剩余次数和计划周期提醒下次预约。" },
    ],
    proofTitle: "疗程进度",
    proofRows: [
      { label: "温养疗程 · 8次", value: "已完成 5", state: "normal" },
      { label: "经络调理 · 10次", value: "7天后到期", state: "warn" },
      { label: "艾灸床 03", value: "17:00 可用", state: "muted" },
    ],
  },
  {
    slug: "wellness-chain",
    name: "连锁综合养生会所",
    shortName: "连锁会所",
    eyebrow: "总部与多门店",
    headline: "门店各自忙，总部仍然看得清",
    summary: "跨业态项目、统一会员、门店权限和经营报表集中管理，让总部掌握标准，也给一线留下足够效率。",
    accent: "#18483a",
    heroImage: wellnessChainHero,
    icon: Blocks,
    operationalFocus: ["多门店总览", "统一会员", "跨店权限", "财务审计"],
    workflow: [
      { title: "统一标准", detail: "总部维护项目、会员权益和关键经营口径。" },
      { title: "门店执行", detail: "门店按授权管理本店预约、员工和现场服务。" },
      { title: "数据归集", detail: "经营、会员、财务与技师数据按门店汇总。" },
      { title: "总部复盘", detail: "按区域、门店和项目定位变化与待办。" },
    ],
    proofTitle: "门店经营",
    proofRows: [
      { label: "华东 12 店", value: "预约达成 86%", state: "normal" },
      { label: "本月新增会员", value: "1,284 人", state: "normal" },
      { label: "待处理退款", value: "7 笔", state: "warn" },
    ],
  },
];

export const consoleViews: Array<{
  id: ConsoleView;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
}> = [
  {
    id: "operations",
    label: "门店现场",
    eyebrow: "今天怎么排",
    title: "预约、房间和技师，在一张营业日程里",
    description: "高峰期先看冲突和待办，前台不再逐个问房间、问技师。",
    points: ["实时营业日程", "房态与技师状态", "到店与异常提醒"],
  },
  {
    id: "members",
    label: "会员经营",
    eyebrow: "谁需要跟进",
    title: "每次到店，都能接上下次服务",
    description: "从疗程余额、到期时间和上次消费找到真正需要联系的顾客。",
    points: ["疗程到期清单", "会员资产总览", "回访任务归属"],
  },
  {
    id: "headquarters",
    label: "连锁总部",
    eyebrow: "哪里有变化",
    title: "先看门店差异，再回到业务明细",
    description: "总部使用统一口径比较门店，异常数据都有路径回到真实业务。",
    points: ["跨店经营对比", "统一会员口径", "财务与权限审计"],
  },
];

export const productGroups: Array<{
  title: string;
  description: string;
  icon: LucideIcon;
  items: string[];
}> = [
  { title: "预约与接待", description: "把线上预约和现场到店放进同一张营业日程。", icon: CalendarCheck, items: ["多渠道预约", "房间与技师库存", "核销与到店提醒"] },
  { title: "现场与排班", description: "前台、钟房、房态和技师状态实时同步。", icon: Armchair, items: ["轮牌与点钟", "房态与资源", "请假调班"] },
  { title: "收银与权益", description: "现金、微信、储值和疗程权益一次结清。", icon: Banknote, items: ["组合收银", "储值与疗程卡", "退款与对账"] },
  { title: "会员与营销", description: "从顾客档案出发安排回访、优惠和复购。", icon: UsersRound, items: ["统一会员档案", "优惠券与积分", "分层回访"] },
  { title: "业绩与财务", description: "项目、技师、门店和支付数据使用同一口径。", icon: ChartNoAxesCombined, items: ["技师业绩", "门店日结", "经营报表"] },
  { title: "连锁与权限", description: "总部标准和门店操作边界清晰可追溯。", icon: ShieldCheck, items: ["多门店总览", "角色权限", "操作审计"] },
];

export const journey = [
  { label: "获客预约", icon: CalendarCheck, detail: "项目、门店、技师与时段" },
  { label: "到店接待", icon: Store, detail: "核销、排队与房态" },
  { label: "服务履约", icon: ClipboardCheck, detail: "开始、完成与服务记录" },
  { label: "收银核销", icon: CircleDollarSign, detail: "支付、储值与疗程权益" },
  { label: "会员复购", icon: HeartHandshake, detail: "评价、回访与再次预约" },
  { label: "总部复盘", icon: LayoutDashboard, detail: "门店、业绩与财务口径" },
];

export const moreIndustries = [
  { name: "修脚与足部护理", icon: Footprints },
  { name: "产后修复", icon: HeartHandshake },
  { name: "运动恢复", icon: ScanLine },
  { name: "芳香护理", icon: Sparkles },
  { name: "汗蒸与轻养生", icon: Bath },
  { name: "小型理疗工作室", icon: BedDouble },
];

export const pricingFeatures = {
  store: ["单门店预约与收银", "房间、技师与排班", "会员、储值与疗程卡", "经营报表与日结", "标准权限与操作记录"],
  chain: ["多门店经营总览", "统一会员与权益", "总部标准与门店权限", "跨店数据分析", "财务对账与审计"],
  enterprise: ["专属实施方案", "高级组织与权限", "数据迁移支持", "接口需求评估", "专属服务响应"],
};

export const scenarioGroups = [
  {
    title: "晚高峰接待",
    problem: "预约、散客、房间和技师同时变化，前台靠对讲和纸笔反复确认。",
    result: "一张营业日程同步待到店、房态和技师状态，异常安排立即显现。",
    icon: Headphones,
  },
  {
    title: "疗程到期跟进",
    problem: "疗程次数和到期日分散在表格中，顾问难以及时找到应该联系的顾客。",
    result: "按剩余次数、到期时间和上次到店生成明确的会员跟进清单。",
    icon: WalletCards,
  },
  {
    title: "连锁经营复盘",
    problem: "各店统计方式不同，总部每周都要重新整理收入、预约和会员数据。",
    result: "按统一口径查看门店经营，保留从汇总指标回到业务明细的路径。",
    icon: ChartNoAxesCombined,
  },
  {
    title: "技师业绩核对",
    problem: "加钟、点钟、项目拆分和退款让月底业绩核对耗时且容易争议。",
    result: "业绩跟随真实服务与退款记录变化，每项金额都有来源可查。",
    icon: BadgePercent,
  },
];
