<template>
  <transition :css="false" v-bind="fadeUpClasses" :duration="parseInt(theme.motion['motion-duration-200'], 10)">
    <div v-if="Boolean(open)" :class="styles.Container" data-polaris-layer data-polaris-overlay ref="containerNode">
      <TrapFocus>
        <div role="dialog" aria-modal :aria-label="labelledBy" :aria-labelledby="labelledBy" tabindex="-1"
          :class="styles.Dialog">
          <div :class="classNames(
            styles.Modal,
            small && styles.sizeSmall,
            large && styles.sizeLarge,
            limitHeight && styles.limitHeight,
            fullScreen && styles.fullScreen,
          )">
            <slot></slot>
          </div>
        </div>
      </TrapFocus>
    </div>
  </transition>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import TrapFocus from '../../TrapFocus';
import { useTheme } from '../../context';
import type { DialogProps } from './Dialog'
import styles from './Dialog.module.scss'
import { classNames } from '../../../utils';
import { Key } from '../../types';
import { useEventListener } from '@vueuse/core';


defineOptions({
  name: 'NpModalDialog',
})

const emit = defineEmits(['closing'])
defineProps<DialogProps>();

const containerNode = ref();
const theme = useTheme()


const fadeUpClasses = computed(() => {
  return {
    enterFromClass: classNames(styles.animateFadeUp, styles.entering),
    enterActiveClass: classNames(styles.animateFadeUp, styles.entered),
    leaveFromClass: classNames(styles.animateFadeUp, styles.exiting),
    leaveActiveClass: classNames(styles.animateFadeUp, styles.exited),
  }
});

useEventListener(window, 'keydown', (e) => {
  if (e.keyCode == Key.Escape) {
    emit('closing', true)
  }
})

useEventListener(window, 'keyup', (e) => {
  if (e.keyCode == Key.Escape) {
    emit('closing', false)
  }
})

</script>
