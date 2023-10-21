<template>
  <Tooltip preferred-position="above" :hover-delay="400">
    <div :style="style">
      <Button size="slim" @click="e => $emit('click')" :disabled="disabled" :icon="iconSource"
        :accessibility-label="label" />
    </div>
    <template #content>
      <Text as="span" variant="bodyMd" alignment="center">
        {{ tooltipContent }}
      </Text>
    </template>
  </Tooltip>
</template>
<script setup lang="ts">
import { defineComponent, h } from "vue"
import type { IndexFiltersSearchFilterButtonProps } from './SearchFilterButton'
import Tooltip from "../../Tooltip";
import Button from "../../Button";
import Text from "../../Text";
import Icon from "../../Icon";
import InlineStack from "../../InlineStack";
import { SearchMinor, FilterMinor } from "@ncpl/ncpl-icons";

defineOptions({
  name: 'NpIndexFiltersSearchFilterButton',
})
const props = defineProps<IndexFiltersSearchFilterButtonProps>()

defineEmits(['click'])


const iconSource = defineComponent({
  setup() {
    return () => h(InlineStack, { gap: "0" }, {
      default: () => {
        let children: any = [];
        if (props.hideQueryField) {
          children.push(h(Icon, { source: SearchMinor, tone: 'base' }));
        }

        if (props.hideFilters) {
          children.push(h(Icon, { source: FilterMinor, tone: 'base' }));
        }

        return children;
      }
    });
  }
});
</script>
