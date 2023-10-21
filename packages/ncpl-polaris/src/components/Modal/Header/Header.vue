<template>
  <Box v-if="titleHidden || !$slots.default" position="absolute" :inset-inline-end="headerPaddingInline"
    :inset-block-start="headerPaddingBlock" z-index="1">
    <CloseButton @click="onClose" />
  </Box>
  <Box padding-block-start="400" padding-block-end="400" :padding-inline-start="headerPaddingInline"
    :padding-inline-end="headerPaddingInline" border-block-end-width="025" border-color="border"
    background="bg-surface-tertiary">
    <InlineGrid :columns="{ xs: '1fr auto' }" gap="400">
      <InlineStack gap="400" block-align="center">
        <Text :id="id" as="h2" variant="headingMd" break-word>
          <slot></slot>
        </Text>
      </InlineStack>
      <CloseButton :pressed="closing" @click="onClose" />
    </InlineGrid>
  </Box>
</template>
<script setup lang="ts">
import type { HeaderProps } from './Header'
import Box from '../../Box';
import InlineStack from '../../InlineStack';
import InlineGrid from '../../InlineGrid';
import Text from '../../Text';
import CloseButton from '../CloseButton';


defineOptions({
  name: 'NpModalHeader',
})
defineEmits(['close']);
defineProps<HeaderProps>();

const headerPaddingInline = '400';
const headerPaddingBlock = '400';
</script>
