<template>
  <div :class="styles.AnnotatedSection">
    <div :class="styles.AnnotationWrapper">
      <div :class="styles.Annotation">
        <TextContainer :spacing="polarisSummerEditions2023 ? 'tight' : undefined">
          <Text :id="id" variant="headingMd" as="h2">
            <template v-if="title">{{ title }}</template>
            <slot v-else name="title"></slot>
          </Text>

          <Box v-if="$slots.description || description" color="text-subdued">
            <template v-if="description">
              <Text v-if="polarisSummerEditions2023" as="p" variant="bodyMd">
                {{ description }}
              </Text>
              <p v-else>{{ description }}</p>
            </template>
            <slot v-else name="description"></slot>
          </Box>
        </TextContainer>
      </div>

      <div :class="styles.AnnotationContent">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { LayoutAnnotatedSectionProps } from './AnnotatedSection'
import styles from '../Layout.module.scss'
import TextContainer from "@ncpl-polaris/components/TextContainer"
import Text from "@ncpl-polaris/components/Text"
import Box from "@ncpl-polaris/components/Box"
import { useFeatures } from "../../context"

defineOptions({
  name: 'NpLayoutAnnotatedSection',
})
defineProps<LayoutAnnotatedSectionProps>()

const { polarisSummerEditions2023 } = useFeatures();
</script>
