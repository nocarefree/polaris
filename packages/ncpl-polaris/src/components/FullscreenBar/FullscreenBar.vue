<template>
  <div :class="styles.FullscreenBar">
    <button :class="styles.BackAction" @click="$emit('action')"
      :aria-label="i18n.translate('Polaris.FullscreenBar.accessibilityLabel')">
      <Icon :source="ExitMajor" />
      <Text as="span" variant="bodyLg">
        {{ i18n.translate('Polaris.FullscreenBar.back') }}
      </Text>
    </button>
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import type { FullscreenBarProps } from './FullscreenBar';
import styles from './FullscreenBar.module.scss';
import Text from "../Text";
import Icon from "../Icon";
import { useI18n } from "../context";
import { ExitMajor } from "@ncpl/ncpl-icons";

defineOptions({
  name: 'NpFullscreenBar',
})
defineProps<FullscreenBarProps>()
defineEmits(['action']);

const i18n = useI18n();
</script>
