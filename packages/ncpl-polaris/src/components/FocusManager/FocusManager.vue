<template>
  <slot></slot>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { focusManagerContext } from '../context'

defineOptions({
  name: 'NpFocusManager',
})

const trapFocusList = ref<string[]>([]);

const add = (id: string) => {
  console.log('FocusManager', id)
  trapFocusList.value = [...trapFocusList.value, id];
}
const remove = (id: string) => {
  let removed = true;

  const clone = [...trapFocusList.value];
  const index = clone.indexOf(id);
  if (index === -1) {
    removed = false;
  } else {
    clone.splice(index, 1);
    trapFocusList.value = clone;
  }

  return removed;
};

focusManagerContext.provide({
  trapFocusList,
  add,
  remove,
})

</script>
