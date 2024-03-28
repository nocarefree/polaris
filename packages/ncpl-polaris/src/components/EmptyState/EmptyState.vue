<template>
  <Box padding-inline-start="0" padding-inline-end="0" padding-block-start="500" padding-block-end="1600">
    <BlockStack inline-align="center">
      <Image v-if="largeImage" alt="" role="presentation" :source="largeImage" :class="imageContainedClass" :source-set="[
        { source: image, descriptor: '568w' },
        { source: largeImage, descriptor: '1136w' },
      ]" sizes="(max-width: 568px) 60vw" />
      <Image v-else :class="imageContainedClass" role="presentation" alt="" :source="image" />
      <Box v-if="secondaryAction || action || $slots.footer || $slots.default || $slots.heading || heading"
        :max-width="fullWidth ? '100%' : '400px'">
        <BlockStack inline-align="center">
          <Box v-if="$slots.heading || heading || $slots.default" padding-block-end="400">
            <Box padding-block-end="150">
              <Text v-if="$slots.heading || heading" variant="headingMd" as="p" alignment="center">
                <slot v-if="$slots.heading" name="heading"></slot>
                <template v-else>{{ heading }}</template>
              </Text>
            </Box>
            <Text v-if="$slots.default" as="span" alignment="center" variant="bodySm">
              <slot></slot>
            </Text>
          </Box>
          <InlineStack v-if="secondaryAction || action" align="center" gap="200">
            <component v-if="secondaryAction" :is="()=>buttonFrom(secondaryAction!, {})"></component>
            <component v-if="action" :is="()=>buttonFrom(action!, { variant: 'primary', size: 'medium' })">
            </component>
          </InlineStack>

          <Box v-if="$slots.footer" padding-block-start="400">
            <Text as="span" alignment="center" variant="bodySm">
              <slot name="footer"></slot>
            </Text>
          </Box>
        </BlockStack>
      </Box>
    </BlockStack>
  </Box>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import type { EmptyStateProps } from './EmptyState'
import styles from './EmptyState.module.scss'
import Image from '../Image'
import Box from '../Box'
import Text from '../Text'
import BlockStack from '../BlockStack'
import InlineStack from '../InlineStack'
import { buttonFrom } from "../Button/utils"
import { classNames } from "../../utils"

defineOptions({
  name: 'NpEmptyState',
})
const props = defineProps<EmptyStateProps>()


const imageContainedClass = computed(() => classNames(props.imageContained && styles.imageContained,))


</script>
