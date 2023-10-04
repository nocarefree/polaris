<script setup lang="ts">
  import Toast from "../Toast/Toast.vue"
  import styles from "../Frame.module.scss";
  import { toastMessagesProps } from "./ToastManager"


  let height = 0;

  defineProps(toastMessagesProps)


    const onToastBeforeEnter = (e: HTMLElement) => {
      e.className = `${styles["Frame-ToastManager__ToastWrapper"]} ${styles["Frame-ToastManager__ToastWrapper--enter"]}`;
      return void 0;
    };

    const onToastEnter = (e: HTMLElement, done: () => {}) => {
      e.className = `${styles["Frame-ToastManager__ToastWrapper"]} ${styles["Frame-ToastManager--toastWrapperEnterDone"]}`;
      e.ontransitionend = done;
      return void 0;
    };

    const onToastLeave = (e: HTMLElement, done: () => {}) => {
      e.className = `${styles["Frame-ToastManager__ToastWrapper"]} ${styles["Frame-ToastManager__ToastWrapper--exit"]}`;
      e.ontransitionend = done;
      return void 0;
    };

    const setNodeStyle = (e: HTMLElement, n: number) => {
        if (n == 0) {
          height = 0;
        }
        let o = e;
        o &&
          ((height += o.clientHeight),
          o.style.setProperty("--pc-toast-manager-translate-y-in", `-${height}px`),
          o.style.setProperty(
            "--pc-toast-manager-translate-y-out",
            150 - height + "px"
          ));
      };
</script>

<template>
  <TransitionGroup
    tag="div"
    :css="false"
    :class="styles['Frame-ToastManager']"
    @before-enter="onToastBeforeEnter"
    @enter="onToastEnter"
    @leave="onToastLeave"
  >
    <div
      v-for="(message, i) in toastMessages"
      :key="message.id"
      :ref="(e) => setNodeStyle(e as HTMLElement, i)"
    >
      <Toast v-bind="message"></Toast>
    </div>
  </TransitionGroup>
</template>
