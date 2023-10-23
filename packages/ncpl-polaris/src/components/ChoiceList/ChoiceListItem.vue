<template>
  <li>
    <Bleed :margin-block-end="helpText ? { xs: '100', md: '0' } : { xs: '0' }">
      <component :is="allowMultiple ? Checkbox : RadioButton" :name="name" :value="value" :id="id" :label="label"
        :disabled="disabled" :fill="{ xs: true, sm: false }" :checked="isSelected" :help-text="helpText"
        @update:model-value="e => $emit('change', e)"
        :aria-described-by="error && describedByError ? errorTextID(name) : null" />
      <div v-if="$slots.default" :class="styles.ChoiceChildren">
        <Box :padding-block-start="{ xs: '400', md: '0' }">
          <slot></slot>
        </Box>
      </div>
    </Bleed>
  </li>
</template>
<script setup lang="ts">
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

defineEmits(['change'])

interface ChoiceListItemProps extends ChoiceListItem { isSelected: boolean; name: string; error?: Boolean; allowMultiple?: Boolean }

defineProps<ChoiceListItemProps>()

</script>
