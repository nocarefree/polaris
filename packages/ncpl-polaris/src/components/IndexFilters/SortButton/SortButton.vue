<template>
  <Popover :active="active && !disabled" autofocus-target="first-node" @close="active = false" preferred-alignment="right"
    fluid-content>
    <template #activator>
      <Tooltip :content="i18n.translate('Polaris.IndexFilters.SortButton.tooltip')" preferred-position="above"
        :hover-delay="400">
        <Button size="slim" :icon="SortMinor" @click="active = !active" :disabled="disabled"
          :accessibility-label="i18n.translate('Polaris.IndexFilters.SortButton.ariaLabel')" />
      </Tooltip>
    </template>
    <Box min-width="148px" padding-inline-start="300" padding-inline-end="300" padding-block-start="200"
      padding-block-end="200" border-block-end-width="025" border-color="border-secondary">
      <ChoiceList :title="i18n.translate('Polaris.IndexFilters.SortButton.title')" :choices="choiceListChoices"
        :selected="selected" @change="handleChangeChoiceList" />
    </Box>
    <Box padding-inline-start="150" padding-inline-end="150" padding-block-start="200" padding-block-end="200">
      <DirectionButton direction="asc" :active="_selected[1] === SortButtonDirection.Asc"
        @click="handleChangeDirection(selectedChoices?.[0]?.value)" :value="selectedChoices?.[0]?.value">
        {{ selectedChoices?.[0]?.directionLabel }}
      </DirectionButton>
      <DirectionButton direction="desc" :active="_selected[1] === SortButtonDirection.Desc"
        @click="handleChangeDirection(selectedChoices?.[1]?.value)" :value="selectedChoices?.[1]?.value">
        {{ selectedChoices?.[1]?.directionLabel }}
      </DirectionButton>
    </Box>
  </Popover>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import type { IndexFiltersSortButtonProps } from './SortButton';
import Popover from "../../Popover";
import Box from "../../Box";
import Tooltip from "../../Tooltip";
import Button from "../../Button";
import ChoiceList from "../../ChoiceList";
import type { ChoiceListProps } from "../../ChoiceList";
import { SortButtonDirection } from './SortButton';
import DirectionButton from "./DirectionButton"
import { useI18n } from "../../context"
import { SortMinor } from "@ncpl/ncpl-icons"

defineOptions({
  name: 'NpIndexFiltersSortButton',
})
const props = defineProps<IndexFiltersSortButtonProps>()
const emit = defineEmits(['change', 'changeKey', 'changeDirection'])

const i18n = useI18n();
const active = ref(false);
const _selected = computed(() => props.selected[0].split(' '))


const selectedChoices = computed(
  () => props.choices.filter((choice) => {
    const [currentKey] = choice.value.split(' ');
    return currentKey === _selected.value[0];
  })
);

const choiceListChoices = computed(() => {
  const choiceCategories = props.choices.reduce(
    (acc: ChoiceListProps['choices'], curr) => {
      const alreadyExists = acc.some((option) => option.label === curr.label);
      const [, currentValueDirection] = curr.value.split(' ');
      const isSameDirection = currentValueDirection === _selected.value[1];
      if (!alreadyExists) {
        return [...acc, curr];
      }
      if (isSameDirection) {
        return acc.map((option) => {
          if (option.label === curr.label) {
            return curr;
          }
          return option;
        });
      }
      return acc;
    },
    [],
  );
  return choiceCategories;
});

const handleChangeChoiceList = (sel: string[]) => {
  emit('changeKey', sel[0].split(' '));
  emit('change', sel)
}

const handleChangeDirection = (sel: string) => {
  const [, direction] = sel.split(' ');
  emit('changeDirection', direction);
  emit('change', [sel])
}

</script>
