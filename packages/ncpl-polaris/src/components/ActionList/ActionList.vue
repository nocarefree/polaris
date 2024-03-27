<template>
  <Box v-if="(allowFiltering || filterActions) && hasManyActions && isFilterable" padding="200"
    :padding-block-end="totalFilteredActions > 0 ? '0' : '200'">
    <TextField clear-button label-hidden :label="i18n.translate('Polaris.ActionList.SearchField.placeholder')"
      :placeholder="i18n.translate('Polaris.ActionList.SearchField.placeholder')" auto-complete="off"
      v-model="searchText"><template #prefix>
        <Icon :source="SearchIcon" />
      </template></TextField>
  </Box>
  <Box ref="actionListRef" :as="hasMultipleSections ? 'ul' : 'div'"
    :role="hasMultipleSections && actionRole === 'menuitem' ? 'menu' : undefined"
    :tab-index="hasMultipleSections && actionRole === 'menuitem' ? -1 : undefined">
    <Section v-for="(section, index) in finalSections" :key="getKey(index, section)" :section="section"
      :has-multiple-sections="hasMultipleSections" :action-role="actionRole"
      @actionAnyItem="() => $emit('actionAnyItem')" :is-first="index === 0">
    </Section>
  </Box>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import Box from "../Box";
import TextField from "../TextField";
import Icon from "../Icon";
import Section from "./Section"
import type { ActionListProps } from './ActionList';
import type { ActionListSection } from '../types';
import { useI18n, filterActionsContext } from '../context';
import { SearchIcon } from "@ncpl/ncpl-icons";

defineOptions({
  name: 'NpActionList',
})
const props = defineProps<ActionListProps>();
const FILTER_ACTIONS_THRESHOLD = 8;
defineEmits(['actionAnyItem'])

const i18n = useI18n();
const actionListRef = ref<HTMLElement>();
const searchText = ref('');
const filterActions = filterActionsContext.inject();

const finalSections = computed(() => {
  const { sections = [], items } = props;
  return items ? [{ items }, ...sections] : sections
})
const hasMultipleSections = computed(() => {
  return finalSections.value.length > 1;
})

const totalActions = computed(() =>
  finalSections.value?.reduce(
    (acc: number, section) => acc + section.items.length, 0,) || 0
)

const isFilterable = computed(() => finalSections.value?.some((section) =>
  section.items.some((item) => typeof item.content === 'string'),
))

const hasManyActions = computed(() => totalActions.value >= FILTER_ACTIONS_THRESHOLD);

const totalFilteredActions = computed(() =>
  finalSections.value?.reduce(
    (acc: number, section) => acc + section.items.length, 0,) || 0
)

const getKey = (index: number, section: ActionListSection) => {
  return typeof section.title === 'string' ? section.title : index;
}
</script>
