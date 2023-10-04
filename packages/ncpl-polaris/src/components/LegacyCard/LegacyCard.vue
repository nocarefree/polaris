<template>
  <div :class="classNames(
    styles.LegacyCard,
    subdued && styles.subdued,
    hideOnPrint && styles.hideOnPrint,
  )" ref="legacyCard">
    <Header v-if="actions || title" :title="title" :actions="actions"></Header>
    <Section v-if="sectioned">
      <slot></slot>
    </Section>
    <slot v-else></slot>
    <component v-if="footerMarkup" :is="footerMarkup"></component>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, h, onMounted, nextTick } from 'vue'
import type { LegacyCardProps } from './LegacyCard'
import Section from "./Section"
import Header from "./Header"
import ButtonGroup from "@ncpl-polaris/components/ButtonGroup"
import Button from "@ncpl-polaris/components/Button"
import ActionList from "@ncpl-polaris/components/ActionList"
import { classNames } from "@ncpl-polaris/utils";
import styles from './LegacyCard.module.scss'

import { useI18n, withinContentContext, useFeatures } from "../context";

defineOptions({
  name: 'NpLegacyCard',
})
const props = defineProps<LegacyCardProps>()
const { polarisSummerEditions2023 } = useFeatures();
const i18n = useI18n()

const legacyCard = ref();
const secondaryActionsPopoverOpen = ref<boolean>(false)

withinContentContext.provide();

const buttonFrom = ({ content, ...action }: any) => {
  return h(Button, { primary: true, ...action }, content);
}

const toggleSecondaryActionsPopoverOpen = () => {

}

const footerMarkup = computed(() => {
  const { primaryFooterAction, secondaryFooterActions, footerActionAlignment, secondaryFooterActionsDisclosureText } = props;

  const primaryFooterActionMarkup = primaryFooterAction ? buttonFrom(primaryFooterAction) : null;

  let secondaryFooterActionsMarkup = null;
  if (secondaryFooterActions && secondaryFooterActions.length) {
    if (secondaryFooterActions.length === 1) {
      secondaryFooterActionsMarkup = buttonFrom(secondaryFooterActions[0]);
    } else {
      secondaryFooterActionsMarkup =
        h('Popover',
          {
            active: secondaryActionsPopoverOpen.value,
            onClose: toggleSecondaryActionsPopoverOpen
          }, {
          activator: () => h('Button', { disclosure: true, onClick: toggleSecondaryActionsPopoverOpen }, secondaryFooterActionsDisclosureText ||
            i18n.value.translate('Polaris.Common.more')),
          default: () => h(ActionList, { items: secondaryFooterActions })
        }
        );
    }
  }

  return primaryFooterActionMarkup || secondaryFooterActionsMarkup ? h('div', {
    class: classNames(
      styles.Footer,
      footerActionAlignment === 'left' && styles.LeftJustified,
    )
  }, [
    footerActionAlignment === 'right' ? h(ButtonGroup, {}, [secondaryFooterActionsMarkup, primaryFooterActionMarkup]) : h(ButtonGroup, {}, [primaryFooterActionMarkup, secondaryFooterActionsMarkup])
  ]) : null;
})

onMounted(() => {
  useLegacyCardPaddingObserverRef();
})

function useLegacyCardPaddingObserverRef() {
  if (!polarisSummerEditions2023) {
    return;
  };

  const legacyCardNode = legacyCard.value;
  let firstSection: Element | undefined;
  let lastSection: Element | undefined;

  if (legacyCardNode) {
    const updateFirstAndLastSectionPadding = () => {
      // Reset old first and last section padding
      updatePadding(firstSection, 'top', false);
      updatePadding(lastSection, 'bottom', false);

      // Get current first and last sections, return if they don't exist
      const currentElements = legacyCardNode.querySelectorAll(
        `.${styles.Section}, .${styles.Header}, .${styles.Footer}`,
      );
      if (!currentElements?.length) return;

      const firstElement = currentElements[0];
      const lastElement = getMostSeniorLastElement(currentElements);

      // Update padding for first element if it is the first child or
      // a descendant of the first child
      if (legacyCardNode.firstChild?.contains(firstElement)) {
        firstSection = firstElement;
        updatePadding(firstSection, 'top', true);
      }

      // Update padding for last element if it is the last child or
      // a descendant of the last child
      if (legacyCardNode.lastChild?.contains(lastElement)) {
        lastSection = lastElement;
        updatePadding(lastSection, 'bottom', true);
      }
    };

    // First initial render
    updateFirstAndLastSectionPadding();

    // Re-run when descendants are changed
    const observer = new MutationObserver(updateFirstAndLastSectionPadding);
    observer.observe(legacyCardNode, {
      childList: true,
      subtree: true,
    });

    nextTick(() => {
      updatePadding(firstSection, 'top', false);
      updatePadding(lastSection, 'bottom', false);
      observer.disconnect();
    })
  }

}

function updatePadding(
  element: Element | undefined,
  area: 'top' | 'bottom',
  add: boolean,
) {
  if (!element || element.className.includes(styles['Section-flush'])) return;

  switch (area) {
    case 'top':
      (element as HTMLElement).classList.toggle(
        styles.FirstSectionPadding,
        add,
      );
      return;
    case 'bottom':
      (element as HTMLElement).classList.toggle(styles.LastSectionPadding, add);
  }
}

/*
 * Get the senior most last element in a node list ordered by
 * a depth first traversal.
 * https://www.w3.org/TR/selectors-api/#document-order
 */
function getMostSeniorLastElement(elements: NodeListOf<Element>) {
  let lastElement = elements[0];

  elements.forEach((element) => {
    if (!lastElement.contains(element)) {
      lastElement = element;
    }
  });

  return lastElement;
}
</script>
