<template>
  <div :class="classNames(
    styles.ProgressBar,
    size && styles[variationName('size', size)],
    tone && styles[variationName('tone', tone)],
  )">
    <progress :aria-labelledby="ariaLabelledBy" :class="styles.Progress" :value="parsedProgress" max="100" />
    <CSSTransition in appear :timeout="parseInt(progressBarDuration, 10)" :node-ref="indicatorRef" :classNames="{
      appearActive: styles.IndicatorAppearActive,
      appearDone: styles.IndicatorAppearDone,
    }">
      <div ref="indicatorRef" :class="styles.Indicator"
        :style="{ '--pc-progress-bar-duration': progressBarDuration, '--pc-progress-bar-percent': parsedProgress / 100 }">
        <span :class="styles.Label">{{ parsedProgress }}%</span>
      </div>
    </CSSTransition>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import type { ProgressBarProps } from './ProgressBar';
import styles from './ProgressBar.module.scss';
import CSSTransition from "../CSSTransition";
import { classNames, variationName } from "../../utils";
import { useTheme, useI18n } from "../context";

defineOptions({
  name: 'NpProgressBar',
})
const props = withDefaults(defineProps<ProgressBarProps>(), {
  progress: 0,
  size: 'medium',
  tone: 'highlight',
  animated: true,
})

const indicatorRef = ref();
const i18n = useI18n();
const theme = useTheme();

const warningMessage = computed(() => i18n.value.translate(
  props.progress < 0
    ? 'Polaris.ProgressBar.negativeWarningMessage'
    : 'Polaris.ProgressBar.exceedWarningMessage',
  { progress: props.progress },
));

const progressBarDuration = computed(() => props.animated
  ? theme.value.motion['motion-duration-500']
  : theme.value.motion['motion-duration-0']);

const parsedProgress = computed(() => parseProgress(props.progress, warningMessage.value));

function parseProgress(progress: number, warningMessage: string) {
  let progressWidth;
  if (progress < 0) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn(warningMessage);
    }
    progressWidth = 0;
  } else if (progress > 100) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn(warningMessage);
    }
    progressWidth = 100;
  } else {
    progressWidth = progress;
  }
  return progressWidth;
}

</script>
