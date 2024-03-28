<template>
  <div aria-hidden :class="styles.Resizer">
    <div ref="contentNode" :class="styles.DummyInput" v-html="finalContents"></div>
    <div v-if="minimumLines" ref="minimumLinesNode" :class="styles.DummyInput" v-html="contentsForMinimumLines"></div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, computed, nextTick } from 'vue'
import type { TextFieldResizerProps } from './Resizer'
import styles from '../TextField.module.scss'
import { useEventListener } from '@vueuse/core';

defineOptions({
  name: 'NpTextFieldResizer',
})
const props = defineProps<TextFieldResizerProps>()
const emit = defineEmits(['update:height'])
const contentNode = ref();
const minimumLinesNode = ref();

const ENTITIES_TO_REPLACE:{[key:string]:string} = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '\n': '<br>',
  '\r': '',
};

const REPLACE_REGEX = new RegExp(
  `[${Object.keys(ENTITIES_TO_REPLACE).join()}]`,
  'g',
);

function replaceEntity(entity: keyof typeof ENTITIES_TO_REPLACE) {
  return ENTITIES_TO_REPLACE[entity];
}


const finalContents = computed(() => {
  const { contents } = props;
  return contents
    ? `${contents.replace(REPLACE_REGEX, replaceEntity)}<br>`
    : '<br>';
})

const contentsForMinimumLines = computed(() => {
  const { minimumLines = 0 } = props;
  let content = '';

  for (let line = 0; line < minimumLines; line++) {
    content += '<br>';
  }

  return content;
})


const handleHeightCheck = () => {
  nextTick(() => {

    if (!contentNode.value || !minimumLinesNode.value) {
      return;
    }

    const newHeight = Math.max(
      contentNode.value.offsetHeight,
      minimumLinesNode.value.offsetHeight,
    );
    minimumLinesNode.value.offset

    if (newHeight != props.height) {
      emit('update:height', newHeight)
    }
  })
};



watch(finalContents, handleHeightCheck, { flush: 'post' })

useEventListener(window, 'resize', handleHeightCheck);



</script>
