<template>
  <BlockStack as="fieldset" :gap="{ xs: '400', md: '0' }" aria-invalid="error !=null" :id="finalName">
    <Box v-if="title" as="legend" :padding-block-end="{ xs: '500', md: '1' }" :visually-hidden="titleHidden">
      {{ title }}
    </Box>
    <BlockStack as="ul" :gap="{ xs: '400', md: '0' }">
      <ChoiceListItem v-for="choice in choices" v-bind="choice" :allowMultiple="allowMultiple" :name="finalName"
        :isSelected="choiceIsSelected(choice, selected)">
      </ChoiceListItem>
    </BlockStack>
    <Box v-if="error" :padding-block-start="{ xs: '0', md: '100' }" padding-block-end="200">
      <InlineError :message="error" :field-id="finalName" />
    </Box>
  </BlockStack>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import type { ChoiceListProps, ChoiceListItem as Choice } from './ChoiceList'
import ChoiceListItem from "./ChoiceListItem.vue"
import { useId } from "../context"
import BlockStack from "../BlockStack"
import Box from "../Box"
import InlineError from "../InlineError"

defineOptions({
  name: 'NpChoiceList',
})
const props = defineProps<ChoiceListProps>()

const uniqName = useId();
const finalName = computed(() => {
  const name = props.name ?? uniqName.value;
  return props.allowMultiple ? `${name}[]` : name
});


function choiceIsSelected({ value }: Choice, selected: string[]) {
  return props.selected.includes(value);
}
</script>