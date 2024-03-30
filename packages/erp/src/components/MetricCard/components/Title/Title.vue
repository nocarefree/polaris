<template>
  <DefinitionPopover v-if="popover" :title="title" preferred-alignment="left" preferred-position="below"
    :constrain-width="false" :sectioned="false" :title-class-name="styles.Button" inline>
    <template #renderWrapper="{ title, className }">
      <NpText as="h2" tone="truncate" variant="bodySm">
        <span :class="className">{{ title }}</span>
      </NpText>
    </template>
    <Formula :title="title" :formula="popover.formula" :definition="popover.definition"></Formula>
  </DefinitionPopover>
  <div v-else :class="classNames(styles.Title, disabled && styles.Disabled)">
    <NpText variant="bodySm" as="h2" truncate>
      {{ title }}
    </NpText>
  </div>
</template>
<script setup lang="ts">
import { NpText } from "@ncpl/ncpl-polaris";
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
