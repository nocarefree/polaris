<template>
  <component :is="Boolean(indexTableContext.condensed) ? 'li' : 'tr'" :key="id" :class="rowClassName"
    @mouseenter="hovered = true" @mouseleave="hovered = false" @click="handleRowClick" :ref="setTrRef">

    <Checkbox v-if="indexTableContext.selectable" />
    <slot></slot>
  </component>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import type { IndexTableRowProps } from './Row'
import styles from '../IndexTable.module.scss'
import { classNames, variationName } from "@ncpl-polaris/utils"
import { SelectionType } from "../IndexTable"
import Checkbox from "../Checkbox"
import { useIndexTable, indexTableRowContext } from "../../context"

defineOptions({
  name: 'NpIndexTableRow',
})
const emit = defineEmits(['click', 'navigatin', 'selectionChange'])
const props = defineProps<IndexTableRowProps>()
const hovered = ref(false);
const isNavigating = ref(false)
const tableRowRef = ref();
const primaryLinkElement = ref();

const indexTableContext = useIndexTable();

const rowClassName = computed(() => classNames(
  styles.TableRow,
  indexTableContext.value.selectable && indexTableContext.value.condensed && styles.condensedRow,
  props.selected && styles['TableRow-selected'],
  props.subdued && styles['TableRow-subdued'],
  hovered.value && !indexTableContext.value.condensed && styles['TableRow-hovered'],
  props.disabled && styles['TableRow-disabled'],
  props.status && styles[variationName('status', props.status)],
  !indexTableContext.value.selectable &&
  !primaryLinkElement.value &&
  styles['TableRow-unclickable'],
))

const setTrRef = (node: HTMLTableRowElement & HTMLLIElement) => {
  tableRowRef.value = node;

  const el = node?.querySelector('[data-primary-link]');

  if (el) {
    primaryLinkElement.value = el as HTMLAnchorElement;
  }
}

const handleInteraction = (event: MouseEvent | MouseEvent) => {
  event.stopPropagation();

  if (('key' in event && event.key !== ' ')) return;
  const selectionType = event.shiftKey
    ? SelectionType.Multi
    : SelectionType.Single;

  emit('selectionChange', selectionType, !props.selected, props.id, props.position);
}

const handleRowClick = (event: MouseEvent) => {
  if (!tableRowRef.value || isNavigating.value) {
    return;
  }
  event.stopPropagation();
  event.preventDefault();

  emit('click')

  if (primaryLinkElement.value && !indexTableContext.value.selectMode) {
    isNavigating.value = true;
    const { ctrlKey, metaKey } = event;

    emit('navigatin', props.id)

    if (
      (ctrlKey || metaKey) &&
      primaryLinkElement.value instanceof HTMLAnchorElement
    ) {
      isNavigating.value = false;
      window.open(primaryLinkElement.value.href, '_blank');
      return;
    }

    primaryLinkElement.value.dispatchEvent(
      new MouseEvent(event.type, event),
    );
  } else {
    isNavigating.value = false;
    handleInteraction(event);
  }
};


const indexTableRowProvide = computed(() => ({
  itemId: props.id,
  selected: props.selected,
  disabled: props.disabled,
  position: props.position,
}))
indexTableRowContext.provide(indexTableRowProvide)
</script>
