<template>
  <UnstyledButton :class="classNames(
    styles.Button,
    styles.pressable,
    styles[variationName('variant', variant)],
    styles[variationName('size', size)],
    styles[variationName('textAlign', textAlign)],
    fullWidth && styles.fullWidth,
    disclosure && styles.disclosure,
    (icon || $slots.icon) && $slots.default && styles.iconWithText,
    (icon || $slots.icon) && !$slots.default && styles.iconOnly,
    isDisabled && styles.disabled,
    loading && styles.loading,
    pressed && !disabled && !url && styles.pressed,
    removeUnderline && styles.removeUnderline,
    tone && styles[variationName('tone', tone)],
  )" v-bind="shareProps">
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
import { computed } from "vue";
import {
  classNames,
  variationName,
} from "@ncpl-polaris/utils";

import { useI18n } from "../context";



const props = withDefaults(defineProps<ButtonProps>(), {
  size: 'medium',
  textAlign: 'center',
  variant: 'secondary',
})

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
