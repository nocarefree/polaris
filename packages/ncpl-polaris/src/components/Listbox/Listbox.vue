<template>
  <Text as="span" visuallyHidden>
    <div aria-live="polite">{{ loading ? loading : null }}</div>
  </Text>

  <ul v-if="$slots.default" :tabindex="0" role="listbox" :class="styles.Listbox"
    :aria-label="inCombobox ? undefined : accessibilityLabel" :aria-labelledby="textFieldLabelId"
    :aria-busy="Boolean(loading)" :aria-activedescendant="activeOption && activeOption.domId" :id="listId"
    @focus="inCombobox ? undefined : handleFocus" @blur="inCombobox ? undefined : handleBlur" ref="listboxRef">
    <slot></slot>
  </ul>
</template>
<script setup lang="ts">
import { ref, computed, watchEffect, toRef, watch, onUnmounted } from 'vue';
import { AutoSelection, listboxContext } from './Listbox';
import type { ListboxProps, ArrowKeys, NavigableOption } from './Listbox';
import Text from '../Text';
import styles from './Listbox.module.scss';
import { onKeyDown } from '@vueuse/core';
import { debounce } from "../../utils/debounce"
import { scrollOptionIntoView } from "./utils";
import { useComboboxListbox } from "../Combobox"
import { useId } from "../context"
import { scrollable } from '../shared';

const OPTION_SELECTOR = '[data-listbox-option]';
const OPTION_VALUE_ATTRIBUTE = 'data-listbox-option-value';
const OPTION_ACTION_ATTRIBUTE = 'data-listbox-option-action';
const OPTION_FOCUS_ATTRIBUTE = 'data-focused';

defineOptions({
  name: 'NpListbox',
})
const emit = defineEmits(['activeOptionChange', 'select']);
const props = withDefaults(defineProps<ListboxProps>(), {
  autoSelection: AutoSelection.FirstSelected,
});
const loading = ref<string | undefined>();
const listboxRef = ref<HTMLUListElement>();
const currentOptions = ref<HTMLElement[]>([])
const activeOption = ref<NavigableOption>();
const lazyLoading = ref(false);
const scrollableRef = ref<HTMLElement | null>(null);
const listId = useId(toRef(props, 'customListId'));
const keyboardEventsEnabled = ref<boolean>(Boolean(props.enableKeyboardControl));

const {
  listboxId,
  textFieldLabelId,
  textFieldFocused,
  willLoadMoreOptions,
  setActiveOptionId,
  setListboxId,
  onOptionSelected,
  onKeyToBottom,
} = useComboboxListbox();

const inCombobox = computed(() => Boolean(setActiveOptionId));


watchEffect(() => {
  if (setListboxId && !listboxId?.value) {
    setListboxId(listId.value);
  }
});

watchEffect(() => {
  if (listboxRef.value) {
    scrollableRef.value = listboxRef.value.closest(scrollable.selector) as (HTMLElement | null);
  }
}, { flush: 'post' });

const handleKeyToBottom = () => {
  if (onKeyToBottom) {
    lazyLoading.value = true;
    return Promise.resolve(onKeyToBottom());
  }
};

const getNextIndex = (currentIndex: number, lastIndex: number, direction: string) => {
  let nextIndex;

  if (direction === 'down') {
    if (currentIndex === lastIndex) {
      nextIndex = willLoadMoreOptions?.value ? currentIndex + 1 : 0;
    } else {
      nextIndex = currentIndex + 1;
    }
  } else {
    nextIndex = currentIndex === 0 ? lastIndex : currentIndex - 1;
  }

  return nextIndex;
};

const getFirstNavigableOption = (currentOptions: HTMLElement[]) => {
  const { autoSelection } = props;
  const hasSelectedOptions = currentOptions.some(
    (option) => option.getAttribute('aria-selected') === 'true',
  );

  let elementIndex = 0;
  const element = currentOptions.find((option, index) => {
    const isInteractable = option.getAttribute('aria-disabled') !== 'true';
    let isFirstNavigableOption;

    if (
      hasSelectedOptions &&
      autoSelection === AutoSelection.FirstSelected
    ) {
      const isSelected = option.getAttribute('aria-selected') === 'true';
      isFirstNavigableOption = isSelected && isInteractable;
    } else {
      isFirstNavigableOption = isInteractable;
    }

    if (isFirstNavigableOption) elementIndex = index;

    return isFirstNavigableOption;
  });

  if (!element) return;

  return { element, index: elementIndex };
};

const getNavigableOptions = () => {
  if (!listboxRef.value) {
    return [];
  } else {

    return [
      ...new Set(
        listboxRef.value.querySelectorAll<HTMLElement>(OPTION_SELECTOR),
      ),
    ];
  }
};

const getNextValidOption = async (key: ArrowKeys) => {
  const lastIndex = currentOptions.value.length - 1;
  const { autoSelection } = props;
  let currentIndex = activeOption.value?.index || 0;
  let nextIndex = 0;
  let element:any = activeOption.value?.element;
  let totalOptions = -1;

  if (!activeOption.value && autoSelection === AutoSelection.None) {
    const nextOptions = getNavigableOptions();
    const nextActiveOption = getFirstNavigableOption(nextOptions);
    currentOptions.value = nextOptions;
    return {
      element: nextActiveOption?.element,
      nextIndex: nextActiveOption?.index || 0,
    };
  }

  while (totalOptions++ < lastIndex) {
    nextIndex = getNextIndex(currentIndex, lastIndex, key);
    element = currentOptions.value[nextIndex];
    const triggerLazyLoad = nextIndex >= lastIndex;
    const isDisabled = element?.getAttribute('aria-disabled') === 'true';

    if (triggerLazyLoad && willLoadMoreOptions?.value) {
      await handleKeyToBottom();
    }

    if (isDisabled) {
      currentIndex = nextIndex;
      element = undefined;
      continue;
    }

    break;
  }
  return { element, nextIndex };
}

const getFormattedOption = (element: HTMLElement, index: number) => {
  return {
    element,
    index,
    domId: element.id,
    value: element.getAttribute(OPTION_VALUE_ATTRIBUTE) || '',
    disabled: element.getAttribute('aria-disabled') === 'true',
    isAction: element.getAttribute(OPTION_ACTION_ATTRIBUTE) === 'true',
  };
};

const handleScrollIntoView = (option: NavigableOption) => {
  if (scrollableRef.value) {
    scrollOptionIntoView(option.element, scrollableRef.value!);
  }
};
const handleScrollIntoViewDebounced = debounce(handleScrollIntoView, 50);
const handleChangeActiveOption = (nextOption?: NavigableOption) => {
  if (!nextOption) return activeOption.value = undefined;

  activeOption.value?.element.removeAttribute(OPTION_FOCUS_ATTRIBUTE);
  nextOption.element.setAttribute(OPTION_FOCUS_ATTRIBUTE, 'true');
  handleScrollIntoViewDebounced(nextOption);
  activeOption.value = nextOption;
  setActiveOptionId?.(nextOption.domId);
  emit('activeOptionChange', nextOption.value, nextOption.domId);
};

const handleArrow = async (type: ArrowKeys, event: Event) => {
  event.preventDefault();

  const { element, nextIndex } = await getNextValidOption(type);
  if (!element) return;
  const nextOption = getFormattedOption(element, nextIndex);
  handleChangeActiveOption(nextOption);
}


const onOptionSelect = (option: NavigableOption) => {
  handleChangeActiveOption(option);

  if (onOptionSelected) onOptionSelected();
  emit('select', option.value);
};

const handleEnter = (event: KeyboardEvent) => {
  event.preventDefault();
  event.stopPropagation();
  if (activeOption.value) {
    onOptionSelect(activeOption.value);
  }
};

const handleFocus = () => {
  if (props.enableKeyboardControl) return;
  keyboardEventsEnabled.value = true;
};

const handleBlur = (event: FocusEvent) => {
  event.stopPropagation();
  if (keyboardEventsEnabled.value) {
    const nextActiveOption = getFirstNavigableOption(currentOptions.value);

    if (nextActiveOption) {
      const { element, index } = nextActiveOption;
      const nextOption = getFormattedOption(element, index);
      handleChangeActiveOption(nextOption);
    }
  }
  if (props.enableKeyboardControl) return;
  keyboardEventsEnabled.value = false;
};


const resetActiveOption = () => {
  let nextOption;
  const nextOptions = getNavigableOptions();
  const nextActiveOption = getFirstNavigableOption(nextOptions);


  if (nextOptions.length === 0 && currentOptions.value.length > 0) {
    currentOptions.value = nextOptions;
    handleChangeActiveOption();
    return;
  }

  if (nextActiveOption) {
    const { element, index } = nextActiveOption;
    nextOption = getFormattedOption(element, index);
  }

  const optionIsAlreadyActive =
    activeOption.value !== undefined && nextOption?.domId === activeOption.value?.domId;

  const actionContentHasUpdated =
    activeOption.value?.isAction &&
    nextOption?.isAction &&
    nextOption?.value !== activeOption.value?.value;

  const currentValues = currentOptions.value.map((option) =>
    option.getAttribute(OPTION_VALUE_ATTRIBUTE),
  );

  const nextValues = nextOptions.map((option) =>
    option.getAttribute(OPTION_VALUE_ATTRIBUTE),
  );

  const listIsUnchanged =
    nextValues.length === currentValues.length &&
    nextValues.every((value, index) => {
      return currentValues[index] === value;
    });

  const listIsAppended =
    currentValues.length !== 0 &&
    nextValues.length > currentValues.length &&
    currentValues.every((value, index) => {
      return nextValues[index] === value;
    });

  if (listIsUnchanged) {
    if (optionIsAlreadyActive && actionContentHasUpdated) {
      currentOptions.value = nextOptions;
      handleChangeActiveOption(nextOption);
    }

    return;
  }

  if (listIsAppended) {
    currentOptions.value = nextOptions;
    return;
  }

  currentOptions.value = nextOptions;

  if (lazyLoading.value) {
    lazyLoading.value = true;
    return;
  }

  handleChangeActiveOption(nextOption);
};

let cleanup: (() => void)[] = [];
const clearEventlistener = () => {
  cleanup.forEach((e) => {
    e();
  })
  cleanup = [];
}

watch(() => keyboardEventsEnabled.value || textFieldFocused?.value, () => {
  clearEventlistener();
  if ((keyboardEventsEnabled.value || textFieldFocused?.value)) {
    cleanup.push(onKeyDown('ArrowDown', (event: Event) => handleArrow('down', event)));
    cleanup.push(onKeyDown('ArrowUp', (event: Event) => handleArrow('up', event)));
    cleanup.push(onKeyDown('Enter', handleEnter));
  }
}, { immediate: true, flush: 'post' })

listboxContext.provide({
  onOptionSelect,
  setLoading: (e?: string) => {
    loading.value = e;
  },
})

watch(() => [loading.value, activeOption.value, props.autoSelection], () => {
  if (
    props.autoSelection !== AutoSelection.None &&
    !loading.value
  ) {
    requestAnimationFrame(resetActiveOption);
  }
}, { immediate: true, flush: 'post' })


onUnmounted(() => {
  clearEventlistener();
});

</script>
