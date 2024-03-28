<template>
  <NpPopover active="active" :preferred-alignment="mdUp ? 'right' : 'left'"
    :preferred-position="mdUp ? 'below' : 'above'" :prefer-input-activator="mdUp" :full-width="false"
    autofocus-target="none">
    <template #activator>
      <div :class="classNames(styles.infoPopoverActivator, mdUp && styles.leftAlign)"></div>
    </template>
    <Formula :definition="content?.definition || ''" :formula="content?.formula || ''" />
  </NpPopover>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import Formula from "../../../Formula";
import { NpPopover, classNames } from "@ncpl/ncpl-polaris";
import { useBreakpoints } from '@ncpl/ncpl-polaris';
import styles from "../../HomePage.module.scss";

defineProps<{
  active?: boolean;
  content?: {
    definition: string;
    formula: string;
  }
}>();

const { mdUp } = useBreakpoints();
</script>
