<template>
  <div :class="classNames(styles.Toast, error && styles.error)">
    <div v-if="error" :class="styles.LeadingIcon">
      <Icon :source="AlertMinor" tone="base" />
    </div>
    <InlineStack block-align="center">
      <Text as="span" font-weight="medium">{{ content }}</Text>
    </InlineStack>
    <div v-if="action">
      <Button plain monochrome size="slim" @click="action?.onAction">
        {{ action.content }}</Button
      >
    </div>
    <button
      type="button"
      :class="styles.toastProps"
      @click="(e) => $emit('dismiss',e)"
    >
      <Icon :source="CancelSmallMinor" />
    </button>
  </div>
</template>
<script setup lang="ts">
  import { onMounted } from "vue";
  import InlineStack from "../../InlineStack"
  import Icon from "../../Icon"
  import Button from "../../Button"
  import Text from "../../Text"
  import { toastProps, DEFAULT_TOAST_DURATION, DEFAULT_TOAST_DURATION_WITH_ACTION } from "./Toast";
  import { AlertMinor, CancelSmallMinor } from "@ncpl/ncpl-icons";
  import { classNames } from "@ncpl-polaris/utils"
  import styles from "./Toast.module.scss"

  const props = defineProps(toastProps);

  const emit = defineEmits(["dismiss"]);
  let timer:any;

  onMounted(() => {
    if(timer){
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
      console.log(
        'Toast with action should persist for at least 10,000 milliseconds to give the merchant enough time to act on it.',
      );
    }

    timer = setTimeout(()=>{
      emit('dismiss')
    }, timeoutDuration);
  });
</script>
