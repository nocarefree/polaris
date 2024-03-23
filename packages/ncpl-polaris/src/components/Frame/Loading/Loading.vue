<template>
  <div :class="styles.Loading" :aria-valuenow="step" :aria-valuemin="0" :aria-valuemax="100" role="progressbar"
    :aria-label="i18n.translate('Polaris.Loading.label')">
    <div :class="styles.Level" :style="{ transform: `scaleX(${Math.floor(step) / 100})` }" @transitionend="transitionend">
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import styles from "./Loading.module.scss"
import { useI18n } from "../../context"

const step = ref(0);
const animating = ref(false);
const i18n = useI18n();


const running = () => {
  if (!(step.value >= 99 || animating.value)) {
    requestAnimationFrame(() => {
      step.value += Math.max((99 - step.value) / 10, 1);
      animating.value = true;
    });
  }
};

const transitionend = () => {
  animating.value = false;
  running();
}

onMounted(() => {
  setTimeout(running)
});
</script>