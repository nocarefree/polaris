<template>
  <UnstyledButton :class="className" :disabled="isDisabled" :loading="loading">
    <span :class="styles.Content">
      <span v-if="loading" :class="styles.Spinner">
        <Spinner size="small" :accessibilityLabel="i18n.translate('Polaris.Button.spinnerAccessibilityLabel')">
        </Spinner>
      </span>
      <span v-if="icon" :class="classNames(styles.Icon, loading && styles.hidden)">
        <Icon :source="loading ? 'placeholder' : icon"></Icon>
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

const props = defineProps<ButtonProps>()
const slots = useSlots();
const i18n = useI18n();

const isDisabled = computed(() => {
  return props.disabled || props.loading;
})

const className = computed(() => {
  const {
    loading,
    icon,
    removeUnderline,
    disabled,
    primary,
    outline,
    destructive,
    plain,
    pressed,
    monochrome,
    size,
    textAlign,
    primarySuccess,
    url,
    connectedDisclosure,
    fullWidth
  } = props;

  return classNames(
    styles.Button,
    primary && styles.primary,
    outline && styles.outline,
    destructive && styles.destructive,
    primary && plain && styles.primaryPlain,
    isDisabled.value && styles.disabled,
    loading && styles.loading,
    plain && !primary && styles.plain,
    pressed && !disabled && !url && styles.pressed,
    monochrome && styles.monochrome,
    size && size !== DEFAULT_SIZE && styles[variationName("size", size)],
    textAlign && styles[variationName("textAlign", textAlign)],
    fullWidth && styles.fullWidth,
    icon && slots.default == null && styles.iconOnly,
    connectedDisclosure && styles.connectedDisclosure,
    removeUnderline && styles.removeUnderline,
    primarySuccess && styles.primary,
    primarySuccess && styles.success
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
