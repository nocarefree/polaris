<template>
  <NpTextField :model-value="modelValue" v-bind="{ ...props, id: textFieldId }" aria-haspopup="listbox"
    :aria-active-descendant="activeOptionId" :aria-controls="listboxId" role="combobox" :aria-expanded="expanded"
    @focus="handleFocus" @blur="handleBlur" @change="handleChange"
    @update:model-value="e => $emit('update:model-value', e)">
    <template v-for="(slot, index) of Object.keys($slots)" :key="index" v-slot:[slot]>
      <slot :name="slot"></slot>
    </template>
  </NpTextField>
</template>
<script setup lang="ts">
import { toRef, watchEffect } from 'vue'
import NpTextField from "../../TextField"
import { type ComboboxTextFieldProps } from "../TextField"
import { useComboboxTextField } from "../Combobox";
import { useId } from "../../context"

defineOptions({
  name: 'NpComboboxTextField',
})
const props = withDefaults(defineProps<ComboboxTextFieldProps>(), {
  type: 'text',
  ariaAutocomplete: 'list',
})
const emit = defineEmits(['focus', 'blur', 'change', 'update:model-value'])

const textFieldId = useId(toRef(props, 'id'));
const {
  activeOptionId,
  listboxId,
  expanded,
  setTextFieldFocused,
  setTextFieldLabelId,
  onTextFieldFocus,
  onTextFieldChange,
  onTextFieldBlur,
} = useComboboxTextField();

watchEffect(() => {
  if (setTextFieldLabelId) setTextFieldLabelId(textFieldId.value);
})

const handleFocus = (event: FocusEvent) => {
  emit('focus', event);
  if (onTextFieldFocus) onTextFieldFocus();
  if (setTextFieldFocused) setTextFieldFocused(true);
};

const handleBlur = (event: FocusEvent) => {
  emit('blur', event);
  if (onTextFieldBlur) onTextFieldBlur();
  if (setTextFieldFocused) setTextFieldFocused(false);
};

const handleChange = (value: string, id: string) => {
  emit('change', value, id);
  if (onTextFieldChange) onTextFieldChange(value);
};

</script>
