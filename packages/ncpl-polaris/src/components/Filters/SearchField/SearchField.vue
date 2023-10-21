<template>
  <div :class="styles.SearchField">
    <label :class="styles.Label" :htmlFor="id">
      {{ placeholder }}
    </label>
    <input :id="id" ref="inputRef" :class="classNames(
      styles.Input,
      focused && styles.focused,
      borderlessQueryField && styles.borderless,
    )" :value="modelValue"
      @input="(event: Event) => $emit('update:modelValue', (event.target as HTMLInputElement)?.value)"
      @focus="e => $emit('focus', e)" @blur="e => $emit('blur', e)" autocomplete="off" :placeholder="placeholder"
      :disabled="disabled" />
    <UnstyledButton v-if="modelValue !== ''" :class="classNames(
      styles.ClearButton,
      focused && styles['ClearButton-focused'],
    )" @click="() => ($emit('clear'), $emit('update:modelValue', ''))" :disabled="disabled">
      <Text as="span" visually-hidden>
        {{ i18n.translate('Polaris.Common.clear') }}
      </Text>
      <Icon :source="CircleCancelMinor" tone="subdued" />
    </UnstyledButton>
  </div>
</template>
<script setup lang="ts">
import { ref, watchEffect } from "vue";
import type { FiltersSearchFieldProps } from './SearchField';
import styles from './SearchField.module.scss';
import UnstyledButton from "../../UnstyledButton";
import Text from "../../Text";
import Icon from "../../Icon";
import { useI18n, useId } from "../../context";
import { classNames } from "@ncpl-polaris/utils";
import { CircleCancelMinor } from "@ncpl/ncpl-icons";

defineOptions({
  name: 'NpFiltersSearchField',
})
const props = defineProps<FiltersSearchFieldProps>()
defineEmits(['focus', 'blur', 'clear', 'update:modelValue'])

const i18n = useI18n();
const id = useId();
const inputRef = ref();


watchEffect(() => {
  if (inputRef.value) {
    return props.focused ? inputRef.value.focus() : void 0;
  }
}, { flush: 'post' })





</script>
