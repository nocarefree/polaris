<template>
  <component :is="Boolean(indexTableContext.condensed) ? 'li' : 'tr'" :key="id" :class="rowClassName"
    @mouseenter="hovered = true" @mouseleave="hovered = false" @click="handleRowClick" :ref="setTrRef">

    <Checkbox v-if="indexTableContext.selectable" :accessibility-label="accessibilityLabel" />
    <slot></slot>
  </component>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import type { IndexTableRowProps } from './Row'
import styles from '../IndexTable.module.scss'
import { classNames, variationName } from "@ncpl-polaris/utils"
import { SelectionType } from "../types"
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
const selected = computed(() =>
  indexTableContext.value.selected && (
    indexTableContext.value.selected === 'All' || indexTableContext.value.selected.includes(props.id)
  )
);

const rowClassName = computed(() => {
  const { rowType, disabled, tone } = props;
  const { condensed, selectable } = indexTableContext.value;
  return classNames(
    styles.TableRow,
    rowType === 'subheader' && styles['TableRow-subheader'],
    rowType === 'child' && styles['TableRow-child'],
    selectable && condensed && styles.condensedRow,
    selected.value && styles['TableRow-selected'],
    hovered.value && !condensed && styles['TableRow-hovered'],
    disabled && styles['TableRow-disabled'],
    tone && styles[variationName('tone', tone)],
    !selectable &&
    !primaryLinkElement.value &&
    styles['TableRow-unclickable'],
  );
})

const setTrRef = (node: HTMLTableRowElement & HTMLLIElement) => {
  tableRowRef.value = node;

  const el = node?.querySelector('[data-primary-link]');

  if (el) {
    primaryLinkElement.value = el as HTMLAnchorElement;
  }
}

const handleInteraction = (event: MouseEvent | KeyboardEvent) => {
  event.stopPropagation();

  if (('key' in event && event.key !== ' ')) return;
  let selectionType = SelectionType.Single

  if (event.shiftKey) {
    selectionType = SelectionType.Multi;
  } else if (props.selectionRange) {
    selectionType = SelectionType.Range;
  }

  const selection = props.selectionRange ?? props.id;

  indexTableContext.value.selectionChange(selectionType, !selected.value, selection, props.position);
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
  selected: selected.value,
  disabled: props.disabled,
  position: props.position,
  onInteraction: handleInteraction,
}))
indexTableRowContext.provide(indexTableRowProvide)
</script>
