<template>
  <DefinitionPopover v-if="popover" :title="title">
    <Formula :title="title" :formula="popover.formula" :definition="popover.definition"></Formula>
  </DefinitionPopover>
  <div v-else :class="classNames(styles.Title, disabled && styles.Disabled),">
    <NpText variant="bodySm" as="h2" truncate>
      {{ title }}
    </NpText>
  </div>
</template>
<script setup lang="ts">
import styles from "../../MetricCard.module.scss";
import DefinitionPopover from "../../../DefinitionPopover";
import Formula from "../../../Formula";
import { classNames } from '@ncpl/ncpl-polaris';

defineProps<{
  title: string;
  disabled?: boolean;
  popover?: {
    formula?: string;
    definition?: string;
  }
}>();
</script>
