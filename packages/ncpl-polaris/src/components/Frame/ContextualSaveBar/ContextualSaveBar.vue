<template>
  <div :class="styles.ContextualSaveBar">
    <div v-if="contextControl" :class="styles.ContextControl">
      <component :is="contextControl"></component>
    </div>
    <div v-if="!(contextControl || alignContentFlush)" :class="styles.LogoContainer" :style="{ width: logoWidth }">
      <Image v-if="logo" :style="{ width: logoWidth }" :source="logo.contextualSaveBarSource || ''" alt="" />
    </div>
    <div :class="contentsClassName">
      <div :class="styles.MessageContainer">
        <Icon :source="AlertTriangleIcon" />
        <Text v-if="message" as="h2" variant="headingMd" tone="text-inverse" truncate>{{ message }}</Text>
      </div>

      <div :class="styles.ActionContainer">
        <LegacyStack spacing="tight" :wrap="false">
          <component v-if="secondaryMenu" :is="secondaryMenu"></component>
          <Button v-if="discardAction" variant="tertiary" size="large" :url="discardAction.url"
            @click="() => discardAction!.discardConfirmationModal ? toggleDiscardConfirmationModal() : discardAction!.onAction?.()"
            :loading="discardAction.loading" :disabled="discardAction.disabled"
            :accessibility-label="discardAction.content">{{ discardAction.content
              || "Discard" }}</Button>
          <Button v-if="saveAction" v-bind="saveAction" variant="primary" tone="success" size="large">{{
            saveAction && saveAction.content ? saveAction.content : i18n.translate('Polaris.ContextualSaveBar.save')
          }}</Button>
        </LegacyStack>
      </div>
    </div>
  </div>
  <DiscardConfirmationModal v-if="discardAction && discardAction.onAction && discardAction.discardConfirmationModal"
    :open="discardConfirmationModalVisible" @cancel="toggleDiscardConfirmationModal"
    @discard="() => { discardAction!.onAction?.(), discardConfirmationModalVisible = false }" />
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import type { ContextualSaveBarProps } from "./ContextualSaveBar";
import styles from "./ContextualSaveBar.module.scss";
import LegacyStack from "../../LegacyStack"
import Text from "../../Text"
import Image from "../../Image"
import Button from "../../Button"
import Icon from "../../Icon"
import DiscardConfirmationModal from "./DiscardConfirmationModal/DiscardConfirmationModal.vue"
import { classNames } from "../../../utils";
import { useFrame, useI18n } from "../../context"
import { AlertTriangleIcon } from "@ncpl/ncpl-icons"



const props = defineProps<ContextualSaveBarProps>();

const { logo } = useFrame();
const i18n = useI18n();

const discardConfirmationModalVisible = ref(false);


const logoWidth = computed(() => {
  return (logo.value?.width || 104) + "px";
});

const contentsClassName = computed(() => classNames(
  styles.Contents,
  props.fullWidth && styles.fullWidth,
));

const toggleDiscardConfirmationModal = () => {
  discardConfirmationModalVisible.value = discardConfirmationModalVisible.value
}


</script>
