<template>
  <VerticalStack gap="4" inline-align="center">
    <Box width="100%" padding="0" :padding-inline-start="{ sm: '6' }" :padding-inline-end="{ sm: '6' }"
      :aria-label="i18n.translate('Polaris.SkeletonPage.loadingLabel')" role="status" :max-width="maxWidth">
      <VerticalStack>
        <Box :padding-block-start="{ xs: '4', md: '5' }" :padding-block-end="{ xs: '4', md: '5' }"
          :padding-inline-start="{ xs: '4', sm: '0' }" :padding-inline-end="{ xs: '4', sm: '0' }" width="100%">
          <HorizontalStack gap="4" align="space-between" block-align="center">
            <HorizontalStack gap="4">
              <Box v-if="backAction" border-radius="1" background="bg-strong" min-height="2.25rem" min-width="2.25rem"
                max-width="2.25rem" />
              <Box padding-block-start="1" padding-block-end="1">
                <h1 v-if="title" :class="styles.Title">{{title}}</h1>
                <div v-else :class="styles.SkeletonTitle">
                  <Box background="bg-strong" min-width="120px" min-height="28px" border-radius="1" />
                </div>
              </Box>
            </HorizontalStack>
            <Box id="SkeletonPage-PrimaryAction" border-radius="1" background="bg-strong" min-height="2.25rem"
              min-width="6.25rem" />
          </HorizontalStack>
        </Box>
        <Box padding-block-end="2" width="100%">
          <slot></slot>
        </Box>
      </VerticalStack>
    </Box>
  </VerticalStack>
</template>
<script setup lang="ts">
import { computed } from "vue"
import type { SkeletonPageProps } from './SkeletonPage'
import styles from './SkeletonPage.module.scss'
import VerticalStack from "../VerticalStack"
import Box from "../Box"
import HorizontalStack from "../HorizontalStack"
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
