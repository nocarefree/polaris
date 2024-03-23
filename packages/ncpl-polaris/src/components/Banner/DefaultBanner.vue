<template>
  <Box width="100%">
    <BlockStack align="space-between">
      <Box 
        :background="backgroundColor" 
        :color="textColor" 
        :border-start-start-radius="smUp ? '300' : undefined"
        :border-start-end-radius="smUp ? '300' : undefined"
        :border-end-start-radius="!($slots.actionButtons || $slots.default) && smUp ? '300' : undefined"
        :border-end-end-radius="!($slots.actionButtons || $slots.default) && smUp ? '300' : undefined" 
        padding="300">
        <InlineStack align="space-between" block-align="center" gap="200" :wrap="false">
          <InlineStack gap="100" :wrap="false">
            <slot name="bannerIcon"></slot>
            <slot name="bannerTitle"></slot>
          </InlineStack>
          <slot name="dismissButton"></slot>
        </InlineStack>
      </Box>
      <Box v-if="$slots.actionButtons || $slots.default" :padding="{ xs: '300', md: '400' }" padding-block-start="300">
        <BlockStack gap="200">
          <div>
            <slot></slot>
          </div>
          <slot name="actionButtons"></slot>
        </BlockStack>
      </Box>
    </BlockStack>
  </Box>
</template>
<script setup lang="ts">
import type { ColorTextAlias, ColorBackgroundAlias } from '@shopify/polaris-tokens';
import Box from "../Box";
import BlockStack from "../BlockStack";
import InlineStack from "../InlineStack";
import { useBreakpoints } from "../context";

defineProps<{ backgroundColor: ColorBackgroundAlias, textColor: ColorTextAlias }>()

const { smUp } = useBreakpoints();

</script>