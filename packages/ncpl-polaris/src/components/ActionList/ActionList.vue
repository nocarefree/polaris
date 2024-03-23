<template>
  <Box ref="actionListRef" :as="hasMultipleSections ? 'ul' : 'div'"
    :role="hasMultipleSections && actionRole === 'menuitem' ? 'menu' : undefined"
    :tab-index="hasMultipleSections && actionRole === 'menuitem' ? -1 : undefined">
    <Section v-for="(section, index) in finalSections" :key="getKey(index, section)" :section="section"
      :has-multiple-sections="hasMultipleSections" :action-role="actionRole" @actionAnyItem="() => $emit('actionAnyItem')"
      :is-first="index === 0">
    </Section>
  </Box>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import Box from "@ncpl-polaris/components/Box/Box.vue";
import Section from "./Section/Section.vue"
import type { ActionListProps } from './ActionList'
import type { ActionListSection } from './Section/Section';

defineOptions({
  name: 'NpActionList',
})
const props = defineProps<ActionListProps>();
defineEmits(['actionAnyItem'])



const actionListRef = ref<HTMLElement>();

const finalSections = computed(() => {
  const { sections = [], items } = props;
  return items ? [{ items }, ...sections] : sections
})
const hasMultipleSections = computed(() => {
  return finalSections.value.length > 1;
})

const getKey = (index: number, section: ActionListSection) => {
  return typeof section.title === 'string' ? section.title : index;
}
</script>
