<template>
  <Tooltip preferred-position="above" :hover-delay="400">
    <div v-bind="$attrs">
      <Button size="slim" @click="e => $emit('click')" :disabled="disabled" :accessibility-label="label">
        <template #icon>
          <InlineStack gap="0">
            <Icon v-if="!hideQueryField" :source="SearchMinor" tone="base" />
            <Icon v-if="!hideFilters" :source="FilterMinor" tone="base" />
          </InlineStack>
        </template>
      </Button>
    </div>
    <template #content>
      <Text as="span" variant="bodyMd" alignment="center">
        {{ tooltipContent }}
      </Text>
    </template>
  </Tooltip>
</template>
<script setup lang="ts">
import type { IndexFiltersSearchFilterButtonProps } from './SearchFilterButton'
import Tooltip from "../../Tooltip";
import Button from "../../Button";
import Text from "../../Text";
import Icon from "../../Icon";
import InlineStack from "../../InlineStack";
import { SearchMinor, FilterMinor } from "@ncpl/ncpl-icons";

defineOptions({
  name: 'NpIndexFiltersSearchFilterButton',
  inheritAttrs: false
})
defineProps<IndexFiltersSearchFilterButtonProps>()
defineEmits(['click'])
</script>
