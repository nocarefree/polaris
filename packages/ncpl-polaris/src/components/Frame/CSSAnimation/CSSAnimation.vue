<template>
  <div
    :class="wrapperClassName"
    ref="node"
    @transitionEnd="handleTransitionEnd"
  >
    <slot v-if="showContent"></slot>
  </div>
</template>
<script setup lang="ts">
  import {computed, ref, onMounted, watch } from "vue";
  import {classNames, variationName } from "@ncpl-polaris/utils";
  import styles from "./CSSAnimation.module.scss";

  enum TransitionStatus {
    Entering = 'entering',
    Entered = 'entered',
    Exiting = 'exiting',
    Exited = 'exited',
    }


  const props = defineProps({
      class: { type: String, required: true },
      type: { type: String, required: true },
      in:{ type: Boolean, required: true },
  })

  const node = ref(null);
  const transitionStatus = ref<TransitionStatus | undefined>();


  onMounted(()=>{
    watch(()=>props.in, ()=>{
        transitionStatus.value = props.in ? TransitionStatus.Entering : TransitionStatus.Exiting
    })
  })

  const showContent = computed(()=>{
    return !(transitionStatus.value === TransitionStatus.Exited && !props.in);
  });

  const wrapperClassName = computed(()=>{
      return classNames(
          props.class,
          styles[variationName('start', props.type)],
          props.in && styles[variationName('end', props.type)],
      )
    });
    const handleTransitionEnd = ()=>{
        if(transitionStatus.value === TransitionStatus.Exiting){
            transitionStatus.value = TransitionStatus.Exited
        }
    }
</script>
