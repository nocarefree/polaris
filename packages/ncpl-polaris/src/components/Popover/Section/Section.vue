<template>
  <div :class="styles.Section">
    <Box :padding="polarisSummerEditions2023 ? undefined : '4'" :padding-inline-start="polarisSummerEditions2023 ? '3' :
      undefined" :padding-inline-end="polarisSummerEditions2023 ? '3' : undefined"
      :padding-block-start="polarisSummerEditions2023 ? '2' : undefined" :padding-block-end="polarisSummerEditions2023
        ? '1_5-experimental' : undefined">
      <slot></slot>
    </Box>
  </div>
</template>

<script setup lang="ts">

import styles from '../Popover.module.scss';
import { useFeatures } from '../../context';
import Box from "@ncpl-polaris/components/Box/Box.vue";

const { polarisSummerEditions2023 } = useFeatures();


</script>