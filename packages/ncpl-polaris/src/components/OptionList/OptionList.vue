<template>
  <Box as="ul" :role="role" padding="150">
    <template v-if="optionsExist">
      <Box v-for="({ title, options }, sectionIndex) in  normalizedOptions " :key="title || `noTitle-${sectionIndex}`"
        as="li" :padding-block-start="sectionIndex === 0 ? title ? '100' : '0' : title ? '050' : '0'">
        <BlockStack :gap="sectionIndex === 0 && sections ? undefined : '0'">
          <Box v-if="title" :padding-block-start="sectionIndex === 0 ? '050' : '300'" padding-inline-start="150"
            padding-block-end="100" padding-inline-end="150" border-color="border-secondary">
            <Text :as="sectionIndex === 0 ? 'h2' : 'h3'" variant="headingSm">
              {{ title }}
            </Text>
          </Box>
          <Box as="ul" :id="`${uniqId}-${sectionIndex}`" :role="role">
            <template v-if="options">
              <Option v-for="(option, optionIndex) in options "
                :key="option.id || `${uniqId}-${sectionIndex}-${optionIndex}`"
                :id="option.id || `${uniqId}-${sectionIndex}-${optionIndex}`" 
                v-bind="option" 
                :section="sectionIndex"
                :index="optionIndex" 
                @click="handleClick" 
                :select="selected.includes(option.value)"
                :allow-multiple="allowMultiple" :vertical-align="verticalAlign" @pointerEnter="handlePointerEnter"
                @focus="handleFocus" />
            </template>
          </Box>
        </BlockStack>
      </Box>
    </template>
  </Box>
</template>
<script setup lang="ts">
import { computed, toRef } from 'vue'
import type { OptionListProps } from './OptionList';
import Box from "../Box";
import BlockStack from "../BlockStack";
import Option from "./Option";
import Text from "../Text";
import type {
  OptionDescriptor,
  SectionDescriptor,
} from '../types';
import { useId } from '../context';

defineOptions({
  name: 'NpOptionList',
})
const emit = defineEmits(['change', 'pointerEnterOption', 'focusOption']);
const props = defineProps<OptionListProps>()
const normalizedOptions = computed(() => createNormalizedOptions(props.options || [], props.sections || [], props.title));
const uniqId = useId(toRef(props, 'id'));

const optionsExist = computed(() => normalizedOptions.value.length > 0);

const handleClick = (sectionIndex: number, optionIndex: number) => {
  const { selected, allowMultiple } = props;
  const selectedValue = normalizedOptions.value[sectionIndex].options[optionIndex].value;
  const foundIndex = selected.indexOf(selectedValue);
  if (allowMultiple) {
    const newSelection =
      foundIndex === -1
        ? [selectedValue, ...selected]
        : [
          ...selected.slice(0, foundIndex),
          ...selected.slice(foundIndex + 1, selected.length),
        ];
    emit('change', newSelection);
    return;
  }
  emit('change', [selectedValue]);
};

const handlePointerEnter = (sectionIndex: number, optionIndex: number) => {
  const selectedValue = normalizedOptions.value[sectionIndex].options[optionIndex].value;
  emit('pointerEnterOption', selectedValue);
};

const handleFocus = (sectionIndex: number, optionIndex: number) => {
  const selectedValue = normalizedOptions.value[sectionIndex].options[optionIndex].value;
  emit('focusOption', selectedValue);
};


function createNormalizedOptions(
  options?: OptionDescriptor[],
  sections?: SectionDescriptor[],
  title?: string,
): SectionDescriptor[] {
  if (options == null) {
    const section = { options: [], title };
    return sections == null ? [] : [section, ...sections];
  }
  if (sections == null) {
    return [
      {
        title,
        options,
      },
    ];
  }
  return [
    {
      title,
      options,
    },
    ...sections,
  ];
};
</script>
