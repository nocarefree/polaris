<template>
  <svg :view-box="`0 0 ${width} ${height}`" :height="height" :width="width" :role="accessibilityLabel ? 'img' : void 0"
    :class="$style.SVG" :tabindex="tabIndex">
    <title v-if="accessibilityLabel">{{ accessibilityLabel }}</title>
    <slot></slot>
  </svg>
</template>
<script setup lang="ts">
withDefaults(defineProps<{
  accessibilityLabel?: string;
  height?: number;
  width?: number;
  tabIndex?: number;
}>(), {
  tabIndex: 0
});
</script>

<style module>
.SVG {
  display: block;
  font-feature-settings: normal;
  outline: none
}

.SVG:focus,
.SVG:focus-visible {
  outline: none !important
}
</style>