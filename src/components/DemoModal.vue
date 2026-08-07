<script setup lang="ts">
import { MessageSquareMore, Phone, X } from "lucide-vue-next";
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { siteConfig } from "../config";

const props = defineProps<{ open: boolean }>();
const emit = defineEmits<{ "update:open": [value: boolean] }>();
const closeButton = ref<HTMLButtonElement | null>(null);
const dialogRef = ref<HTMLElement | null>(null);
let previousFocus: HTMLElement | null = null;

function close() {
  emit("update:open", false);
}

function handleKeydown(event: KeyboardEvent) {
  if (!props.open) return;
  if (event.key === "Escape") {
    close();
    return;
  }
  if (event.key !== "Tab" || !dialogRef.value) return;
  const focusable = Array.from(
    dialogRef.value.querySelectorAll<HTMLElement>('button, a[href], [tabindex]:not([tabindex="-1"])'),
  ).filter((element) => !element.hasAttribute("disabled"));
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

watch(
  () => props.open,
  async (open) => {
    if (open) {
      previousFocus = document.activeElement as HTMLElement;
      document.body.classList.add("modal-open");
      await nextTick();
      closeButton.value?.focus();
    } else {
      document.body.classList.remove("modal-open");
      if (previousFocus?.isConnected) previousFocus.focus();
    }
  },
);

onMounted(() => window.addEventListener("keydown", handleKeydown));
onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeydown);
  document.body.classList.remove("modal-open");
});
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="modal-backdrop" @mousedown.self="close">
      <section ref="dialogRef" class="demo-modal" role="dialog" aria-modal="true" aria-labelledby="demo-title">
        <button ref="closeButton" class="icon-button modal-close" aria-label="关闭预约演示" @click="close">
          <X :size="20" />
        </button>
        <div class="modal-copy">
          <span class="eyebrow">预约产品演示</span>
          <h2 id="demo-title">看看它如何适配你的门店</h2>
          <p>从门店数量、服务流程和当前最耗时的环节开始沟通。</p>
          <a class="button button--primary modal-phone" :href="`tel:${siteConfig.contactPhone}`" v-if="siteConfig.contactPhone">
            <Phone :size="17" /> 电话咨询 {{ siteConfig.contactPhone }}
          </a>
        </div>
        <div v-if="siteConfig.wecomAvailable && siteConfig.wecomQrUrl" class="qr-panel">
          <img :src="siteConfig.wecomQrUrl" :alt="`添加${siteConfig.brand}产品顾问企业微信`" />
          <strong>企业微信咨询</strong>
          <span>扫码添加产品顾问</span>
        </div>
        <div v-else class="wecom-unavailable" aria-label="企业微信咨询即将开放">
          <MessageSquareMore :size="46" />
          <strong>企业微信咨询</strong>
          <span>通道即将开放</span>
          <small>当前请使用电话联系产品顾问</small>
        </div>
      </section>
    </div>
  </Teleport>
</template>
