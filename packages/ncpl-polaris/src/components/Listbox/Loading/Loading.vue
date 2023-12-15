<template>
  <li :class="styles.ListItem" role="presentation">
    <slot v-if="$slots.default"></slot>
    <div v-else :class="styles.Loading">
      <Spinner size="small" :accessibility-label="accessibilityLabel" />
    </div>
  </li>
</template>
<script setup lang="ts">
import { watchEffect, onUnmounted } from 'vue'
import type { ListboxLoadingProps } from './Loading';
import styles from './Loading.module.scss';
import Spinner from "../../Spinner";
import { useListbox } from "../Listbox"

defineOptions({
  name: 'NpListboxLoading',
})
const props = defineProps<ListboxLoadingProps>()

const { setLoading } = useListbox();

watchEffect(() => {
  setLoading(props.accessibilityLabel);
})

onUnmounted(() => {
  setLoading(undefined)
})
</script>
