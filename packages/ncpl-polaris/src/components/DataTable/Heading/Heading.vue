<template>
  <template v-if="inFixedNthColumn && inStickyHeader">
    <Cell :key="id" v-bind="cellProps"
      :set-ref="(ref: any) => { setCellRef({ ref, index: headingIndex, inStickyHeader }); }"
      :in-fixed-nth-column="false" />
    <Cell :key="`${id}-sticky`" v-bind="cellProps"
      :set-ref="(ref: any) => { setCellRef({ ref, index: headingIndex, inStickyHeader }); }"
      :in-fixed-nth-column="Boolean(fixedFirstColumns)" :last-fixed-first-column="headingIndex === fixedFirstColumns - 1"
      :style="{ left: left ? `${left}px` : undefined }" />
  </template>
  <Cell v-else :key="id" v-bind="cellProps"
    :set-ref="(ref: any) => { setCellRef({ ref, index: headingIndex, inStickyHeader }); }"
    :last-fixed-first-column="headingIndex === fixedFirstColumns - 1" :in-fixed-nth-column="inFixedNthColumn" />
</template>
<script setup lang="ts">
import { type Component, computed } from "vue";
const props = defineProps<{
  heading: string | Component;
  headingIndex: number;
  inFixedNthColumn: boolean;
  inStickyHeader: boolean;
  cellProps: any;
  setCellRef: (e: any) => void;
  fixedFirstColumns: number;
  left?: number;
}>();

const id = computed(() => {
  const headingCellId = `heading-cell-${props.headingIndex}`;
  const stickyHeaderId = `stickyheader-${props.headingIndex}`;
  return props.inStickyHeader ? stickyHeaderId : headingCellId;
})

</script>