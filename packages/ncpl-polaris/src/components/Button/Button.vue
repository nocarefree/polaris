<template>
  <UnstyledButton :class="className" v-bind="shareProps">
    <span :class="styles.Content">
      <span v-if="loading" :class="styles.Spinner">
        <Spinner size="small" :accessibility-label="i18n.translate('Polaris.Button.spinnerAccessibilityLabel')" />
      </span>
      <span v-if="icon || $slots.icon" :class="classNames(styles.Icon, loading && styles.hidden)">
        <Icon v-if="icon" :source="loading ? 'placeholder' : icon"></Icon>
        <slot v-else name="icon"></slot>
      </span>

      <span v-if="$slots.default" :class="classNames(styles.Text, removeUnderline && styles.removeUnderline)"
        :key="disabled ? 'text-disabled' : 'text'">
        <slot></slot>
      </span>
      <template v-if="disclosure">
        <span :class="styles.Icon">
          <div :class="classNames(styles.DisclosureIcon, loading && styles.hidden)">
            <Icon :source="disclosureIconSource"></Icon>
          </div>
        </span>
      </template>
    </span>
  </UnstyledButton>
</template>

<script setup lang="ts">
import type { ButtonProps } from "./Button";
import Spinner from "@ncpl-polaris/components/Spinner"
import Icon from "@ncpl-polaris/components/Icon"
import UnstyledButton from "@ncpl-polaris/components/UnstyledButton"
import { SelectMinor, CaretDownMinor, CaretUpMinor } from "@ncpl/ncpl-icons";

import styles from "./Button.module.scss";
import { computed, useSlots } from "vue";
import {
  classNames,
  variationName,
} from "@ncpl-polaris/utils";

import { useI18n } from "../context";

const DEFAULT_SIZE = "medium";


const props = withDefaults(defineProps<ButtonProps>(), {
  size: DEFAULT_SIZE,
})

const slots = useSlots();
const i18n = useI18n();

const isDisabled = computed(() => {
  return props.disabled || props.loading;
})

const shareProps = computed(() => {
  const { size, textAlign, fullWidth, removeUnderline, variant, disclosure, tone, icon, ...reset } = props;

  return {
    ...reset
  }
})

const className = computed(() => {
  const {
    loading,
    icon,
    removeUnderline,
    disabled,
    pressed,
    size,
    textAlign,
    url,
    fullWidth,
    variant,
    tone
  } = props;

  return classNames(
    styles.Button,
    variant === 'primary' && styles.primary,
    variant === 'plain' && styles.plain,
    variant === 'tertiary' && styles.tertiary,
    variant === 'monochromePlain' && styles.monochrome,
    variant === 'monochromePlain' && styles.plain,
    tone === 'critical' && styles.critical,
    tone === 'success' && styles.success,
    isDisabled.value && styles.disabled,
    loading && styles.loading,
    pressed && !disabled && !url && styles.pressed,
    size && size !== DEFAULT_SIZE && styles[variationName('size', size)],
    textAlign && styles[variationName('textAlign', textAlign)],
    fullWidth && styles.fullWidth,
    (icon || slots.icon) && slots.default == null && styles.iconOnly,
    removeUnderline && styles.removeUnderline,
  )
});
const disclosureIconSource = computed(() => {
  if (props.loading) {
    return "placeholder";
  }
  if (props.disclosure === "select") {
    return SelectMinor;
  }

  return props.disclosure === "up" ? CaretUpMinor : CaretDownMinor;
})
</script>
