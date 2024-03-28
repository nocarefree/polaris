<template>
  <li :class="classNames(styles.TabContainer, selected && styles.Underline)" ref="node" role="presentation">
    <UnstyledLink v-if="url" :id="id" :url="url" role="tab" :tabindex="tabIndex" @click="$emit('click', 'id')"
      :class="classNames(styles.Tab, selected && styles['Tab-selected'])" :aria-selected="selected"
      :aria-controls="panelId" :aria-label="accessibilityLabel" @mouseup="handleMouseUpByBlurring">
      <span :class="styles.Title">
        <slot></slot>
      </span>
    </UnstyledLink>
    <button v-else :id="id" role="tab" type="button" :tabindex="tabIndex"
      :class="classNames(styles.Tab, selected && styles['Tab-selected'])" @click="$emit('click', 'id')"
      :aria-selected="selected" :aria-controls="panelId" :aria-label="accessibilityLabel"
      @mouseup="handleMouseUpByBlurring">
      <span :class="styles.Title">
        <slot></slot>
      </span>
    </button>
  </li>
</template>
<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import styles from '../LegacyTabs.module.scss'
import UnstyledLink from "../../UnstyledLink"
import { classNames } from "../../../utils"
import { handleMouseUpByBlurring, focusFirstFocusableNode } from "../../../utils/focus"

defineOptions({
  name: 'NpLegacyTabsTab',
})
const props = defineProps<{
  id: string;
  focused?: boolean;
  siblingTabHasFocus?: boolean;
  selected?: boolean;
  panelId?: string;
  url?: string;
  measuring?: boolean;
  accessibilityLabel?: string;
}>()

const wasSelected = ref(props.selected);
const panelFocused = ref(false);
const node = ref();

const tabIndex = computed(() => {
  const { selected, siblingTabHasFocus, measuring, focused } = props;
  let tabIndex: 0 | -1;

  if (selected && !siblingTabHasFocus && !measuring) {
    tabIndex = 0;
  } else if (focused && !measuring) {
    tabIndex = 0;
  } else {
    tabIndex = -1;
  }
  return tabIndex;

})

watchEffect(() => {
  const { focused, selected, measuring, panelId, id } = props;
  if (measuring) {
    return;
  }

  // Because of timing issues with the render, we may still have the old,
  // in-disclosure version of the tab that has focus. Check for this
  // as a second indicator of focus
  const itemHadFocus =
    focused || (document.activeElement && document.activeElement.id === id);

  // If we just check for selected, the panel for the active tab will
  // be focused on page load, which we don’t want
  if (itemHadFocus && selected && panelId != null && !panelFocused.value) {
    focusPanelID(panelId);
    panelFocused.value = true;
  }

  if (selected && !wasSelected.value && panelId != null) {
    focusPanelID(panelId);
  } else if (focused && node.value != null) {
    focusFirstFocusableNode(node.value);
  }

  wasSelected.value = props.selected
}, { flush: 'post' })

function focusPanelID(panelID: string) {
  const panel = document.getElementById(panelID);
  if (panel) {
    panel.focus({ preventScroll: true });
  }
}

</script>
