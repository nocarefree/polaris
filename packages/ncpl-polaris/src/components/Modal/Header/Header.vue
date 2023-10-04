<template>
  <template v-if="titleHidden || !$slots.default">
    <Box v-if="polarisSummerEditions2023" position="absolute" :inset-inline-end="headerPaddingInline"
      :inset-block-start="headerPaddingBlock" z-index="1">
      <CloseButton :title-hidden="titleHidden" @click="$emit('close')" />
    </Box>
    <Box v-else position="absolute" inset-inline-end="0" z-index="1">
      <HorizontalStack gap="4" align="end" block-align="center">
        <CloseButton :title-hidden="titleHidden" @click="$emit('close')" />
      </HorizontalStack>
    </Box>
  </template>
  <Box v-else padding-block-start="4" padding-block-end="4" :padding-inline-start="headerPaddingInline"
    :padding-inline-end="headerPaddingInline" border-block-end-width="1" :border-color="polarisSummerEditions2023 ? 'border'
      : 'border-subdued'" :background="polarisSummerEditions2023 ? 'bg-secondary-experimental' : undefined">
    <HorizontalGrid :columns="{ xs: '1fr auto' }" gap="4">
      <HorizontalStack gap="4" block-align="center">
        <Text :id="id" as="h2" :variant="polarisSummerEditions2023 ? 'headingMd' : 'headingLg'" break-word>
          <slot></slot>
        </Text>
      </HorizontalStack>
      <CloseButton :pressed="closing" :title-hidden="titleHidden" @click="$emit('close')" />
    </HorizontalGrid>
  </Box>
</template>
<script setup lang="ts">
import type { HeaderProps } from './Header'
import Box from '@ncpl-polaris/components/Box';
import HorizontalGrid from '@ncpl-polaris/components/HorizontalGrid';
import HorizontalStack from '@ncpl-polaris/components/HorizontalStack';
import Text from '@ncpl-polaris/components/Text';
import CloseButton from '../CloseButton';
import { useFeatures } from '../../context';


defineOptions({
  name: 'NpModalHeader',
})
defineEmits(['close']);
defineProps<HeaderProps>();

const { polarisSummerEditions2023 } = useFeatures();
const headerPaddingInline = polarisSummerEditions2023 ? '4' : '5';
const headerPaddingBlock = '4';

</script>
