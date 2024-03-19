<template>
  <Portal id-prefix="toast">
    <EventListener event="resize" :handler="updateToasts" />
    <TransitionGroup tag="div" :class="styles.ToastManager" aria-live="assertive" @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave" :css="false" @before-enter="onToastBeforeEnter" @enter="onToastEnter"
      @leave="onToastLeave">
      <div v-for="(message, i) in toastMessages" :key="message.id" :ref="(e) => toastNodes[i] = (e as HTMLElement)"
        @mouseenter="() => (toastMessages.length - i - 1) > 0 ? handleMouseEnter : handleMouseEnterFirstToast">
        <div :ref="(node) => i === 0 ? firstToast = (node as HTMLElement) : null">
          <Toast v-bind="message"></Toast>
        </div>
      </div>
    </TransitionGroup>
  </Portal>
</template>


<script setup lang="ts">
import { ref, watch } from "vue";
import Toast from "../Toast/Toast.vue"
import styles from "./ToastManager.module.scss";
import type { ToastMessagesProps } from "./types";
import { classNames } from "@ncpl-polaris/utils";
import Portal from "../../Portal";
import EventListener from "../../EventListener";


const props = defineProps<ToastMessagesProps>();

const ADDITIONAL_TOAST_BASE_MOVEMENT = 10;
const TOAST_TRANSITION_DELAY = 30;

function generateAdditionalVerticalMovement(index: number) {
  const getAmountToRemove = (idx: number): number => ((idx - 1) * idx) / 2;
  return index * ADDITIONAL_TOAST_BASE_MOVEMENT - getAmountToRemove(index);
}

const firstToast = ref<HTMLElement | null>(null);
const toastNodes = ref<HTMLElement[]>([]);
const shouldExpand = ref(false);
const fullyExpandedTimeout = ref<ReturnType<typeof setTimeout> | null>(null);
const isFullyExpanded = ref(false);



const onToastBeforeEnter = (e: HTMLElement) => {
  e.className = classNames(styles.ToastWrapper, styles['ToastWrapper-enter']);
  return void 0;
};

const onToastEnter = (e: HTMLElement, done: () => {}) => {
  e.className = classNames(styles.ToastWrapper, styles['ToastWrapper-enter-done']);
  e.ontransitionend = done;
  return void 0;
};

const onToastLeave = (e: HTMLElement, done: () => {}) => {
  e.className = classNames(styles.ToastWrapper, styles['ToastWrapper-exit']);
  e.ontransitionend = done;
  return void 0;
};


const updateToasts = () => {
  const toastMessages = props.toastMessages;
  const zeroIndexTotalMessages = toastMessages.length - 1;
  toastMessages.forEach((_, index) => {
    const reversedOrder = zeroIndexTotalMessages - index;
    const currentToast = toastNodes.value[index];
    if (!currentToast) return;

    const toastHeight: number = currentToast.clientHeight;
    const scale = shouldExpand.value ? 1 : 0.9 ** reversedOrder;

    const additionalVerticalMovement: number =
      generateAdditionalVerticalMovement(reversedOrder);
    const targetInPos = shouldExpand.value
      ? toastHeight + (toastHeight - 8) * reversedOrder
      : toastHeight + additionalVerticalMovement;

    currentToast.style.setProperty(
      '--pc-toast-manager-translate-y-in',
      `-${targetInPos}px`,
    );
    currentToast.style.setProperty(
      '--pc-toast-manager-scale-in',
      `${scale}`,
    );
    currentToast.style.setProperty(
      '--pc-toast-manager-blur-in',
      shouldExpand.value ? '0' : `${reversedOrder * 0.5}px`,
    );
    currentToast.style.setProperty(
      '--pc-toast-manager-transition-delay-in',
      `${shouldExpand.value ? reversedOrder * TOAST_TRANSITION_DELAY : 0}ms`,
    );
    currentToast.style.setProperty(
      '--pc-toast-manager-scale-out',
      `${reversedOrder === 0 ? 0.85 : scale ** 2}`,
    );
    currentToast.style.setProperty(
      '--pc-toast-manager-translate-y-out',
      `${-targetInPos}px`,
    );
  });
};

const onMouseEnter = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  const isInFirstToast = firstToast.value?.contains(target);
  shouldExpand.value = !isInFirstToast;
}

const onMouseLeave = (event: MouseEvent) => {
  shouldExpand.value = false;
}

function handleMouseEnter() {
  shouldExpand.value = true;
}
function handleMouseEnterFirstToast() {
  if (isFullyExpanded.value) {
    shouldExpand.value = false;
  }
}


watch(() => [props.toastMessages, shouldExpand.value], () => {
  updateToasts();
  if (props.toastMessages.length === 0) {
    shouldExpand.value = false;
  }
  if (shouldExpand.value) {
    fullyExpandedTimeout.value = setTimeout(() => {
      isFullyExpanded.value = true;
    }, props.toastMessages.length * TOAST_TRANSITION_DELAY + 400);
  } else if (fullyExpandedTimeout.value) {
    clearTimeout(fullyExpandedTimeout.value);
    isFullyExpanded.value = false;
  }
}, { flush: 'post', immediate: true });

</script>