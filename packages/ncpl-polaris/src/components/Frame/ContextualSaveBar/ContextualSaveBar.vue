<template>
  <div :class="styles.ContextualSaveBar">
    <div v-if="contextControl" :class="styles.ContextControl">
      <component :is="contextControl"></component>
    </div>
    <div v-if="!(contextControl || alignContentFlush)" :class="styles.LogoContainer" :style="{ width: logoWidth }">
      <NpImage v-if="logo" :style="{ width: logoWidth }" :source="logo.contextualSaveBarSource || ''" alt="">
      </NpImage>
    </div>
    <div :class="contentsClassName">
      <NpText as="h2" variant="headingMd" color="text-inverse" :truncate="true">{{ message }}</NpText>
      <div :class="styles.ActionContainer">
        <NpLegacyStack spacing="tight" :wrap="false">
          <component v-if="secondaryMenu" :is="secondaryMenu"></component>
          <NpButton v-if="discardAction" v-bind="discardAction" @click="discardAction?.onAction">{{ discardAction.content
            || "Discard" }}</NpButton>
          <NpButton v-if="saveAction" v-bind="saveAction" primary>{{
            saveAction.content || "Save"
          }}</NpButton>
        </NpLegacyStack>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import type { ContextualSaveBarProps } from "./ContextualSaveBar";
import styles from "./ContextualSaveBar.module.scss";
import { NpImage, NpText, NpLegacyStack, NpButton } from "@ncpl-polaris/components";
import { classNames } from "@ncpl-polaris/utils";
import { useFrame } from "../../context"


const props = defineProps<ContextualSaveBarProps>();

const { logo } = useFrame();


const logoWidth = computed(() => {
  return (logo.value?.width || 104) + "px";
});

const contentsClassName = computed(() => classNames(
  styles.Contents,
  props.fullWidth && styles.fullWidth,
));
</script>
