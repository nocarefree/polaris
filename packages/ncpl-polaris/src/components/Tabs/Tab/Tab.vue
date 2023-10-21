<template>
  <ConditionalWrapper :condition="!icon">
    <template #wrapper="{ children }">
      <li :class="tabContainerClassNames" role="presentation" ref="node">
        <component :is="children"></component>
      </li>
    </template>
    <ConditionalWrapper :condition="!(isPlainButton || disabled)">
      <template #wrapper="{ children }">
        <Popover v-model:active="popoverActive" autofocus-target="first-node">
          <div :class="styles.ActionListWrap">
            <ActionList action-role="menuitem" :items="formattedActions" />
          </div>
          <template #activator>
            <component :is="children"></component>
          </template>
        </Popover>
        <RenameModal v-if="renameAction" :name="content" :open="activeModalType === 'rename'"
          @close="activeModalType = null" @clickPrimaryAction="handleSaveRenameModal" :is-modal-loading="isModalLoading"
          :view-names="viewNames" />
        <DuplicateModal v-if="duplicateAction" :open="activeModalType === 'duplicate'"
          :name="i18n.translate('Polaris.Tabs.Tab.copy', { name: content })" @close="activeModalType = null"
          @clickPrimaryAction="(e, done) => duplicateAction?.onPrimaryAction?.(e, done)"
          :is-modal-loading="isModalLoading" :viewNames="viewNames || []" />
        <Modal v-if="deleteAction" :open="activeModalType === 'delete'" @close="activeModalType = null" :primary-action="{
          content: i18n.translate('Polaris.Tabs.Tab.deleteModal.delete'),
          onAction: () => { deleteAction?.onPrimaryAction?.(props.content, () => { }), activeModalType = null },
          destructive: true,
          disabled: isModalLoading
        }" :secondary-actions="[
  {
    content: i18n.translate('Polaris.Tabs.Tab.deleteModal.cancel'),
    onAction: () => { activeModalType = null },
  },
]" :title="i18n.translate('Polaris.Tabs.Tab.deleteModal.title')" instant>
          <ModalSection>
            {{ i18n.translate('Polaris.Tabs.Tab.deleteModal.description', { viewName: content }) }}
          </ModalSection>
        </Modal>
      </template>

      <component :is="urlIfNotDisabledOrSelected ? UnstyledLink: UnstyledButton" :id="id" :class="tabClassName"
        :tabIndex="tabIndex" :aria-selected="selected" :aria-controls="panelId" :aria-label="accessibilityLabel"
        :role="tabIndexOverride == null ? 'tab' : undefined" :disabled="disabled" :url="urlIfNotDisabledOrSelected"
        @focus="emit('focus')" @mouseup="event => event.target.blur()" @click="handleClick" @keydown="handleKeyDown">
        <InlineStack gap="200" align="center" block-align="center" :wrap="false">
          <Text as="span" :variant="labelVariant" font-weight="medium">
            <component v-if="icon" :is="icon"></component>
            <template v-else>{{ content }}</template>
          </Text>
          <Badge v-if="badge" :status="selected ? undefined: 'new'">{{ badge }}</Badge>
        </InlineStack>
        <div v-if="selected && actions?.length" :class="classNames(styles.IconWrap)">
          <Icon :source="ChevronDownMinor" />
        </div>
      </component>
    </ConditionalWrapper>
  </ConditionalWrapper>
</template>
<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import type { TabProps, TabAction } from './Tab'
import styles from '../Tabs.module.scss'
import Popover from "../../Popover"
import ActionList from "../../ActionList"
import UnstyledButton from "../../UnstyledButton"
import UnstyledLink from "../../UnstyledLink"
import InlineStack from "../../InlineStack"
import Badge from "../../Badge"
import Text from "../../Text"
import Icon from "../../Icon"
import Modal from "../../Modal"
import ModalSection from "../../Modal/Section"
import ConditionalWrapper from "../../ConditionalWrapper"
import RenameModal from "./RenameModal"
import DuplicateModal from "./DuplicateModal"
import { classNames } from "@ncpl-polaris/utils"
import { focusFirstFocusableNode } from "@ncpl-polaris/utils/focus"
import { useI18n, useBreakpoints } from '../../context'
import { ChevronDownMinor, InfoMinor, DuplicateMinor, EditMinor, Columns3Minor, DeleteMinor } from "@ncpl/ncpl-icons"

defineOptions({
  name: 'NpTabsTab',
})
const emit = defineEmits(['action', 'focus', 'togglePopover', 'toggleModal']);
const props = defineProps<TabProps>()
const i18n = useI18n();
const popoverActive = ref(false)
const popoverNode = ref();
const node = ref();
const panelFocused = ref(false)
const wasSelected = ref(props.selected)
const activeModalType = ref<TabAction | null>();
const { mdDown } = useBreakpoints();

const isPlainButton = computed(() => !props.selected || !props.actions?.length);
const urlIfNotDisabledOrSelected = computed(() => props.disabled || props.selected ? undefined : props.url);
const renameAction = computed(() => props.actions?.find((action) => action.type === 'rename'));
const duplicateAction = computed(() => props.actions?.find((action) => action.type === 'duplicate'));
const deleteAction = computed(() => props.actions?.find((action) => action.type === 'delete'));
const tabClassName = computed(() => classNames(
  styles.Tab,
  props.icon && styles['Tab-iconOnly'],
  popoverActive.value && styles['Tab-popoverActive'],
  props.selected && styles['Tab-active'],
  props.selected && props.actions?.length && styles['Tab-hasActions'],
));
const tabContainerClassNames = computed(() => classNames(
  styles.TabContainer,
  props.selected && styles.Underline,
));
const tabIndex = computed(() => {
  let tabIndex: 0 | -1;

  if (props.selected && !props.siblingTabHasFocus && !props.measuring) {
    tabIndex = 0;
  } else if (props.focused && !props.measuring) {
    tabIndex = 0;
  } else {
    tabIndex = -1;
  }

  if (props.tabIndexOverride != null) {
    tabIndex = props.tabIndexOverride;
  }
  return tabIndex;
});
const labelVariant = computed(() =>  mdDown.value ? 'bodyLg' : 'bodySm');
const formattedActions = computed(() => {

  const actionContent = {
    rename: {
      icon: InfoMinor,
      content: i18n.value.translate('Polaris.Tabs.Tab.rename'),
    },
    duplicate: {
      icon: DuplicateMinor,
      content: i18n.value.translate('Polaris.Tabs.Tab.duplicate'),
    },
    edit: {
      icon: EditMinor,
      content: i18n.value.translate('Polaris.Tabs.Tab.edit'),
    },
    'edit-columns': {
      icon: Columns3Minor,
      content: i18n.value.translate('Polaris.Tabs.Tab.editColumns'),
    },
    delete: {
      icon: DeleteMinor,
      content: i18n.value.translate('Polaris.Tabs.Tab.delete'),
      destructive: true,
    },
  };
  return props.actions?.map(
    ({ type, onAction, onPrimaryAction, ...additionalOptions }) => {
      const isModalActivator = !type.includes('edit');
      return {
        ...actionContent[type],
        ...additionalOptions,
        onAction: () => {
          onAction?.(props.content);
          popoverActive.value = false;
          if (isModalActivator) {
            activeModalType.value = type;
          }
        },
      };
    },
  )
});

const handleSaveRenameModal = (value: string) => {
  const done = () => setTimeout(() => {
    if (popoverNode.value) {
      focusFirstFocusableNode(popoverNode.value);
    }
  }, 250);

  renameAction.value?.onPrimaryAction ? renameAction.value?.onPrimaryAction(value, done) : done()
}


const handleClick = () => {
  if (props.disabled) {
    return;
  }
  if (props.selected) {
    popoverActive.value = !popoverActive.value;
  } else {
    emit('action');
  }
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === ' ') {
    event.preventDefault();
    handleClick();
  }
}

watchEffect(() => {
  emit('togglePopover', popoverActive.value);
})

watchEffect(() => {
  emit('toggleModal', Boolean(activeModalType));
})

watchEffect(() => {
  const { measuring, focused, id, selected, panelId, disabled } = props;
  if (measuring) {
    return;
  }

  // Because of timing issues with the render, we may still have the old, in-disclosure version of the tab that has focus. Check for this as a second indicator of focus
  const itemHadFocus = focused || (document.activeElement && document.activeElement.id === id);

  // If we just check for selected, the panel for the active tab will be focused on page load, which we don’t want
  if (
    itemHadFocus &&
    selected &&
    panelId != null &&
    !panelFocused.value
  ) {
    focusPanelID(panelId);
    panelFocused.value = true;
  }

  if (selected && !wasSelected.value && panelId != null) {
    focusPanelID(panelId);
  } else if (
    focused &&
    node.value != null &&
    activeModalType.value == null &&
    !disabled
  ) {
    focusFirstFocusableNode(node.value);
  }

  wasSelected.value = selected;
})

function focusPanelID(panelID: string) {
  const panel = document.getElementById(panelID);
  if (panel) {
    panel.focus({ preventScroll: true });
  }
}
</script>
