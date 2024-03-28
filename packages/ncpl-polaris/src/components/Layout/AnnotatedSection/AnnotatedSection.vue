<template>
  <div :class="styles.AnnotatedSection">
    <div :class="styles.AnnotationWrapper">
      <div :class="styles.Annotation">
        <TextContainer spacing="tight">
          <Text :id="id" variant="headingMd" as="h2">
            {{ title }}<slot name="title"></slot>
          </Text>

          <Box v-if="$slots.description || description" color="text-secondary">
            <template v-if="description">
              <Text as="p" variant="bodyMd">
                {{ description }}
              </Text>
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
import type { LayoutAnnotatedSectionProps } from './AnnotatedSection'
import styles from '../Layout.module.scss'
import TextContainer from "../../TextContainer"
import Text from "../../Text"
import Box from "../../Box"

defineOptions({
  name: 'NpLayoutAnnotatedSection',
})
defineProps<LayoutAnnotatedSectionProps>()

</script>
