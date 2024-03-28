<template>
  <Modal :open="open" @close="onClose" :title="i18n.translate('Polaris.Tabs.DuplicateModal.title')" :primary-action="{
    content: i18n.translate('Polaris.Tabs.DuplicateModal.create'),
    onAction: handlePrimaryAction,
    disabled: Boolean(isPrimaryActionDisabled),
  }" :secondaryActions="[
  {
    content: i18n.translate('Polaris.Tabs.DuplicateModal.cancel'),
    onAction: handleSecondaryAction,
  },
]" instant>
    <ModalSection>
      <Form @submit="handlePrimaryAction">
        <FormLayout>
          <div ref="container">
            <TextField :label="i18n.translate('Polaris.Tabs.DuplicateModal.label')" v-model="value" auto-complete="off"
              :help-text="helpText" :max-length="MAX_VIEW_NAME_LENGTH" show-character-count :error="hasSameNameError
                ? i18n.translate(
                  'Polaris.Tabs.DuplicateModal.errors.sameName',
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
import type { TabsTabDuplicateModalProps } from './DuplicateModal'

import Modal from '../../../Modal';
import ModalSection from '../../../Modal/Section';
import Form from '../../../Form';
import FormLayout from '../../../FormLayout';
import TextField from '../../../TextField';
import { useI18n } from '../../../context';
import { focusFirstFocusableNode } from "../../../../utils/focus"

const MAX_VIEW_NAME_LENGTH = 40;

defineOptions({
  name: 'NpTabsTabDuplicateModal',
})

const emit = defineEmits(['update:open', 'close', 'clickPrimaryAction', 'clickSecondaryAction'])
const props = defineProps<TabsTabDuplicateModalProps>()

const i18n = useI18n();
const value = ref(props.name);
const container = ref();

const hasSameNameError = computed(() => props.viewNames?.some(
  (viewName) => viewName.trim().toLowerCase() === value.value.trim().toLowerCase(),
));

const isPrimaryActionDisabled = computed(() => props.isModalLoading ||
  hasSameNameError.value ||
  !value.value ||
  value.value.length > MAX_VIEW_NAME_LENGTH
);

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
    value.value = props.name.slice(0, MAX_VIEW_NAME_LENGTH);
  }
}, { flush: 'post' })

</script>
