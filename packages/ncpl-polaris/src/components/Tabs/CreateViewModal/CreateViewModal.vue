<template>
  <Modal :activator="activator" :open="open" @close="onClose"
    :title="i18n.translate('Polaris.Tabs.CreateViewModal.title')" :primary-action="{
      content: i18n.translate('Polaris.Tabs.CreateViewModal.create'),
      onAction: handlePrimaryAction,
      disabled: isPrimaryActionDisabled,
    }" :secondary-actions="[
  {
    content: i18n.translate('Polaris.Tabs.CreateViewModal.cancel'),
    onAction: handleSecondaryAction,
  },
]">
    <ModalSection>
      <Form @submit="handlePrimaryAction">
        <FormLayout>
          <div ref="container">
            <TextField :label="i18n.translate('Polaris.Tabs.CreateViewModal.label')" v-model="value" auto-complete="off"
              :max-length="MAX_VIEW_NAME_LENGTH" show-character-count
              :error="hasSameNameError ? (i18n.translate('Polaris.Tabs.CreateViewModal.errors.sameName', { name: value }) as string) : undefined" />
          </div>
        </FormLayout>
      </Form>
    </ModalSection>
  </Modal>
</template>
<script setup lang="ts">
import { ref, computed, watchEffect, onMounted } from 'vue'
import type { TabsCreateViewModalProps } from "./CreateViewModal"
import { useIsTouchDevice } from "@ncpl-polaris/utils"
import Modal from '../../Modal';
import ModalSection from '../../Modal/Section';
import Form from '../../Form';
import FormLayout from '../../FormLayout';
import TextField from '../../TextField';
import { useI18n } from '../../context';
import { focusFirstFocusableNode } from "@ncpl-polaris/utils/focus"


const MAX_VIEW_NAME_LENGTH = 40;

defineOptions({
  name: 'NpTabsTabDuplicateModal',
})

const emit = defineEmits(['update:open', 'close', 'clickSecondaryAction', 'clickPrimaryAction'])
const props = defineProps<TabsCreateViewModalProps>()
const isTouchDevice = useIsTouchDevice();

const i18n = useI18n();
const value = ref('');
const container = ref();
const loading = ref(false);

const hasSameNameError = computed(() => props.viewNames?.some(
  (viewName) => viewName.trim().toLowerCase() === value.value.trim().toLowerCase(),
));

const isPrimaryActionDisabled = computed(() => !value.value ||
  hasSameNameError.value ||
  loading.value ||
  value.value.length > MAX_VIEW_NAME_LENGTH);

const onClose = () => {
  emit('update:open', false);
  emit('close');
}

const handlePrimaryAction = () => {
  if (hasSameNameError.value || isPrimaryActionDisabled.value) {
    return;
  }
  loading.value = true;
  emit('clickPrimaryAction', value, () => {
    loading.value = false;
    value.value = '';
    onClose();
  });
}
const handleSecondaryAction = () => {
  emit('clickSecondaryAction');
  value.value = '';
  onClose();
}

let timeout: any = null;
watchEffect(() => {
  if (!container.value || isTouchDevice.value) return;
  if (props.open) {
    focusFirstFocusableNode(container.value);
    timeout = setTimeout(() => {
      if (!container.value) return;
      focusFirstFocusableNode(container.value);
    }, 50);
  }
}, { flush: 'post' });

onMounted(() => {
  clearTimeout(timeout);
})
</script>
