<template>
  <div :class="classNames(
    styles.SearchField,
    (focused || active || forceActive) && styles.focused,
  )" ref="searchField">
    <Text as="span" visually-hidden>
      <label :html-for="searchId">
        {{ i18n.translate('Polaris.TopBar.SearchField.search') }}
      </label>
    </Text>
    <input :id="searchId" :class="styles.Input" :placeholder="placeholder" type="search" auto-capitalize="off"
      auto-complete="off" auto-correct="off" ref="inputField" :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @change="$emit('change', ($event.target as HTMLInputElement).value)" @keydown="preventDefault" />
    <span :class="styles.Icon">
      <Icon :source="SearchMinor" />
    </span>

    <button v-if="modelValue !== ''" type="button" ref="buttonField"
      :aria-label="i18n.translate('Polaris.TopBar.SearchField.clearButtonLabel')" :class="styles.Clear"
      @click="handleClear">
      <Icon :source="CircleCancelMinor" />
    </button>
    <div :class="classNames(styles.Backdrop, showFocusBorder && styles.BackdropShowFocusBorder)" />
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { SearchFieldProps } from './SearchField'
import Text from '@ncpl-polaris/components/Text'
import Icon from '@ncpl-polaris/components/Icon'
import styles from './SearchField.module.scss'
import { useFocus } from '@vueuse/core';
import { classNames } from "@ncpl-polaris/utils";
import { useI18n, useId } from "../../context"
import { SearchMinor, CircleCancelMinor } from "@ncpl/ncpl-icons"

defineOptions({
  name: 'NpSearchField',
})
defineProps<SearchFieldProps>()
const emit = defineEmits(['change', 'cancel', 'update:modelValue'])

const searchField = ref();
const buttonField = ref();
const inputField = ref();
const searchId = useId();
const i18n = useI18n();


const { focused } = useFocus(searchField)
const { focused: forceActive } = useFocus(buttonField)

const handleClear = () => {

  emit('cancel');
  if (!inputField.value) {
    return;
  }

  inputField.value.value = '';
  inputField.value.focus();
  emit('change', '');
  emit('update:modelValue', '');
}

const preventDefault = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    event.preventDefault();
  }
}

watch(() => focused, () => {
  if (focused.value) {
    inputField.value.focus();
  } else {
    inputField.value.blur();
  }
})

</script>
