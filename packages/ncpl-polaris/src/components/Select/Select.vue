<template>
  <Labelled :id="_id" :label="label" :error="error" :action="labelAction" :label-hidden="labelHidden"
    :help-text="helpText" :required-indicator="requiredIndicator" :disabled="disabled">
    <div :class="classNames(
    styles.Select,
    error && styles.error,
    disabled && styles.disabled,
  )">
      <select :id="_id" :name="name" :class="styles.Input" :disabled="disabled"
        @focus="(e: Event) => { focused = true, $emit('focus', e) }"
        @blur="(e: Event) => { focused = false, $emit('blur', e) }" @change="handleChange"
        :aria-invalid="Boolean(error)" :aria-describedby="describedBy" :aria-required="requiredIndicator">
        <component :is="optionsMarkup"></component>
      </select>
      <div :class="styles.Content" aria-hidden :aria-disabled="disabled">
        <Box v-if="labelInline" padding-inline-end="100">
          <Text as="span" :tone="tone && tone === 'magic' && !focused ? 'magic-subdued' : 'subdued'" truncate>
            <component :is="() => $slots.label ? $slots.label() : [label]"></component>
          </Text>
        </Box>
        <div v-if="selectedOption.prefix" :class="styles.Prefix">
          <component :is="() => [selectedOption.prefix]"></component>
        </div>
        <span :class="styles.SelectedOption">{{ selectedOption.label }}</span>
        <span :class="styles.Icon">
          <Icon :source="SelectIcon" />
        </span>
      </div>
      <div :class="styles.Backdrop" />
    </div>
  </Labelled>
</template>
<script setup lang="ts">
import { computed, h, toRef, ref } from 'vue'
import type { SelectProps, SelectOption, SelectGroup, StrictOption } from './Select'
import styles from './Select.module.scss'
import Labelled, { helpTextID } from "../Labelled"
import Box from "../Box"
import Text from "../Text"
import Icon from "../Icon"
import { SelectIcon } from "@ncpl/ncpl-icons";
import { useId } from "../context"
import { classNames } from "@ncpl-polaris/utils"

interface HideableStrictOption extends StrictOption {
  hidden?: boolean;
}

interface StrictGroup {
  /** Title for the group */
  title: string;
  /** List of options */
  options: StrictOption[];
}

defineOptions({
  name: 'NpSelect',
})

const emit = defineEmits(['blur', 'focus', 'change', 'update:modelValue']);
const PLACEHOLDER_VALUE = '';
const props = defineProps<SelectProps>()
const _id = useId(toRef(props, 'id'));
const focused = ref(false);
const describedBy = computed(() => {
  const { helpText, error } = props
  let describedBy = [];
  if (helpText) {
    describedBy.push(helpTextID(_id.value));
  }
  if (error) {
    describedBy.push(`${_id.value}Error`);
  }
  return describedBy.length ? describedBy.join(' ') : undefined;
})
const normalizedOptions = computed(() => {
  const { options = [], placeholder } = props;
  let normalizedOptions = options.map(normalizeOption);

  if (placeholder) {
    normalizedOptions = [
      {
        label: placeholder,
        value: PLACEHOLDER_VALUE,
        disabled: true,
      },
      ...normalizedOptions,
    ];
  }

  return normalizedOptions;
})


const selectedOption = computed(() => {
  const flatOptions = flattenOptions(normalizedOptions.value);
  let selectedOption = flatOptions.find((option) => props.modelValue === option.value);

  if (selectedOption === undefined) {
    // Get the first visible option (not the hidden placeholder)
    selectedOption = flatOptions.find((option) => !option.hidden);
  }

  return selectedOption || { value: '', label: '' };
})

const optionsMarkup = computed(() => {
  return () => normalizedOptions.value.map(renderOption);
})

const renderSingleOption = ({ prefix, label, ...rest }: HideableStrictOption) => {
  return h('option', rest, label);
}

const renderOption = (optionOrGroup: HideableStrictOption | StrictGroup) => {
  if (isGroup(optionOrGroup)) {
    const { title, options } = optionOrGroup;
    return h('optgroup', { label: title }, options.map(renderSingleOption));
  }

  return renderSingleOption(optionOrGroup);
}

const handleChange = (event: Event) => {
  emit('change', event);
  emit('update:modelValue', (event.currentTarget as HTMLSelectElement).value);
}

/**
 * Converts a string option (and each string option in a Group) into
 * an Option object.
 */
function normalizeOption(
  option: SelectOption | SelectGroup,
): HideableStrictOption | StrictGroup {
  if (isString(option)) {
    return normalizeStringOption(option);
  } else if (isGroup(option)) {
    const { title, options } = option;
    return {
      title,
      options: options.map((option) => {
        return isString(option) ? normalizeStringOption(option) : option;
      }),
    };
  }

  return option;
}

/**
 * Ungroups an options array
 */
function flattenOptions(
  options: (HideableStrictOption | StrictGroup)[],
): HideableStrictOption[] {
  let flatOptions: HideableStrictOption[] = [];

  options.forEach((optionOrGroup) => {
    if (isGroup(optionOrGroup)) {
      flatOptions = flatOptions.concat(optionOrGroup.options);
    } else {
      flatOptions.push(optionOrGroup);
    }
  });

  return flatOptions;
}

function normalizeStringOption(option: string): StrictOption {
  return {
    label: option,
    value: option,
  };
}

function isString(option: SelectOption | SelectGroup): option is string {
  return typeof option === 'string';
}

function isGroup(option: SelectOption | SelectGroup): option is SelectGroup {
  return (
    typeof option === 'object' && 'options' in option && option.options != null
  );
}
</script>
