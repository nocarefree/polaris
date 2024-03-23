<template>
  <BlockStack gap="400" inline-align="center">
    <Box width="100%" padding="0" :padding-inline-start="{ sm: '600' }" :padding-inline-end="{ sm: '600' }"
      :aria-label="i18n.translate('Polaris.SkeletonPage.loadingLabel')" role="status" :max-width="maxWidth">
      <BlockStack>
        <Box :padding-block-start="{ xs: '400', md: '500' }" :padding-block-end="{ xs: '400', md: '500' }"
          :padding-inline-start="{ xs: '400', sm: '0' }" :padding-inline-end="{ xs: '400', sm: '0' }" width="100%">
          <InlineStack gap="400" align="space-between" block-align="center">
            <InlineStack gap="400">
              <Box v-if="backAction" border-radius="100" background="bg-fill-tertiary" min-height="2.25rem"
                min-width="2.25rem" max-width="2.25rem" />
              <Box padding-block-start="100" padding-block-end="100">
                <h1 v-if="title" :class="styles.Title">{{ title }}</h1>
                <div v-else :class="styles.SkeletonTitle">
                  <Box background="bg-fill-tertiary" min-width="120px" min-height="28px" border-radius="100" />
                </div>
              </Box>
            </InlineStack>
            <Box id="SkeletonPage-PrimaryAction" border-radius="100" background="bg-fill-tertiary" min-height="2.25rem"
              min-width="6.25rem" />
          </InlineStack>
        </Box>
        <Box padding-block-end="200" width="100%">
          <slot></slot>
        </Box>
      </BlockStack>
    </Box>
  </BlockStack>
</template>
<script setup lang="ts">
import { computed } from "vue"
import type { SkeletonPageProps } from './SkeletonPage'
import styles from './SkeletonPage.module.scss'
import BlockStack from "../BlockStack"
import Box from "../Box"
import InlineStack from "../InlineStack"
import { useI18n } from "../context"

defineOptions({
  name: 'NpSkeletonPage',
})
const props = withDefaults(defineProps<SkeletonPageProps>(), { title: '' })
const i18n = useI18n();

const maxWidth = computed(() => {
  return props.fullWidth ? 'none' : (props.narrowWidth ? 'var(--pc-skeleton-page-max-width-narrow)' : 'var(--pc-skeleton-page-max-width)')
})
</script>
