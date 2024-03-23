<template>
  <Modal :title="i18n.translate('Polaris.DiscardConfirmationModal.title')" :open="open" @close=" $emit('cancel')"
    :primary-action="{
      content: i18n.translate(
        'Polaris.DiscardConfirmationModal.primaryAction',
      ),
      destructive: true,
      onAction: () => $emit('discard'),
    }" :secondary-actions="[
  {
    content: i18n.translate(
      'Polaris.DiscardConfirmationModal.secondaryAction',
    ),
    onAction: () => $emit('cancel'),
  },
]" sectioned>
    {{ i18n.translate('Polaris.DiscardConfirmationModal.message') }}
  </Modal>
</template>

<script setup lang="ts">
import { useI18n } from '../../../context';
import Modal from '../../../Modal';

defineProps<{
  open: boolean;
}>();
defineEmits(['discard', 'cancel'])
const i18n = useI18n();

</script>