<template>
  <Box padding-inline-start="0" padding-inline-end="0" padding-block-start="5" padding-block-end="16">
    <VerticalStack inlineAlign="center">
      <Image v-if="largeImage" alt="" role="presentation" :source="largeImage" :class="imageContainedClass" :source-set="[
        { source: image, descriptor: '568w' },
        { source: largeImage, descriptor: '1136w' },
      ]" sizes="(max-width: 568px) 60vw" />
      <Image v-else :className="imageContainedClass" role="presentation" alt="" :source="image" />
      <Box v-if="secondaryActionMarkup || primaryActionMarkup || $slots.footer || $slots.default || $slots.heading"
        :max-width="fullWidth ? '100%' : '400px'">
        <VerticalStack inline-align="center">
          <Box v-if="$slots.heading || $slots.default" :padding-block-end="polarisSummerEditions2023 ? '4' : '6'">
            <Box :padding-block-end="polarisSummerEditions2023 ? '1_5-experimental' : '4'">
              <Text v-if="$slots.heading" :variant="polarisSummerEditions2023 ? 'headingMd' : headingSize" as="p"
                alignment="center">
                <slot name="heading"></slot>
              </Text>
            </Box>
            <Text v-if="$slots.default" as="span" :color="polarisSummerEditions2023 ? undefined : 'subdued'"
              alignment="center" :variant="polarisSummerEditions2023 ? 'bodySm' : 'bodyMd'">
              <slot></slot>
            </Text>
          </Box>
          <HorizontalStack v-if="secondaryActionMarkup || primaryActionMarkup" align="center" gap="2">
            <component :is="secondaryActionMarkup"></component>
            <component :is="primaryActionMarkup"></component>
          </HorizontalStack>

          <Box v-if="$slots.footer" padding-block-start="4">
            <Text as="span" :color="polarisSummerEditions2023 ? undefined : 'subdued'" alignment="center"
              :variant="polarisSummerEditions2023 ? 'bodySm' : 'bodyMd'">
              <slot name="footer"></slot>
            </Text>
          </Box>
        </VerticalStack>
      </Box>
    </VerticalStack>
  </Box>
</template>
<script setup lang="ts">
import { unref, computed } from 'vue'
import type { EmptyStateProps } from './EmptyState'
import styles from './EmptyState.module.scss'
import Image from '../Image'
import Box from '../Box'
import Text from '../Text'
import VerticalStack from '../VerticalStack'
import HorizontalStack from '../HorizontalStack'
import { buttonFrom } from "../Button/utils"
import { useFeatures, withinContentContext } from '../context'
import { classNames } from "@ncpl-polaris/utils"

defineOptions({
  name: 'NpEmptyState',
})
const props = defineProps<EmptyStateProps>()

const { polarisSummerEditions2023 } = useFeatures();

const withinContentContainer = withinContentContext.inject();

const headingSize = computed(() => unref(withinContentContainer) ? 'headingLg' : 'headingXl')

const secondaryActionMarkup = computed(() => props.secondaryAction ? buttonFrom(props.secondaryAction, {}) : null)
const primaryActionMarkup = computed(() => props.action ? buttonFrom(props.action, { primary: true, size: 'medium' }) : null)

const imageContainedClass = computed(() => classNames(props.imageContained && styles.imageContained,))


</script>
