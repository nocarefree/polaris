<template>
  <button v-if="clickable" type="button" :disabled="disabled" :class="className" @click="$emit('click')">
    <slot></slot>
  </button>
  <span v-else :class="className" :aria-disabled="disabled">
    <a v-if="url && !disabled" :class="classNames(styles.Link, segmented && styles.segmented)" :href="url">
      <span :title="tagTitle" :class="styles.LinkText">
        <slot></slot>
      </span>
    </a>

    <span v-else :title="tagTitle" :class="styles.TagText">
      <slot></slot>
    </span>
    <button v-if="removable" type="button"
      :aria-label="i18n.translate('Polaris.Tag.ariaLabel', { children: tagTitle || '' })" :class="classNames(styles.Button, segmented &&
        styles.segmented)" @click="$emit('remove')" @mouseup="handleMouseUpByBlurring" :disabled="disabled">
      <Icon :source="XSmallIcon" />
    </button>
  </span>
</template>
<script setup lang="ts">
import { computed, Text, useSlots } from 'vue'
import type { TagProps } from './Tag';
import styles from './Tag.module.scss';
import { classNames } from "../../utils";
import { handleMouseUpByBlurring } from '../../utils/focus';
import { XSmallIcon } from "@ncpl/ncpl-icons";
import { useI18n } from "../context";
import Icon from "../Icon";

defineOptions({
  name: 'NpTag',
})

const props = defineProps<TagProps>()
defineEmits(['click', 'remove']);

const i18n = useI18n();

const segmented = computed(() => props.removable && props.url);
const className = computed(() => classNames(
  styles.Tag,
  props.disabled && styles.disabled,
  props.clickable && styles.clickable,
  props.removable && styles.removable,
  props.url && !props.disabled && styles.linkable,
  segmented.value && styles.segmented,
));

const slots = useSlots();
const tagTitle = computed(() => {
  let label = props.accessibilityLabel;
  if (label) {
    return label;
  }

  if (slots.default?.()[0].type == Text) {
    return slots.default?.()[0].children as string;
  }

  return undefined;
})

</script>
