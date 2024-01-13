<template>
  <Transition :css="false" :duration="duration" appear @before-enter="onBeforeEnter" @after-enter="onAfterEnter"
    @before-leave="onBeforeLeave" @after-leave="onAfterLeave">
    <slot :state="state"></slot>
  </Transition>
</template>
<script setup lang="ts">
import { Transition, ref, computed } from 'vue'
import type { TransitionProps } from './Transition'

defineOptions({
  name: 'NpTransition',
})
const props = defineProps<TransitionProps>();
const state = ref<"entering" | "entered" | "exiting" | "exited">("entering")

const duration = computed(() => {
  return typeof props.timeout == 'number' ? props.timeout : {
    enter: props.timeout?.enter || 0,
    leave: props.timeout?.exit || 0
  }
})

const onBeforeEnter = (el: Element) => {
  state.value = 'entering'
};

const onAfterEnter = (el: Element) => {
  state.value = 'entered'
}
const onBeforeLeave = (el: Element) => {
  state.value = 'exiting'
}
const onAfterLeave = (el: Element) => {
  state.value = 'exited'
}
</script>
