<template>
  <li>
    <Bleed :margin-block-end="helpText ? { xs: '1', md: '0' } : { xs: '0' }">
      <component :is="allowMultiple ? Checkbox : RadioButton" :name="name" :value="value" :id="id" :label="label"
        :disabled="disabled" :fill="{ xs: true, sm: false }" :checked="isSelected" :help-text="helpText"
        @change="$emit('change')" :aria-described-by="error && describedByError ? errorTextID(name) : null" />
      <div v-if="renderedChildren" :className="styles.ChoiceChildren">
        <Box :padding-block-start="{ xs: '4', md: '0' }">
          <component :is="renderedChildren"></component>
        </Box>
      </div>
    </Bleed>
  </li>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import type { ChoiceListItem } from './ChoiceList';
import styles from './ChoiceList.module.scss'
import { errorTextID } from '../InlineError';
import Box from "../Box"
import Checkbox from "../Checkbox"
import RadioButton from "../RadioButton"
import Bleed from "../Bleed"

defineOptions({
  name: 'NpChoiceList',
})

interface ChoiceListItemProps extends ChoiceListItem { isSelected: boolean; name: string; error?: Boolean; allowMultiple?: Boolean }

const props = defineProps<ChoiceListItemProps>()

const renderedChildren = computed(() => {
  return props.renderChildren ? props.renderChildren(props.isSelected) : null
})


</script>
