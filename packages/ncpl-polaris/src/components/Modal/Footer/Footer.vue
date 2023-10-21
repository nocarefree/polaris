<template>
  <InlineStack gap="400" block-align="center">
    <Box border-color="border" border-block-start-width="025" padding="400" width="100%">
      <InlineStack gap="400" block-align="center" align="space-between">
        <Box>
          <slot></slot>
        </Box>
        <InlineStack v-if="primaryAction || secondaryActions" gap="200">
          <component v-if="secondaryActions" :is="buttonsFrom(secondaryActions, {variant: 'primary'})" />
          <component v-if="primaryAction" :is="buttonsFrom(primaryAction)" />
        </InlineStack>
      </InlineStack>
    </Box>
  </InlineStack>
</template>
<script setup lang="ts">
import type { FooterProps } from './Footer'
import InlineStack from '../../InlineStack';
import Box from '../../Box';
import { buttonsFrom } from "../../Button/utils"

defineOptions({
  name: 'NpModalFooter',
})
defineProps<FooterProps>()
</script>
