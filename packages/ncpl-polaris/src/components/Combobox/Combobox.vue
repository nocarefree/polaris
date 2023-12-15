<template>
  <Popover :ref="popover" :active="popoverActive" autofocus-target="none" prevent-focus-on-close full-width
    :prefer-input-activator="false" :preferred-position="preferredPosition" @close="handleClose">
    <template #activator>
      <slot name="activator"></slot>
    </template>
    <PopoverPane v-if="$slots.default" @scrolledToBottom="() => $emit('scrolledToBottom')" :height="height">
      <div :class="styles.Listbox">
        <slot></slot>
      </div>
    </PopoverPane>
  </Popover>
</template>
<script setup lang="ts">
import { ref, computed, useSlots, toRef } from 'vue'
import type { ComboboxProps } from './Combobox'
import Popover from "../Popover"
import PopoverPane from "../Popover/Pane"
import styles from './Combobox.module.scss'
import { comboboxTextFieldContext, comboboxListboxContext, comboboxListboxOptionContext } from './Combobox'

defineOptions({
  name: 'NpCombobox',
})
const props = withDefaults(defineProps<ComboboxProps>(), {
  preferredPosition: 'below',
})
const emit = defineEmits(['close', 'scrolledToBottom']);
const slots = useSlots();

const popover = ref();
const popoverActive = ref(false);
const activeOptionId = ref<any>()
const listboxId = ref<string>();
const textFieldFocused = ref<boolean>(false);
const textFieldLabelId = ref<string>()
const shouldOpen = computed(() => Boolean(!popoverActive.value && slots.default));


const handleClose = () => {
  popoverActive.value = false;
  emit('close')

  activeOptionId.value = undefined;
};

const handleOpen = () => {
  popoverActive.value = true;
  activeOptionId.value = undefined;
};

const onOptionSelected = () => {
  if (!props.allowMultiple) {
    handleClose();
    activeOptionId.value = undefined;
    return;
  }

  popover.value?.forceUpdatePosition();
};

const handleFocus = () => {
  if (shouldOpen.value) {
    handleOpen();
  }
};

const handleChange = () => {
  if (shouldOpen.value) {
    handleOpen();
  }
};

const handleBlur = () => {
  if (popoverActive.value) {
    handleClose();
  }
};


comboboxListboxContext.provide({
  listboxId,
  textFieldLabelId,
  textFieldFocused,
  willLoadMoreOptions: toRef(props, 'willLoadMoreOptions'),
  onOptionSelected,
  setActiveOptionId: (e: string) => { activeOptionId.value = e },
  setListboxId: (e: string) => { listboxId.value = e },
  onKeyToBottom: () => { emit('scrolledToBottom') },
})


comboboxTextFieldContext.provide({
  activeOptionId,
  expanded: popoverActive,
  listboxId,
  setTextFieldFocused: (e: boolean) => { textFieldFocused.value = e },
  setTextFieldLabelId: (e: string) => { textFieldLabelId.value = e },
  onTextFieldFocus: handleFocus,
  onTextFieldChange: handleChange,
  onTextFieldBlur: handleBlur,
})

comboboxListboxOptionContext.provide({
  allowMultiple: toRef(props, 'allowMultiple'),
})
</script>
