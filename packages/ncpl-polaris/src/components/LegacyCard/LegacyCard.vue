<template>
  <div :class="className" ref="legacyCard">
    <Header v-if="$slots.title || title || actions" :actions="actions" :title="title">
      <slot name="title"></slot>
    </Header>
    <Section v-if="sectioned">
      <slot></slot>
    </Section>
    <slot v-else></slot>
    <div v-if="primaryFooterAction || secondaryFooterActionsMarkup"
      :class="classNames(styles.Footer, footerActionAlignment === 'left' && styles.LeftJustified,)">

      <ButtonGroup v-if="footerActionAlignment === 'right'">
        <component v-if="secondaryFooterActionsMarkup" :is="secondaryFooterActionsMarkup"></component>
        <component v-if="primaryFooterAction" :is="() => buttonFrom(props.primaryFooterAction, { variant: 'primary' })">
        </component>
      </ButtonGroup>

      <ButtonGroup v-else>
        <component v-if="primaryFooterAction" :is="() => buttonFrom(props.primaryFooterAction, { variant: 'primary' })">
        </component>
        <component v-if="secondaryFooterActionsMarkup" :is="secondaryFooterActionsMarkup"></component>
      </ButtonGroup>

    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, h, watchEffect } from 'vue'
import type { LegacyCardProps } from './LegacyCard'
import styles from './LegacyCard.module.scss'
import { withinContentContext, useI18n } from "../context"
import Button from "../Button"
import Popover from "../Popover"
import ActionList from "../ActionList"
import ButtonGroup from "../ButtonGroup"
import Section from "./Section"
import Header from "./Header"
import { classNames } from "../../utils";
import { buttonFrom } from "../Button/utils";

defineOptions({
  name: 'NpLegacyCard',
})
const props = defineProps<LegacyCardProps>();
const i18n = useI18n();
const secondaryActionsPopoverOpen = ref(false)
const legacyCard = ref();

const className = computed(() => classNames(
  styles.LegacyCard,
  props.subdued && styles.subdued,
  props.hideOnPrint && styles.hideOnPrint,
));


const secondaryFooterActionsMarkup = computed(() => {
  const { secondaryFooterActions, secondaryFooterActionsDisclosureText } = props;
  if (secondaryFooterActions && secondaryFooterActions.length) {
    if (secondaryFooterActions.length === 1) {
      return buttonFrom(secondaryFooterActions[0]);
    } else {
      return h(Popover, { active: secondaryActionsPopoverOpen.value }, {
        activator: () =>
          h(Button,
            { disclosure: true, onClick: toggleSecondaryActionsPopoverOpen, onClose: toggleSecondaryActionsPopoverOpen },
            { default: () => secondaryFooterActionsDisclosureText || i18n.value.translate('Polaris.Common.more') }
          ),
        default: () => h(ActionList, { items: secondaryFooterActions }),
      })
    }
  }
  return null;
})

const toggleSecondaryActionsPopoverOpen = () => {
  secondaryActionsPopoverOpen.value = false;
}

withinContentContext.provide(true);


watchEffect((onCleanup) => {
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
      if (legacyCardNode.firstElementChild?.contains(firstElement)) {
        firstSection = firstElement;
        updatePadding(firstSection, 'top', true);
      }

      // Update padding for last element if it is the last child or
      // a descendant of the last child
      if (legacyCardNode.lastElementChild?.contains(lastElement)) {
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

    onCleanup(() => {
      // Clean up by removing added classes
      updatePadding(firstSection, 'top', false);
      updatePadding(lastSection, 'bottom', false);
      observer.disconnect();
    });
  }
}, { flush: 'post' });


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
