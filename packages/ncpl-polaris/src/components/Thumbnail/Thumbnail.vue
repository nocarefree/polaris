<template>
  <span :class="classNames(
    styles.Thumbnail,
    size && styles[variationName('size', size)],
    transparent && styles.transparent,
  )">
    <Image v-if="(typeof source == 'string')" :alt="alt" :source="source" />
    <Icon v-else :accessibility-label="alt" :source="source" />
  </span>
</template>
<script setup lang="ts">
import type { ThumbnailProps } from './Thumbnail';
import styles from './Thumbnail.module.scss';
import Image from "../Image";
import Icon from "../Icon";
import { classNames, variationName } from "@ncpl-polaris/utils"

defineOptions({
  name: 'NpThumbnail',
})
withDefaults(defineProps<ThumbnailProps>(), { size: 'medium' });
</script>
