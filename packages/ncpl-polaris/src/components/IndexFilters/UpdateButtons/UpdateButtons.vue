<template>
  <ConditionalWrapper :condition="Boolean(primaryAction)">
    <template #wrapper="{ children }">
      <InlineStack align="start" blockAlign="center" gap="100">
        <component :is="children"></component>


        <ConditionalWrapper :condition="primaryAction?.type === 'save-as'">
          <template #wrapper="{ children }">
            <Modal v-if="primaryAction?.type === 'save-as'" v-model:open="savedViewModalOpen"
              :title="i18n.translate('Polaris.IndexFilters.UpdateButtons.modal.title')" :primary-action="{
                onAction: handlePrimaryAction,
                content: i18n.translate('Polaris.IndexFilters.UpdateButtons.modal.save'),
                disabled: Boolean(isPrimaryActionDisabled)
              }" :secondary-actions="[{
  onAction: () => { savedViewModalOpen = false; },
  content: i18n.translate('Polaris.IndexFilters.UpdateButtons.modal.cancel'),
}]">
              <template #activator>
                <InlineStack>
                  <component :is="children"></component>
                </InlineStack>
              </template>
              <ModalSection>
                <Form @submit="handlePrimaryAction">
                  <FormLayout>
                    <div ref="container">
                      <TextField :label="i18n.translate('Polaris.IndexFilters.UpdateButtons.modal.label',)"
                        v-model="savedViewName" auto-complete="off" :max-length="MAX_VIEW_NAME_LENGTH"
                        show-character-count
                        :error="hasSameNameError ? i18n.translate('Polaris.IndexFilters.UpdateButtons.modal.sameName', { name: savedViewName }) : undefined" />
                    </div>
                  </FormLayout>
                </Form>
              </ModalSection>
            </Modal>
          </template>
          <Button size="micro" @click="handleClickSaveButton" :disabled="primaryAction?.disabled || disabled">
            {{ buttonText }}
          </Button>
        </ConditionalWrapper>
      </InlineStack>
    </template>
    <Button variant="tertiary" size="micro" @click="cancelAction.onAction" :disabled="disabled">
      {{ i18n.translate('Polaris.IndexFilters.UpdateButtons.cancel') }}
    </Button>
  </ConditionalWrapper>
</template>
<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue';
import type { IndexFiltersUpdateButtonsProps } from './UpdateButtons';
import Button from "../../Button";
import Modal from "../../Modal";
import ModalSection from "../../Modal/Section";
import InlineStack from "../../InlineStack";
import Form from "../../Form";
import FormLayout from "../../FormLayout";
import TextField from "../../TextField";
import ConditionalWrapper from '../../ConditionalWrapper';
import { useI18n } from '../../context';
import { useIsTouchDevice } from "@ncpl-polaris/utils";
import { focusFirstFocusableNode } from "@ncpl-polaris/utils/focus"


const MAX_VIEW_NAME_LENGTH = 40;

defineOptions({
  name: 'NpIndexFiltersUpdateButtons',
})
const props = defineProps<IndexFiltersUpdateButtonsProps>()

const i18n = useI18n();
const savedViewName = ref('');
const savedViewModalOpen = ref(false);
const container = ref<HTMLDivElement>();
const isTouchDevice = useIsTouchDevice();


const hasSameNameError = computed(() => props.viewNames.some(
  (name) => name.trim().toLowerCase() === savedViewName.value.trim().toLowerCase(),
));

const isPrimaryActionDisabled = computed(() =>
  hasSameNameError ||
  !savedViewName ||
  props.primaryAction?.loading ||
  savedViewName.value.length > MAX_VIEW_NAME_LENGTH);


const handlePrimaryAction = () => {
  if (isPrimaryActionDisabled.value) return;
  props.primaryAction?.onAction(savedViewName.value, () => {
    savedViewModalOpen.value = false;
  });

}

const handleClickSaveButton = () => {
  if (props.primaryAction?.type === 'save-as') {
    savedViewModalOpen.value = true;
  } else {
    props.primaryAction?.onAction('');
  }
}

const buttonText = computed(() => {
  switch (props.primaryAction?.type) {
    case 'save':
      return i18n.value.translate('Polaris.IndexFilters.UpdateButtons.save');
    case 'save-as':
    default:
      return i18n.value.translate('Polaris.IndexFilters.UpdateButtons.saveAs');
  }
}
);

watchEffect(() => {
  if (!container.value || isTouchDevice.value) return;
  if (savedViewModalOpen) {
    focusFirstFocusableNode(container.value);
  }
})

</script>
