<template>
  <div :id="id" :style="collapsibleStyles" ref="collapsibleContainer" :class="wrapperClassName"
    @transitionend="handleCompleteAnimation" :aria-hidden="!open">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, watch, onMounted, onUpdated } from 'vue'
import { classNames } from "../../utils"
import type { CollapsibleProps } from './Collapsible'
import styles from './Collapsible.module.scss'

type AnimationState = 'idle' | 'measuring' | 'animating';

defineOptions({
  name: 'NpCollapsible',
})



const props = withDefaults(defineProps<CollapsibleProps>(), { transition: true });
const emit = defineEmits(['animationEnd']);


const isOpen = ref(props.open);
const collapsibleContainer = ref<HTMLElement>();
const animationState = ref<AnimationState>('idle');
const height = ref(0);


const wrapperClassName = computed(() => {
  let isFullyClosed = animationState.value === 'idle' && !isOpen.value && !props.open;
  return classNames(
    styles.Collapsible,
    isFullyClosed && styles.isFullyClosed,
    props.expandOnPrint && styles.expandOnPrint,
  );
});


const zeroDurationRegex = /^0(ms|s)$/;
const isTransitionDisabled = computed(() => {
  let transitionProp = props.transition;
  if (typeof transitionProp === 'boolean' || !transitionProp) {
    return !transitionProp;
  }

  const { duration = 0 } = transitionProp;
  if (duration && zeroDurationRegex.test(duration.trim())) {
    return true;
  }
  return false;
})


const collapsibleStyles = computed(() => {
  const transitionStyles = typeof props.transition === 'object' && {
    transitionDuration: props.transition.duration,
    transitionTimingFunction: props.transition.timingFunction,
  };

  let isFullyOpen = animationState.value === 'idle' && props.open && isOpen.value;

  return {
    ...transitionStyles,
    ...{
      maxHeight: isFullyOpen ? 'none' : `${height.value}px`,
      overflow: isFullyOpen ? 'visible' : 'hidden',
    },
  };
});


const startAnimation = () => {
  if (!collapsibleContainer.value) return;

  if (isTransitionDisabled.value) {
    isOpen.value = props.open
    animationState.value = 'idle';

    if (props.open && collapsibleContainer.value) {
      height.value = collapsibleContainer.value.scrollHeight;
    } else {
      height.value = 0;
    }
  } else {
    animationState.value = 'measuring';
  }
}

const handleCompleteAnimation = () => {
  isOpen.value = props.open
  animationState.value = 'idle';
  emit('animationEnd')
}

watch(() => props.open, () => {
  if (animationState.value == 'idle') {
    startAnimation();
  }
})

onUpdated(() => {
  if (!collapsibleContainer.value) return;

  switch (animationState.value) {
    case 'idle':
      break;
    case 'measuring':
      height.value = collapsibleContainer.value.scrollHeight;
      animationState.value = 'animating';
      break;
    case 'animating':
      height.value = props.open ? collapsibleContainer.value.scrollHeight : 0;
  }
});

onMounted(() => {
  if (!props.open || !collapsibleContainer.value) return;
  // If collapsible defaults to open, set an initial height
  height.value = collapsibleContainer.value.scrollHeight;
});

// onUpdated(() => {
//   //height.value = collapsibleContainer.current.scrollHeight;
// });
</script>
