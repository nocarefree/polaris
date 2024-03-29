<template>
  <span :class="className">
    <Text as="span" visually-hidden>
      {{ accessibilityLabel }}
    </Text>
  </span>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import type { PipProps } from './Pip'
import Text from '../../Text';
import styles from './Pip.module.scss';
import { classNames, variationName } from '../../../utils';
import { getDefaultAccessibilityLabel } from '../utils';
import { useI18n } from "../../context"

defineOptions({
  name: 'NpPip',
})
const props = defineProps<PipProps>()

const i18n = useI18n();
const className = computed(() => classNames(
  styles.Pip,
  props.tone && styles[variationName('tone', props.tone)],
  props.progress && styles[variationName('progress', props.progress)],
));

const accessibilityLabel = computed(() =>
  props.accessibilityLabelOverride
    ? props.accessibilityLabelOverride
    : getDefaultAccessibilityLabel(i18n.value, props.progress, props.tone)
)

</script>
