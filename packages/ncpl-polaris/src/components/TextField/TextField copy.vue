<template>
  <Labelled :label="label" :id="inputId" :error="error" :action="labelAction" :label-hidden="labelHidden"
    :required-indicator="requiredIndicator" :disabled="disabled" :read-only="readOnly">
    <template v-if="$slots.label" #label>
      <slot name="label"></slot>
    </template>
    <template v-if="$slots.helpText" #helpText>
      <slot name="helpText"></slot>
    </template>
    <Connected>
      <template v-if="$slots.connectedLeft" #left>
        <slot name="connectedLeft"></slot>
      </template>
      <template v-if="$slots.connectedRight" #right>
        <slot name="connectedRight"></slot>
      </template>
      <div :class="classNames(
        styles.TextField,
        Boolean(normalizedValue) && styles.hasValue,
        disabled && styles.disabled,
        readOnly && styles.readOnly,
        error && styles.error,
        multiline && styles.multiline,
        focus && !disabled && styles.focus,
        borderless && styles.borderless,
      )" @click="handleClick">
        <div v-if="prefixComponent" :class="styles.Prefix" :id="`${inputId}-Prefix`" ref="prefixRef">
          <component :is="prefixComponent"></component>
        </div>

        <VerticalContentComponent />

        <div v-if="suffixComponent" :class="styles.Suffix" :id="`${inputId}-Suffix`" ref="suffixRef">
          <component :is="suffixComponent"></component>
        </div>
        <div v-if="showCharacterCount" :id="`${id}CharacterCounter`" :class="classNames(
          styles.CharacterCount,
          multiline && styles.AlignFieldBottom,
        )" :aria-label="characterCountLabel" :aria-live="focus ? 'polite' : 'off'" aria-atomic="true"
          @click="handleClickChild">
          {{ !maxLength ? characterCount : `${characterCount}/${maxLength}` }}
        </div>
        <button v-if="clearButton && normalizedValue !== ''" type="button" :class="styles.ClearButton"
          @click="handleClearButtonPress" :disabled="disabled">
          <Text as="span" visually-hidden>
            {{ i18n.translate('Polaris.Common.clear') }}
          </Text>
          <Icon :source="CircleCancelMinor" tone="base" />
        </button>
        <Spinner v-if="isNumericType && step !== 0 && !disabled && !readOnly" @click="handleClickChild"
          @change="handleNumberChange" @mousedown="handleButtonPress" @mouseup="handleButtonRelease" ref="spinnerRef"
          @focus="handleOnFocus" />
        <div :class="classNames(styles.Backdrop, $slots.connectedLeft && styles['Backdrop-connectedLeft'], $slots.connectedRight &&
          styles['Backdrop-connectedRight'],)"></div>
        <Resizer v-if="multiline && inputRef" :contents="normalizedValue || placeholder" v-model:height="currentHeight"
          :minimum-lines="typeof
            multiline === 'number' ? multiline : 1" />
      </div>
    </Connected>
  </Labelled>
</template>
<script setup lang="ts">
import { computed, nextTick, ref, watchEffect, toRef, useSlots, h, shallowRef, cloneVNode, watch, defineComponent } from 'vue'
import type { TextFieldProps } from './TextField'
import Labelled, { helpTextID } from '../Labelled';
import { labelID } from '../Label'
import Resizer from './Resizer';
import Connected from '../Connected';
import Text from '../Text';
import Icon from '../Icon';
import ConditionalWrapper from '../ConditionalWrapper';
import Spinner from './Spinner/Spinner.vue';
import styles from './TextField.module.scss'
import { CircleCancelMinor } from "@ncpl/ncpl-icons"
import { classNames, variationName, isKorean } from "@ncpl-polaris/utils"
import { useI18n, useId } from '../context';
import { useEventListener } from "@vueuse/core"
import { isNil } from 'lodash'

defineOptions({
  name: 'NpTextField',
})
const props = withDefaults(defineProps<TextFieldProps>(), {
  modelValue: '',
  type: 'text',
  focused: undefined,
})
const emit = defineEmits(['focus', 'blur', 'update:model-value', 'compositionstart', 'compositionupdate', 'compositionend', 'input', 'change']);
const slots = useSlots();
const i18n = useI18n();
const inputRef = shallowRef<HTMLInputElement>();
const spinnerRef = ref();
const suffixRef = ref();
const prefixRef = ref();
const verticalContentRef = ref();
const focus = ref<boolean>(props.focused)
const inputId = useId(toRef(props, 'id'));
const isComposing = ref(false);


const normalizedValue = computed(() => {
  let value = props.suggestion ? props.suggestion : props.modelValue;
  return isNil(value) ? '' : String(value);
})
const isNumericType = computed(() => props.type === 'number' || props.type === 'integer')
const currentHeight = ref(null);

const characterCount = computed(() => {
  return normalizedValue.value.length;
})

const prefixComponent = computed(() => {
  return slots.prefix ? slots.prefix : (props.prefix ? () => [props.prefix] : null);
})

const suffixComponent = computed(() => {
  return slots.suffix ? slots.suffix : (props.suffix ? () => [props.suffix] : null);
})

const characterCountLabel = computed(() => {
  return props.maxLength
    ? i18n.value.translate('Polaris.TextField.characterCountWithMaxLength', {
      count: characterCount.value,
      limit: props.maxLength,
    })
    : i18n.value.translate('Polaris.TextField.characterCount', {
      count: characterCount.value,
    });
})

const describedBy = computed(() => {
  let data: string[] = [];
  if (props.error) {
    data.push(`${inputId.value}Error`);
  }
  if (slots.helpText) {
    data.push(helpTextID(inputId.value));
  }
  if (props.showCharacterCount) {
    data.push(`${inputId.value}-CharacterCounter`);
  }
  return data;
})

const labelledBy = computed(() => {
  let data: string[] = [], id = inputId.value;

  if (prefixComponent.value) {
    data.push(`${id}-Prefix`);
  }

  if (suffixComponent.value) {
    data.push(`${id}-Suffix`);
  }

  if (slots.verticalContent) {
    data.push(`${id}-VerticalContent`);
  }

  data.unshift(labelID(id));

  return data;

})

const setNativeInputValue = () => {
  if (inputRef.value) {
    const input = inputRef.value
    const formatterValue = normalizedValue.value
    if (!input || input.value === formatterValue) return
    input.value = formatterValue
  }
}



const handleClick = (event: MouseEvent | TouchEvent) => {
  const target = event.target as HTMLElement;

  // For TextFields used with Combobox, focus needs to be set again even
  // if the TextField is already focused to trigger the logic to open the
  // Combobox activator
  const inputRefRole = inputRef.value?.getAttribute('role');
  if (target === inputRef.value && inputRefRole === 'combobox') {
    inputRef.value?.focus();
    handleOnFocus(event as FocusEvent);
    return;
  }

  if (
    isPrefixOrSuffix(target) ||
    isVerticalContent(target) ||
    isInput(target) ||
    isSpinner(target) ||
    focus.value
  ) {
    return;
  }

  inputRef.value?.focus();
}

const handleClickChild = (event: MouseEvent | TouchEvent) => {
  let target = event.target as Element;

  if (!isSpinner(target) && !isInput(target)) {
    event.stopPropagation();
  }

  if (
    isPrefixOrSuffix(target) ||
    isVerticalContent(target) ||
    isVerticalContent(target) ||
    focus.value
  ) {
    return;
  }

  focus.value = true;
  inputRef.value?.focus();
}
const handleClearButtonPress = () => { }
const handleNumberChange = (steps: number, stepAmount?: number) => {

  const { step, modelValue, max, min } = props;


  const dpl = (num: number) => (num.toString().split('.')[1] || []).length;

  stepAmount = stepAmount ? stepAmount : (step || 1);

  const numericValue = modelValue ? parseFloat(modelValue) : 0;
  if (isNaN(numericValue)) {
    return;
  }

  const normalizedMax = max != null ? max : Infinity;
  const normalizedMin = min != null ? min : -Infinity;

  const decimalPlaces =
    props.type === 'integer' ? 0 : Math.max(dpl(numericValue), dpl(stepAmount));

  const newValue = Math.min(
    Number(normalizedMax),
    Math.max(numericValue + steps * stepAmount, Number(normalizedMin)),
  );

  emit('update:model-value', String(newValue.toFixed(decimalPlaces)));

}

let buttonPressTimer: any;
const handleButtonPress = (onChange: () => void) => {
  const minInterval = 50;
  const decrementBy = 10;
  let interval = 200;

  const onChangeInterval = () => {
    if (interval > minInterval) interval -= decrementBy;
    onChange();
    buttonPressTimer = window.setTimeout(
      onChangeInterval,
      interval,
    );
  };

  buttonPressTimer = window.setTimeout(onChangeInterval, interval);

  document.addEventListener('mouseup', handleButtonRelease, {
    once: true,
  });
}
const handleButtonRelease = () => {
  clearTimeout(buttonPressTimer);
}
const handleKeyPress = () => { }
const handleKeyDown = () => { }


const handleCompositionStart = (event: CompositionEvent) => {
  emit('compositionstart', event)
  isComposing.value = true
}

const handleCompositionUpdate = (event: CompositionEvent) => {
  emit('compositionupdate', event)
  const text = (event.target as HTMLInputElement)?.value
  const lastCharacter = text[text.length - 1] || ''
  isComposing.value = !isKorean(lastCharacter)
}

const handleCompositionEnd = (event: CompositionEvent) => {
  emit('compositionend', event)
  if (isComposing.value) {
    isComposing.value = false
    handleInput(event)
  }
}

const handleChange = (event: Event) => {
  emit('change', event)
}
const handleInput = async (event: Event) => {
  //recordCursor()
  emit('update:model-value', (event.target as HTMLInputElement).value)
  emit('input', event)

  await nextTick()

  setNativeInputValue()
  //setCursor()

}

const handleOnBlur = (event: FocusEvent) => {
  focus.value = false;
  emit('blur', event)
}

const handleOnFocus = (event: FocusEvent) => {
  focus.value = true;

  if (props.selectTextOnFocus && !props.suggestion) {
    inputRef.value?.select();
  }

  emit('focus', event)
}

const VerticalContentComponent = defineComponent({
  setup() {
    return () => {

      const verticalContent = slots.verticalContent?.();
      const inputComponent = h(props.multiline ? 'textarea' : 'input', inputAttributes.value);

      return verticalContent ?
        h('div', {
          class: styles.VerticalContent,
          id: "`${inputId}-VerticalContent`",
          ref: verticalContentRef.value,
          onClick: handleClickChild
        },
          [...verticalContent, inputComponent]
        ) : inputComponent;
    }
  }
})


const inputAttributes = computed(() => {
  const {
    placeholder,
    disabled,
    readOnly,
    autoFocus,
    multiline,
    error,
    name,
    role,
    type,
    step,
    autoComplete,
    max,
    maxLength,
    maxHeight,
    min,
    minLength,
    pattern,
    inputMode,
    spellCheck,
    ariaOwns,
    ariaControls,
    ariaExpanded,
    ariaActiveDescendant,
    ariaAutocomplete,
    clearButton,
    align,
    requiredIndicator,
    monospaced,
    suggestion,
  } = props;

  const style = multiline && currentHeight.value ? { height: `${currentHeight.value}px`, maxHeight: maxHeight ? `${maxHeight}px` : undefined } : undefined;

  const attributes = {
    ref: inputRef,
    name,
    id: inputId.value,
    disabled,
    readOnly,
    role,
    autoFocus,
    placeholder,
    style,
    autoComplete,
    className: classNames(
      styles.Input,
      align && styles[variationName('Input-align', align)],
      suffixComponent.value && styles['Input-suffixed'],
      clearButton && styles['Input-hasClearButton'],
      monospaced && styles.monospaced,
      suggestion && styles.suggestion,
    ),
    min,
    max,
    step,
    minLength,
    maxLength,
    spellCheck,
    pattern,
    inputMode,
    type: type === 'currency' ? 'text' : type,
    rows: getRows(multiline),
    'aria-describedby': describedBy.value.length ? describedBy.value.join(' ') : undefined,
    'aria-labelledby': labelledBy.value.join(' '),
    'aria-invalid': Boolean(error),
    'aria-owns': ariaOwns,
    'aria-activedescendant': ariaActiveDescendant,
    'aria-autocomplete': ariaAutocomplete,
    'aria-controls': ariaControls,
    'aria-expanded': ariaExpanded,
    'aria-required': requiredIndicator,
    ...normalizeAriaMultiline(multiline),
    onClick: handleClickChild,
    onKeypress: handleKeyPress,
    onKeydown: handleKeyDown,
    onChange: handleChange,
    onInput: handleInput,
    onFocus: handleOnFocus,
    onBlur: handleOnBlur,
    onCompositionstart: handleCompositionStart,
    onCompositionupdate: handleCompositionUpdate,
    onCompositionend: handleCompositionEnd,
  }
  return attributes;
})

watchEffect(() => {
  setNativeInputValue()
}, { flush: 'post' })

watch(() => props.focused, (newValue, oldValue) => {
  if (newValue != undefined && newValue != oldValue) {
    return props.focused ? inputRef.value?.focus() : inputRef.value?.blur();
  }
}, { flush: 'post' });

useEventListener(inputRef, 'wheel', (event: WheelEvent) => {
  if (document.activeElement === event.target && isNumericType.value) {
    event.stopPropagation();
  }
}, { passive: true });



function getRows(multiline?: boolean | number) {
  if (!multiline) return undefined;

  return typeof multiline === 'number' ? multiline : 1;
}

function normalizeAriaMultiline(multiline?: boolean | number) {
  if (!multiline) return undefined;

  return Boolean(multiline) || (typeof multiline === 'number' && multiline > 0)
    ? { 'aria-multiline': true }
    : undefined;
}

function isInput(target: HTMLElement | EventTarget) {
  return (
    target instanceof HTMLElement &&
    inputRef.value &&
    (inputRef.value.contains(target) ||
      inputRef.value.contains(document.activeElement))
  );
}

function isPrefixOrSuffix(target: Element | EventTarget) {
  return (
    target instanceof Element &&
    ((prefixRef.value && prefixRef.value.contains(target)) ||
      (suffixRef.value && suffixRef.value.contains(target)))
  );
}

function isSpinner(target: Element | EventTarget) {
  return (
    target instanceof Element &&
    spinnerRef.value?.$el &&
    spinnerRef.value?.$el.contains(target)
  );
}

function isVerticalContent(target: Element | EventTarget) {
  return (
    target instanceof Element &&
    verticalContentRef.value &&
    (verticalContentRef.value.contains(target) ||
      verticalContentRef.value.contains(document.activeElement))
  );
}

</script>
