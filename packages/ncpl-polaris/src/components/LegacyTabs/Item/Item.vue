<template>
  <li>
    <UnstyledLink v-if="url" ref="focusedNode" @click="(e:any) => $emit('click', e)" v-bind="sharedProps" :url="url">
      <slot></slot>
    </UnstyledLink>
    <button ref="focusedNode" @click="e => $emit('click', e)" v-bind="sharedProps" type="button">
      <slot></slot>
    </button>
  </li>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import UnstyledLink from "../../UnstyledLink"
import { classNames } from "../../../utils"
import styles from '../LegacyTabs.module.scss';


const props = defineProps<{
  id: string;
  focused: boolean;
  panelId?: string;
  url?: string;
  accessibilityLabel?: string;
}>()

const focusedNode = ref<HTMLElement>();


const sharedProps = computed(() => {
  const { id, panelId, accessibilityLabel } = props;

  return {
    id,
    class: classNames(styles.Item),
    'aria-controls': panelId,
    'aria-selected': false,
    'aria-label': accessibilityLabel,
  }
})
</script>
