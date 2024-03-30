<template>
  <NpCard v-if="wrapper == 'card'">
    <div :class="styles.MetricLayout">
      <div :class="styles.Header">
        <slot name="prefix"></slot>
        <div :class="[styles.Title, $slots.primaryAction && styles.HasPrimaryAction]">
          <slot name="title"></slot>
        </div>
      </div>
      <div :class="styles.PrimaryAction">
        <slot name="primaryAction"></slot>
      </div>
      <div :class="styles.Content">
        <slot></slot>
      </div>
    </div>
  </NpCard>
  <div v-else :class="styles.MetricLayout">
    <div :class="styles.Header">
      <slot name="prefix"></slot>
      <div :class="[styles.Title, $slots.primaryAction && styles.HasPrimaryAction]">
        <slot name="title"></slot>
      </div>
    </div>
    <div :class="styles.PrimaryAction">
      <slot name="primaryAction"></slot>
    </div>
    <div :class="styles.Content">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { NpCard } from "@ncpl/ncpl-polaris";
import styles from "./MetricLayout.module.scss";

withDefaults(defineProps<{
  wrapper?: string;
}>(), {
  wrapper: 'card'
})
</script>
