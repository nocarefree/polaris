<template>
  <button v-if="!action && onClick" aria-live="assertive" :class="classNames(className, styles.WithActionOnComponent)"
    type="button" @click="() => onClick!()">
    <KeypressListener :key-code="Key.Escape" :handler="(e) => onDismiss()" />
    <div v-if="error" :class="styles.LeadingIcon">
      <Icon :source="AlertMinor" tone="inherit" />
    </div>
    <div v-else-if="icon" :class="styles.LeadingIcon">
      <Icon :source="icon" tone="inherit" />
    </div>
    <InlineStack gap="400" block-align="center">
      <Text as="span" font-weight="medium" :tone="tone === 'magic' ? tone : undefined">
        {{ content }}
      </Text>
    </InlineStack>
  </button>
  <div v-else :class="className" aria-live="assertive">
    <KeypressListener :key-code="Key.Escape" :handler="(e) => onDismiss()" />
    <div v-if="error" :class="styles.LeadingIcon">
      <Icon :source="AlertMinor" tone="inherit" />
    </div>
    <div v-else-if="icon" :class="styles.LeadingIcon">
      <Icon :source="icon" tone="inherit" />
    </div>
    <InlineStack gap="400" block-align="center">
      <Text as="span" font-weight="medium" :tone="tone === 'magic' ? tone : undefined">
        {{ content }}
      </Text>
    </InlineStack>
    <div v-if="action" :class="styles.Action">
      <Button variant="monochromePlain" remove-underline size="slim" @click="() => action?.onAction()">
        {{ action.content }}</Button>
    </div>
    <button type="button" :class="styles.CloseButton" @click="(e) => onDismiss()">
      <Icon :source="CancelSmallMinor" tone="inherit" />
    </button>
  </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, computed } from "vue";
import InlineStack from "../../InlineStack"
import Icon from "../../Icon"
import Button from "../../Button"
import Text from "../../Text"
import { type ToastProps, DEFAULT_TOAST_DURATION, DEFAULT_TOAST_DURATION_WITH_ACTION } from "./Toast";
import { AlertMinor, CancelSmallMinor } from "@ncpl/ncpl-icons";
import { classNames, variationName } from "@ncpl-polaris/utils";
import styles from "./Toast.module.scss";
import KeypressListener from "../../KeypressListener";
import { Key } from '../../types';

const props = defineProps<ToastProps>();

const className = computed(() => classNames(
  styles.Toast,
  props.error && styles.error,
  props.tone && styles[variationName('tone', props.tone)],
));

let timer: any;

onMounted(() => {
  if (timer) {
    clearTimeout(timer);
  }

  let timeoutDuration = props.duration || DEFAULT_TOAST_DURATION;

  if (props.action && !props.duration) {
    timeoutDuration = DEFAULT_TOAST_DURATION_WITH_ACTION;
  } else if (
    props.action &&
    props.duration &&
    props.duration < DEFAULT_TOAST_DURATION_WITH_ACTION
  ) {
    // eslint-disable-next-line no-console
    console.warn(
      'Toast with action should persist for at least 10,000 milliseconds to give the merchant enough time to act on it.',
    );
  }

  timer = setTimeout(() => {
    props.onDismiss()
  }, timeoutDuration);
});

onUnmounted(() => {
  clearTimeout(timer);
})
</script>
