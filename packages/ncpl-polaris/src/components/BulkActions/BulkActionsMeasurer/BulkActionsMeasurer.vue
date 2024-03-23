<template>
  <div :class="styles.BulkActionsMeasurerLayout" ref="containerNode">
    <template v-for="action in promotedActions">
      <BulkActionButton v-if="instanceOfMenuGroupDescriptor(action)" disclosure show-content-in-button
        :content="action.title" :size="buttonSize" />
      <BulkActionButton v-else :disabled="disabled" v-bind="action" :size="buttonSize" />
    </template>
    <BulkActionButton disclosure :content="activatorLabel" />
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import type { BulkActionsMeasurerProps } from './BulkActionsMeasurer'
import styles from '../BulkActions.module.scss';
import { instanceOfMenuGroupDescriptor } from "../utils";
import BulkActionButton from "../BulkActionButton";
import { useEventListener } from "@vueuse/core";
import { useI18n } from "../../context";

defineOptions({
  name: 'NpBulkActionsMeasurer',
})
const props = defineProps<BulkActionsMeasurerProps>()
const emit = defineEmits(["measurement"]);
const ACTION_SPACING = 4;


const i18n = useI18n();
const containerNode = ref<HTMLDivElement>();

const activatorLabel = i18n.value.translate(
  'Polaris.ResourceList.BulkActions.moreActionsActivatorLabel',
);

const handleMeasurement = () => {
  if (!containerNode.value) {
    return;
  }

  const containerWidth = containerNode.value.offsetWidth;
  const hiddenActionNodes = containerNode.value.children;
  const hiddenActionNodesArray = Array.from(hiddenActionNodes);
  const hiddenActionsWidths = hiddenActionNodesArray.map((node) => {
    const buttonWidth = Math.ceil(node.getBoundingClientRect().width);
    return buttonWidth + ACTION_SPACING;
  });
  const disclosureWidth = hiddenActionsWidths.pop() || 0;

  emit('measurement', {
    containerWidth,
    disclosureWidth,
    hiddenActionsWidths,
  });
};

watch(() => [props.promotedActions, containerNode.value], () => handleMeasurement(), { immediate: true, flush: 'post' });

useEventListener('resize', handleMeasurement);
</script>
