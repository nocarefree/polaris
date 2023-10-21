<template>
  <div :class="styles.ContextualSaveBar">
    <div v-if="contextControl" :class="styles.ContextControl">
      <component :is="contextControl"></component>
    </div>
    <div v-if="!(contextControl || alignContentFlush)" :class="styles.LogoContainer" :style="{ width: logoWidth }">
      <Image v-if="logo" :style="{ width: logoWidth }" :source="logo.contextualSaveBarSource || ''" alt="" />
    </div>
    <div :class="contentsClassName">
      <Text as="h2" variant="headingMd" tone="text-inverse" truncate>{{ message }}</Text>
      <div :class="styles.ActionContainer">
        <LegacyStack spacing="tight" :wrap="false">
          <component v-if="secondaryMenu" :is="secondaryMenu"></component>
          <Button v-if="discardAction" v-bind="discardAction" @click="discardAction?.onAction">{{ discardAction.content
            || "Discard" }}</Button>
          <Button v-if="saveAction" v-bind="saveAction" variant="primary" tone="success" size="large">{{
            saveAction && saveAction.content ? saveAction.content : i18n.translate('Polaris.ContextualSaveBar.save')
          }}</Button>
        </LegacyStack>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import type { ContextualSaveBarProps } from "./ContextualSaveBar";
import styles from "./ContextualSaveBar.module.scss";
import LegacyStack from "../../LegacyStack"
import Text from "../../Text"
import Image from "../../Image"
import Button from "../../Button"
import { classNames } from "@ncpl-polaris/utils";
import { useFrame, useI18n } from "../../context"


const props = defineProps<ContextualSaveBarProps>();

const { logo } = useFrame();
const i18n = useI18n();


const logoWidth = computed(() => {
  return (logo.value?.width || 104) + "px";
});

const contentsClassName = computed(() => classNames(
  styles.Contents,
  props.fullWidth && styles.fullWidth,
));
</script>
