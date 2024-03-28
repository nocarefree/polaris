<template>
  <template v-if="attrs.url">
    <a v-if="attrs.disabled" v-bind="commonProps">
      <slot></slot>
    </a>
    <NpUnstyledLink v-else v-bind="interactiveProps">
      <slot></slot>
    </NpUnstyledLink>
  </template>

  <button v-else v-bind="buttonProps">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { useAttrs, computed } from "vue";
import NpUnstyledLink from "../UnstyledLink";
import type { AttrsType } from "../types"

defineOptions({
  name: 'NpUnstyledButton',
  inheritAttrs: false
});

//const handleMouseUpByBlurring = (event:MouseEvent) => event?.currentTarget?.blur();

const attrs = useAttrs();

const commonProps = computed(() => {
  return {
    id: attrs.id,
    class: attrs.class,
    'aria-label': attrs.accessibilityLabel
  } as AttrsType;
});

const rest = computed(() => {
  const {
    id,
    url,
    external,
    target,
    download,
    submit,
    disabled,
    loading,
    pressed,
    accessibilityLabel,
    role,
    ariaControls,
    ariaExpanded,
    ariaDescribedBy,
    ariaChecked,
    onClick,
    onFocus,
    onBlur,
    onKeyDown,
    onKeyPress,
    onKeyUp,
    onMouseEnter,
    onTouchStart,
    ..._rest
  } = attrs;
  return _rest as AttrsType
})

const interactiveProps = computed(() => {

  const {
    url,
    external,
    download,
    target,
    role,
    onClick,
    onFocus,
    onBlur,
    onMouseUp: handleMouseUpByBlurring,
    onMouseEnter,
    onTouchStart
  } = attrs;

  return {
    ...commonProps.value,
    role,
    onClick,
    onFocus,
    onBlur,
    onMouseUp: handleMouseUpByBlurring,
    onMouseEnter,
    onTouchStart,
    url,
    external,
    target,
    download,
    ...rest.value
  } as AttrsType;
})

const buttonProps = computed(() => {
  return {
    ...interactiveProps.value,
    type: attrs.submit ? 'submit' : 'button',
    'aria-disabled': attrs.disabled ? true : void 0,
    'aria-busy': attrs.loading ? true : undefined,
    'aria-controls': attrs.ariaControls,
    'aria-expanded': attrs.ariaExpanded,
    'aria-describedby': attrs.ariaDescribedBy,
    'aria-checked': attrs.ariaChecked,
    'aria-pressed': attrs.pressed,
    tabIndex: attrs.disabled ? -1 : undefined,
    ...rest.value
  } as AttrsType;
});
</script>
