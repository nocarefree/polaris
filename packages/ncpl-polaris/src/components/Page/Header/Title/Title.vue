<template>
  <div v-if="$slots.titleMetadata" :class="styles.TitleWithMetadataWrapper">
    <h1 v-if="title" :class="className">{{ title }}</h1>
    <div :class="styles.TitleMetadata">
      <slot name="titleMetadata"></slot>
    </div>
  </div>
  <template v-else>
    <h1 v-if="title" :class="className">{{ title }}</h1>
  </template>
  <div v-if="subtitle" :class="classNames(
    styles.SubTitle,
    compactTitle && styles.SubtitleCompact,
  )">
    <Text as="p" :variant="polarisSummerEditions2023 ? 'bodySm' : undefined">
      {{ subtitle }}
    </Text>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useFeatures } from "../../../context"
import { classNames } from "@ncpl-polaris/utils"
import Text from "@ncpl-polaris/components/Text"
import type { PageHeaderTitleProps } from './Title'
import styles from './Title.module.scss'

defineOptions({
  name: 'NpPageHeaderTitle',
})
const props = defineProps<PageHeaderTitleProps>()

const { polarisSummerEditions2023 } = useFeatures();

const className = computed(() => {
  return classNames(
    styles.Title,
    props.subtitle && styles.TitleWithSubtitle,
  )
})


</script>
