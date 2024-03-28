<template>
  <ConditionalWrapper :condition="hasMultipleSections">
    <template #wrapper="{ children }">
      <Box as="li" role="presentation" border-color="border-secondary"
        :border-block-start-width="!isFirst ? '025' : undefined"
        :padding-block-start="!section.title ? '150' : undefined">
        <component :is="children"></component>
      </Box>
    </template>
    <template v-if="section.title">
      <Box v-if="(typeof section.title == 'string')" padding-block-start="300" padding-block-end="100"
        padding-inline-start="300" padding-inline-end="300">
        <Text as="p" variant="headingSm">
          {{ section.title }}
        </Text>
      </Box>
      <Box padding="200" padding-inline-end="150">
        <component :is="section.title"></component>
      </Box>
    </template>
    <Box as="div" padding="150" :padding-block-start="hasMultipleSections ? '0' : undefined"
      :tabIndex="!hasMultipleSections ? -1 : undefined">
      <BlockStack ap="100" as="ul" :role="sectionRole">
        <Box v-for="( { content, onAction, ...item }, index ) in  section.items " as="li" :key="`${content}-${index}`"
          :role="actionRole === 'menuitem'
            ? 'presentation' : undefined
            ">
          <InlineStack :wrap="false">
            <Item :content="content" role="actionRole" v-bind="item" @action="handleAction(onAction)"></Item>
          </InlineStack>
        </Box>
      </BlockStack>
    </Box>
  </ConditionalWrapper>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import type { ActionListSectionProps } from './Section'
import ConditionalWrapper from "../../ConditionalWrapper"
import Box from "../../Box";
import BlockStack from "../../BlockStack"
import InlineStack from "../../InlineStack"
import Item from "../Item/Item.vue"
import Text from "../../Text/Text.vue";

defineOptions({
  name: 'NpActionSection',
})

const props = defineProps<ActionListSectionProps>()
const emit = defineEmits(['actionAnyItem'])


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

const handleAction = (action?: () => void) => {
  emit('actionAnyItem');
  action && action()
}


</script>
