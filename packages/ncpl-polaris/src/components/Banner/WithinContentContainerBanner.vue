<template>
    <Box
      width="100%"
      :background="backgroundColor"
      padding="200"
      border-radius="200"
      :color="textColor"
    >
      <InlineStack
        align="space-between"
        block-align="start"
        :wrap="false"
        gap="200"
      >
        <InlineStack gap="150" :wrap="false">
          <slot name="bannerIcon"></slot>
          <Box width="100%">
            <BlockStack gap="200">
              <BlockStack gap="050">
                <slot name="bannerTitle"></slot>
                <div><slot></slot></div>
              </BlockStack>
              <slot name="actionButtons"></slot>
            </BlockStack>
          </Box>
        </InlineStack>
        <slot name="dismissButton"></slot>
      </InlineStack>
    </Box>
</template>
<script setup lang="ts">
import type { ColorTextAlias, ColorBackgroundAlias } from '@shopify/polaris-tokens';
import Box from "../Box";
import BlockStack from "../BlockStack";
import InlineStack from "../InlineStack";

defineProps<{ backgroundColor: ColorBackgroundAlias, textColor: ColorTextAlias }>()

</script>