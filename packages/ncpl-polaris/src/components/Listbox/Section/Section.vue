<template>
  <li role="presentation" v-bind="listboxSectionDataSelector.props">
    <template v-if="title">{{ title }}</template>
    <slot v-else name="title"></slot>
    <ul role="group" :aria-labelledby="id" :class="classNames(styles.SectionGroup, !divider && styles.noDivider,)">
      <slot></slot>
    </ul>
  </li>
</template>
<script setup lang="ts">
import { type Component } from 'vue'
import styles from './Section.module.scss'
import { listboxSectionDataSelector } from './selectors';
import { classNames } from "@ncpl-polaris/utils"
import { useId } from "../../context";
import { sectionContext } from "./Section"

defineOptions({
  name: 'NpListboxSection',
})
defineProps<{ divider?: boolean; title?: string | Component; }>();

const id = useId();

sectionContext.provide(id);
</script>
