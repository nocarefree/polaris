<template>
  <div :class="classNames(styles.SecondaryAction, Boolean($attrs.destructive) && styles.destructive,)"
    ref="secondaryActionsRef">
    <Tooltip v-if="helpText" preferred-position="below" content="helpText">
      <Button @click="$emit('action')" v-bind="$attrs">
        <slot></slot>
      </Button>
    </Tooltip>
    <Button v-else @click="$emit('action')" v-bind="$attrs">
      <slot></slot>
    </Button>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { SecondaryActionProps } from './SecondaryAction'
import styles from './SecondaryAction.module.scss'
import Tooltip from "@ncpl-polaris/components/Tooltip"
import Button from "@ncpl-polaris/components/Button"
import { classNames } from '@ncpl-polaris/utils'

defineOptions({
  name: 'NpActionMenuSecondaryAction',
})
defineProps<SecondaryActionProps>()
const emit = defineEmits(['getOffsetWidth', 'action']);
const secondaryActionsRef = ref();

onMounted(() => {
  emit('getOffsetWidth', secondaryActionsRef.value.offsetWidth);
});
</script>
