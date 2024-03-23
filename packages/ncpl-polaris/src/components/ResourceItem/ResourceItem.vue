<template>
  <li
    :class="classNames(styles.ListItem, state.focused && !state.focusedInner && styles.focused, context.hasBulkActions && styles.hasBulkActions, selected && styles.selected, context.selectable && styles.selectable,)"
    :data-href="dataHref">
    <div :class="styles.ItemWrapper">
      <div ref="node"
        :class="classNames(styles.ResourceItem, state.focused && styles.focused, context.selectable && styles.selectable, selected && styles.selected, context.selectMode && styles.selectMode, persistActions && styles.persistActions, state.focusedInner && styles.focusedInner,)"
        @click="handleClick" @keyup="handleKeyUp" @mouseover="onMouseOver" @mouseout="handleMouseOut" :data-href="url">
        <UseId v-if="url">
          <template #default="{ id }">
            <UnstyledLink :aria-describedby="id" :aria-label="ariaLabel" :class="styles.Link" :url="url"
              :external="external" :tabindex="context.loading ? -1 : 0" :id="id" ref="overlayRef" @focus="handleFocus"
              @blur="handleBlur" />
          </template>
        </UseId>
        <button v-else :class="styles.Button" :aria-label="ariaLabel" :aria-controls="ariaControls" @focus="handleFocus"
          @blur="handleBlur" :aria-expanded="ariaExpanded" @click="handleClick" :tabindex="context.loading ? -1 : 0"
          ref="buttonOverlay" />
        <Box :id="id" position="relative" padding-inline-start="300" padding-inline-end="300" padding-block-start="300"
          padding-block-end="300" z-index="var(--pc-resource-item-content-stacking-order)">
          <InlineGrid :columns="{ xs: '1fr auto' }">
            <InlineGrid :columns="{ xs: $slots.media || context.selectable ? 'auto 1fr' : '1fr' }" gap="300">
              <InlineStack v-if="$slots.media || context.selectable" gap="300"
                :block-align="$slots.media && context.selectable ? 'center' : getAlignment(verticalAlignment)">
                <div v-if="context.selectable" :class="styles.CheckboxWrapper" @click="stopPropagation"
                  @change="handleLargerSelectionArea">
                  <UseId>
                    <template #default="{ id }">
                      <Checkbox :id="id"
                        :label="name || accessibilityLabel || i18n.translate('Polaris.Common.checkbox')" label-hidden
                        :checked="selected" :disabled="context.loading" bleed-inline-start="300" bleed-inline-end="300"
                        bleed-blockStart="300" bleed-block-end="300" fill :label-class-name="styles.CheckboxLabel" />
                    </template>
                  </UseId>
                </div>
                <slot name="media"></slot>
              </InlineStack>
              <InlineStack :block-align="getAlignment(verticalAlignment)">
                <Box width="100%" padding="0">
                  <slot></slot>
                </Box>
              </InlineStack>
            </InlineGrid>
            <template v-if="shortcutActions && !context.loading">
              <template v-if="persistActions">
                <div v-if="lgUp" :class="styles.Actions" @click="stopPropagation">
                  <ButtonGroup>
                    <component :is="()=>buttonsFrom(shortcutActions!, {variant: 'tertiary'})"></component>
                  </ButtonGroup>
                </div>
                <div v-if="!context.selectMode && lgDown" @click="stopPropagation">
                  <Popover @close="handleCloseRequest" :active="state.actionsMenuVisible">
                    <template #activator>
                      <NpButton :accessibility-label="name
      ? i18n.translate('Polaris.ResourceList.Item.actionsDropdownLabel', {
        accessibilityLabel: name,
      })
      : i18n.translate('Polaris.ResourceList.Item.actionsDropdown')" @click="handleActionsClick"
                        variant="tertiary" :icon="MenuHorizontalIcon" />
                    </template>
                    <ActionList :items="shortcutActions" />
                  </Popover>
                </div>
              </template>
              <div v-else-if="lgUp" :class="styles.Actions" @click="stopPropagation">
                <Box position="absolute" inset-block-start="400" inset-inline-end="500">
                  <ButtonGroup variant="segmented">
                    <component :is="()=>buttonsFrom(shortcutActions!, {size: 'slim'})"></component>
                  </ButtonGroup>
                </Box>
              </div>
            </template>
          </InlineGrid>
        </Box>
      </div>
    </div>
  </li>
</template>
<script setup lang="ts">
import { ref, computed, reactive, inject, defineComponent } from 'vue';
import type { ResourceItemProps, Alignment } from './types';
import { resourceListContextKey } from "../ResourceList/context";
import { SELECT_ALL_ITEMS, type ResourceListSelectedItems } from "../ResourceList/types";
import styles from './ResourceItem.module.scss';
import { classNames } from "@ncpl-polaris/utils";
import { useI18n, useBreakpoints, useId } from '../context';
import UnstyledLink from "../UnstyledLink";
import Box from "../Box";
import InlineGrid from "../InlineGrid";
import InlineStack from "../InlineStack";
import { InlineStackProps } from "../InlineStack";
import Checkbox from "../Checkbox";
import ButtonGroup from "../ButtonGroup";
import Popover from "../Popover";
import NpButton from "../Button";
import ActionList from "../ActionList";
import { buttonsFrom } from "../Button/utils";
import { MenuHorizontalIcon } from "@ncpl/ncpl-icons";


defineOptions({
  name: 'NpResourceItem',
})

const { lgUp, lgDown } = useBreakpoints();

const context = inject(resourceListContextKey, {});
const i18n = useI18n();

function isSelected(id: string, selectedItems?: ResourceListSelectedItems) {
  return Boolean(
    selectedItems &&
    ((Array.isArray(selectedItems) && selectedItems.includes(id)) ||
      selectedItems === SELECT_ALL_ITEMS),
  );
}

const props = defineProps<ResourceItemProps>()
const emit = defineEmits(['click', 'mouseOut', 'mouseOver']);
const node = ref();
const overlayRef = ref();
const buttonOverlay = ref();

const state = reactive({
  actionsMenuVisible: false,
  focused: false,
  focusedInner: false,
});

const selected = computed(() => isSelected(props.id, context.selectedItems));
const ariaLabel = computed(() => props.accessibilityLabel || i18n.value.translate('Polaris.ResourceList.Item.viewItem', { itemName: props.name || (context.resourceName && context.resourceName.singular) || '' }));

const handleClick = (event: MouseEvent) => {
  stopPropagation(event);
  const { id, url } = props;
  const { selectMode } = context;
  const { ctrlKey, metaKey } = event;
  const anchor = node.value && node.value.querySelector('a');

  if (selectMode) {
    handleLargerSelectionArea(event);
    return;
  }

  if (anchor === event.target) {
    return;
  }

  emit('click', id)

  if (url && (ctrlKey || metaKey)) {
    window.open(url, '_blank');
    return;
  }

  if (url && anchor) {
    anchor.click();
  }
}
const handleFocus = (event: Event) => {
  state.focused = true;
  state.focusedInner = false;
}
const handleBlur = () => {
  state.focused = false;
  state.focusedInner = false;
}
const handleKeyUp = (event: KeyboardEvent) => {
  const { key } = event;

  if (key === 'Enter' && props.url && !context.selectMode) {
    emit('click')
  }
}
const onMouseOver = () => {
  emit('mouseOver');
}
const handleMouseOut = () => {
  if (state.focused) {
    state.focused = false;
    state.focusedInner = false;
  }
  emit('mouseOut');
}
const handleCloseRequest = () => {
  state.actionsMenuVisible = false;
}
const handleActionsClick = () => {
  state.actionsMenuVisible = !state.actionsMenuVisible;
}

const stopPropagation = (event: MouseEvent) => {
  event.stopPropagation();
}

const handleSelection = (value: boolean, shiftKey: boolean) => {
  const {
    id,
    sortOrder
  } = props;

  const { onSelectionChange } = context;

  if (id == null || onSelectionChange == null) {
    return;
  }
  state.focused = value;
  state.focusedInner = value;

  onSelectionChange(value, id, sortOrder, shiftKey);
}

const handleLargerSelectionArea = (event: Event) => {
  stopPropagation(event as MouseEvent);
  handleSelection(!selected.value, (event as MouseEvent).shiftKey);
};

function getAlignment(alignment?: Alignment): InlineStackProps['blockAlign'] {
  switch (alignment) {
    case 'leading':
      return 'start';
    case 'trailing':
      return 'end';
    case 'center':
      return 'center';
    case 'fill':
      return 'stretch';
    case 'baseline':
      return 'baseline';
    default:
      return 'start';
  }
}

const UseId = defineComponent({
  template: '<slot :id="id"><slot>',
  setup(props, { slots }) {
    const id = useId();
    return () => slots.default?.({ id: id.value })
  }
});


</script>
