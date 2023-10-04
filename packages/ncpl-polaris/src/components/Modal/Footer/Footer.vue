<template>
  <HorizontalStack gap="4" block-align="center">
    <Box :border-color="polarisSummerEditions2023 ? 'border' : 'border-subdued'" border-block-start-width="1"
      :minHeight="polarisSummerEditions2023 ? undefined : 'var(--p-space-16)'" padding="4"
      :padding-inline-start="polarisSummerEditions2023 ? undefined : '5'"
      :padding-inline-end="polarisSummerEditions2023 ? undefined : '5'" width="100%">
      <HorizontalStack gap="4" block-align="center" align="space-between">
        <Box>
          <slot></slot>
        </Box>
        <HorizontalStack v-if="primaryAction || (secondaryActions && secondaryActions.length > 0)" gap="2">
          <template v-if="secondaryActions && secondaryActions.length > 0">
            <Button v-for="{ content, onAction, ...action } in secondaryActions" @click="onAction" v-bind="action">
              {{ content }}
            </Button>
          </template>
          <template v-if="primaryAction">
            <Button v-for="{ content, onAction, ...action } in [primaryAction]" @click="onAction" v-bind="action" primary>
              {{ content }}
            </Button>
          </template>
        </HorizontalStack>
      </HorizontalStack>
    </Box>
  </HorizontalStack>
</template>
<script setup lang="ts">
import type { FooterProps } from './Footer'
import HorizontalStack from '@ncpl-polaris/components/HorizontalStack';
import Box from '@ncpl-polaris/components/Box';
import Button from '@ncpl-polaris/components/Button';
import { useFeatures } from '../../context';

defineOptions({
  name: 'NpModalFooter',
})
defineProps<FooterProps>()

const { polarisSummerEditions2023 } = useFeatures();
</script>
