<template>
  <NpCard v-if="wrapper == 'card'">
    <div :class="classNames(styles.MetricLayout, type && styles.Compact)">
      <div :class="styles.Header">
        <slot name="prefix"></slot>
        <div :class="classNames(styles.Title, $slots.primaryAction && styles.HasPrimaryAction)">
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
  <div v-else :class="classNames(styles.MetricLayout, type && styles.Compact)">
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
import { NpCard, classNames } from "@ncpl/ncpl-polaris";
import styles from "./MetricLayout.module.scss";

withDefaults(defineProps<{
  type?: 'full' | 'compact';
  wrapper?: string;
}>(), {
  type: 'full',
  wrapper: 'card'
})
</script>
