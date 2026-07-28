<script setup lang="ts">
import { CalendarCheck, CircleDollarSign, DoorOpen, UsersRound } from "lucide-vue-next";

const signals = [
  { label: "今日预约", value: "128", change: "+18", icon: CalendarCheck },
  { label: "服务中", value: "26", change: "8 店", icon: UsersRound },
  { label: "可用房间", value: "42", change: "实时", icon: DoorOpen },
  { label: "今日实收", value: "¥86,420", change: "+12.6%", icon: CircleDollarSign },
];
</script>

<template>
  <div class="pulse-rail" aria-label="经营脉搏">
    <div class="pulse-label">
      <span class="live-dot" />
      <span>经营脉搏</span>
      <small>演示门店数据</small>
    </div>
    <div v-for="signal in signals" :key="signal.label" class="pulse-item">
      <component :is="signal.icon" :size="18" />
      <span>{{ signal.label }}</span>
      <strong>{{ signal.value }}</strong>
      <small>{{ signal.change }}</small>
    </div>
  </div>
</template>
