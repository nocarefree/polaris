<template>
  <DefinitionPopover v-if="popover" :title="title" preferred-alignment="left" preferred-position="below"
    :constrain-width="false" :sectioned="false" :title-class-name="$style.Button" inline>
    <template #renderWrapper="{ title, className }">
      <div :class="$style.Title">
        <NpText as="h2" :truncate="true" variant="bodySm">
          <span :class="className">{{ title }}</span>
        </NpText>
      </div>
    </template>
    <Formula :title="title" :formula="popover.formula" :definition="popover.definition"></Formula>
  </DefinitionPopover>
  <div v-else :class="classNames($style.Title, disabled && $style.Disabled)">
    <NpText variant="bodySm" as="h2" truncate>
      {{ title }}
    </NpText>
  </div>
</template>
<script setup lang="ts">
import { NpText } from "@ncpl/ncpl-polaris";
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
<style module>
.Title.Disabled {
  color: var(--p-color-text-disabled);
}

.Title h2 {
  line-height: 1.5;
}

.Button {
  max-width: 100%;
  cursor: pointer;
}

.Button:hover,
.Button:active {
  background-color: transparent;
}
</style>
