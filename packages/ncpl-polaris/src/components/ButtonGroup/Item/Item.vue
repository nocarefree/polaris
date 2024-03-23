<template>
  <div v-if="button" :class="className" ref="node">
    <component :is="button"></component>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { classNames, useFocus } from "@ncpl-polaris/utils"
import styles from '../ButtonGroup.module.scss'

const props = defineProps<{ button: any }>();
const node = ref<HTMLElement>();

const { focused } = useFocus(node)

const className = computed(() => {
  const { props: buttonProps } = props.button;
  const { plain = false } = buttonProps || {};

  return classNames(
    styles.Item,
    focused.value && styles['Item-focused'],
    plain !== false && styles['Item-plain'],
  );
});

</script>