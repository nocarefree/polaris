<template>
  <WrapComponent>
    <Box v-if="section.title" v-bind="titleAttributes">
      <Text as="p" :variant="polarisSummerEditions2023 ? 'headingSm' : 'headingXs'">
        {{ section.title }}
      </Text>
    </Box>
    <Box v-bind="contentBoxAttributes">
      <WrapContentComponent>
        <Box v-for="({ content, onAction, ...item }, index) in section.items" as="li" :key="`${content}-${index}`" :role="actionRole === 'menuitem'
          ? 'presentation' : undefined">
          <WrapActionComponent>
            <Item :content="content" role="actionRole" v-bind="item" @action="handleAction(onAction)"></Item>
          </WrapActionComponent>
        </Box>
      </WrapContentComponent>
    </Box>
  </WrapComponent>
</template>
<script setup lang="ts">
import { computed, defineComponent, h } from 'vue'
import type { ActionListSectionProps } from './Section'
import { useFeatures } from "../../context";
import Box from "@ncpl-polaris/components/Box";
import VerticalStack from "@ncpl-polaris/components/VerticalStack/VerticalStack.vue"
import HorizontalStack from "@ncpl-polaris/components/HorizontalStack/HorizontalStack.vue"
import Item from "../Item/Item.vue"
import type { BoxProps } from "@ncpl-polaris/components/Box";
import Text from "@ncpl-polaris/components/Text/Text.vue";

defineOptions({
  name: 'NpSection',
})

const props = defineProps<ActionListSectionProps>()
const emit = defineEmits(['actionAnyItem'])
const { polarisSummerEditions2023 } = useFeatures();


const sectionRole = computed(() => {
  switch (props.actionRole) {
    case 'option':
      return 'presentation';
    case 'menuitem':
      return !props.hasMultipleSections ? 'menu' : 'presentation';
    default:
      return undefined;
  }
})

const contentBoxAttributes = computed(() => {
  return {
    as: polarisSummerEditions2023 ? 'div' : 'ul',
    padding: polarisSummerEditions2023 ? '1_5-experimental' : '2',
    ...(props.hasMultipleSections && { paddingBlockStart: '0' }),
    ...(sectionRole.value && !polarisSummerEditions2023 && { role: sectionRole.value }),
    tabIndex: !props.hasMultipleSections ? -1 : undefined,
  } as BoxProps
})

const boxAttributes = computed(() => {
  return {
    as: "li",
    role: "presentation",
    borderColor: "border-subdued",
    borderBlockStartWidth: props.isFirst ? undefined : 1,
    paddingBlockStart: props.section.title ? undefined : (polarisSummerEditions2023 ? '1_5-experimental' : '2'),
  } as BoxProps;
})

const titleAttributes = computed(() => {
  return {
    ...(polarisSummerEditions2023
      ? {
        paddingBlockStart: '3',
        paddingBlockEnd: '1',
        paddingInlineStart: '3',
        paddingInlineEnd: '3',
      }
      : {
        paddingBlockStart: '4',
        paddingInlineStart: '4',
        paddingBlockEnd: '2',
        paddingInlineEnd: '4',
      })
  } as BoxProps;
})

const WrapComponent = defineComponent({
  setup(_props, { slots }) {
    return () => props.hasMultipleSections ? h(Box, { ...boxAttributes.value }, slots) : slots.default?.();
  }
})

const WrapContentComponent = defineComponent({
  setup(_props, { slots }) {
    return () => polarisSummerEditions2023 ? h(VerticalStack, { gap: "1", as: 'ul', role: sectionRole.value }, slots) : slots.default?.();
  }
})

const WrapActionComponent = defineComponent({
  setup(_props, { slots }) {
    return () => polarisSummerEditions2023 ? h(HorizontalStack, { wrap: false }, slots) : slots.default?.();
  }
})

const handleAction = (action?: () => void) => {
  emit('actionAnyItem');
  return action
}


</script>
