<template>
  <Modal :open="open" @close="onClose" :title="i18n.translate('Polaris.Tabs.RenameModal.title')" :primary-action="{
    content: i18n.translate('Polaris.Tabs.RenameModal.create'),
    onAction: handlePrimaryAction,
    disabled: Boolean(isPrimaryActionDisabled),
  }" :secondary-actions="[
  {
    content: i18n.translate('Polaris.Tabs.RenameModal.cancel'),
    onAction: handleSecondaryAction,
  },
]" instant>
    <ModalSection>
      <Form @submit="handlePrimaryAction">
        <FormLayout>
          <div ref="container">
            <TextField :label="i18n.translate('Polaris.Tabs.RenameModal.label')" v-model="value" auto-complete="off"
              :help-text="helpText" :max-length="40" show-character-count :error="hasSameNameError
                ? i18n.translate(
                  'Polaris.Tabs.RenameModal.errors.sameName',
                  { name: value },
                )
                : undefined
                " />
          </div>
        </FormLayout>
      </Form>
    </ModalSection>
  </Modal>
</template>
<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import type { TabsTabRenameModalProps } from './RenameModal'

import Modal from '../../../Modal';
import ModalSection from '../../../Modal/Section';
import Form from '../../../Form';
import FormLayout from '../../../FormLayout';
import TextField from '../../../TextField';
import { useI18n } from '../../../context';
import { focusFirstFocusableNode } from "../../../../utils/focus"

defineOptions({
  name: 'NpTabsTabRenameModal',
})
const props = defineProps<TabsTabRenameModalProps>()
const emit = defineEmits(['update:open', 'close', 'clickPrimaryAction', 'clickSecondaryAction'])

const i18n = useI18n();
const value = ref(props.name);
const container = ref();

const hasSameNameError = computed(() => props.viewNames?.some(
  (viewName) => viewName.trim().toLowerCase() === value.value.trim().toLowerCase(),
));

const isPrimaryActionDisabled = computed(() => props.isModalLoading || hasSameNameError || value.value === props.name || !value);

const onClose = () => {
  emit('update:open', false)
  emit('close')
}

const handlePrimaryAction = () => {
  if (isPrimaryActionDisabled.value) {
    return;
  }
  emit('clickPrimaryAction', value.value)
  value.value = ''
  onClose()
}
const handleSecondaryAction = () => {
  emit('clickSecondaryAction');
  value.value = props.name;
  onClose()
}

watchEffect(() => {
  if (!container.value) return;
  if (props.open) {
    focusFirstFocusableNode(container.value);
  }
}, { flush: 'post' });

watchEffect(() => {
  if (props.open) {
    value.value = props.name;
  }
}, { flush: 'post' })

</script>
