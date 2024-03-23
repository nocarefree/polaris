<template>
  <form :accept-charset="acceptCharset" :action="action" :autocomplete="autoCompleteInputs" :enc-type="encType"
    :method="method" :name="name" :no-validate="noValidate" :target="target" @submit="handleSubmit">
    <Text v-if="implicitSubmit" as="span" visually-hidden>
      <button type="submit" aria-hidden="true" tabindex="-1"> {{ i18n.translate('Polaris.Common.submit') }}</button>
    </Text>
    <slot></slot>
  </form>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import type { FormProps } from './Form'
import Text from "../Text"
import { useI18n } from "../context"

defineOptions({
  name: 'NpForm',
})
const props = withDefaults(defineProps<FormProps>(), {
  implicitSubmit: true,
  method: 'post',
  preventDefault: true,
})
const emit = defineEmits(['submit']);

const i18n = useI18n();

const autoCompleteInputs = computed(() => {
  if (props.autoComplete == null) {
    return props.autoComplete;
  }

  return props.autoComplete ? 'on' : 'off';
})

const handleSubmit = (event: Event) => {
  if (!props.preventDefault) {
    return;
  }

  event.preventDefault();
  emit('submit', event)
}
</script>
