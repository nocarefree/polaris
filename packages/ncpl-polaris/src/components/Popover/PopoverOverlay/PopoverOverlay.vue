<template>
  <transition :css="false" :duration="parseInt(theme.motion['motion-duration-100'], 10)"
    @before-enter="transitionStatus === TransitionStatus.Entered"
    @after-enter="transitionStatus = TransitionStatus.Entered"
    @before-leave="transitionStatus = TransitionStatus.Entering"
    @after-leave="transitionStatus = TransitionStatus.Exiting">
    <PositionedOverlay v-if="active" ref="overlayRef" :full-width="fullWidth" :active="active" :activator="activator"
      :prefer-input-activator="preferInputActivator" :preferred-position="preferredPosition"
      :preferred-alignment="preferredAlignment" :fixed="fixed" @scrollOut="handleScrollOut" :class="className"
      :z-index-override="zIndexOverride">
      <template #default="{ measuring, desiredHeight, positioning }">
        <div :class="classNames(
          styles.Popover,
          positioning === 'above' && styles.positionedAbove,
          fullWidth && styles.fullWidth,
          measuring && styles.measuring,
          hideOnPrint && styles['PopoverOverlay-hideOnPrint'],
        )
          " v-bind="overlay.props">
          <div :class="styles.FocusTracker" tabIndex="0" @focus="handleFocusFirstItem"></div>
          <div :class="styles.ContentContainer">
            <div :id="id" :tab-index="autofocusTarget === 'none' ? undefined : -1" :class="classNames(
              styles.Content,
              fullHeight && styles['Content-fullHeight'],
              fluidContent && styles['Content-fluidContent'],
            )" :style="measuring ? undefined : { height: desiredHeight }" ref="contentNode">
              <RenderPopoverContent>
                <slot></slot>
              </RenderPopoverContent>
            </div>
          </div>
          <div :class="styles.FocusTracker" tabIndex="0" @focus="handleFocusLastItem"></div>
        </div>
      </template>
    </PositionedOverlay>
  </transition>
</template>
<script setup lang="ts">
import { ref, computed, h, defineComponent, onMounted, Fragment, onUpdated } from 'vue'
import type { Ref } from 'vue';
import { classNames, elementChildren } from "@ncpl-polaris/utils"
import { findFirstKeyboardFocusableNode } from "@ncpl-polaris/utils/focus"
import { type PopoverOverlayProps, PopoverCloseSource } from './PopoverOverlay'
import { overlay } from "../../shared";
import { Key } from "../../types";
import { useEventListener } from '@vueuse/core';
import styles from '../Popover.module.scss'
import Pane from "../Pane/Pane.vue";
import PositionedOverlay from "@ncpl-polaris/components/PositionedOverlay/PositionedOverlay.vue"
import { useTheme } from '../../context';


enum TransitionStatus {
  Entering = 'entering',
  Entered = 'entered',
  Exiting = 'exiting',
  Exited = 'exited',
}

defineOptions({
  name: 'NpPopoverOverlay',
})

const emit = defineEmits(['close', 'update:active']);
const props = defineProps<PopoverOverlayProps>()

const theme = useTheme();
const overlayRef = ref<HTMLElement>();
const contentNode = ref<HTMLDivElement>();

const transitionStatus = ref(props.active
  ? TransitionStatus.Entering
  : TransitionStatus.Exited);

const className = computed(() => {
  return classNames(
    styles.PopoverOverlay,
    transitionStatus.value === TransitionStatus.Entering &&
    styles['PopoverOverlay-entering'],
    transitionStatus.value === TransitionStatus.Entered &&
    styles['PopoverOverlay-open'],
    transitionStatus.value === TransitionStatus.Exiting &&
    styles['PopoverOverlay-exiting'],
  );
})

const RenderPopoverContent = defineComponent({
  setup(_props, { slots }) {

    return () => {
      const children = elementChildren(slots.default?.());
      const { captureOverscroll, sectioned } = props;

      if (children[0].type == Pane.type) {
        return h(Fragment, children);
      } else {
        return h(Pane, { captureOverscroll, sectioned }, { default: () => children })
      }
    }
  }
})

const onClose = (v: PopoverCloseSource) => {
  emit('update:active', false);
  emit('close', v)
}

const handleScrollOut = () => {
  onClose(PopoverCloseSource.ScrollOut);
}
const handleClick = (event: Event) => {
  const target = event.target as HTMLElement;
  const composedPath = event.composedPath();
  // const wasDescendant = preventCloseOnChildOverlayClick
  //   ? wasPolarisPortalDescendant(composedPath, this.context!.container)
  //   : wasContentNodeDescendant(composedPath, contentNode);
  const wasDescendant = wasContentNodeDescendant(composedPath, contentNode);
  const isActivatorDescendant = nodeContainsDescendant(props.activator, target);
  if (
    wasDescendant ||
    isActivatorDescendant ||
    transitionStatus.value !== TransitionStatus.Entered
  ) {
    return;
  }

  onClose(PopoverCloseSource.Click);
}
const handleEscape = (event: Event) => {
  const target = event.target as HTMLElement;

  const composedPath = event.composedPath();
  const wasDescendant = wasContentNodeDescendant(composedPath, contentNode);
  const isActivatorDescendant = nodeContainsDescendant(props.activator, target);

  if (wasDescendant || isActivatorDescendant) {
    onClose(PopoverCloseSource.EscapeKeypress);
  }
}
const handleFocusFirstItem = () => {
  onClose(PopoverCloseSource.FocusOut)
}

const handleFocusLastItem = () => {
  onClose(PopoverCloseSource.FocusOut)
}

const focusContent = () => {
  const { autofocusTarget = 'container' } = props;

  if (autofocusTarget === 'none' || contentNode.value == null) {
    return;
  }

  requestAnimationFrame(() => {
    if (contentNode.value == null) {
      return;
    }

    const focusableChild = findFirstKeyboardFocusableNode(
      contentNode.value,
    );

    if (focusableChild && autofocusTarget === 'first-node') {
      focusableChild.focus({
        preventScroll: process.env.NODE_ENV === 'development',
      });
    } else {
      contentNode.value.focus({
        preventScroll: process.env.NODE_ENV === 'development',
      });
    }
  });
}

onMounted(() => {
  if (props.active) {
    focusContent();
  }
});

onUpdated(() => {
  if (props.active) {
    focusContent();
  }
})

useEventListener(window, 'click', handleClick);
useEventListener(window, 'touchstart', handleClick);
useEventListener(window, 'keydown', (e) => {
  if (e.keyCode == Key.Escape) {
    handleEscape(e)
  }
});


function wasContentNodeDescendant(
  composedPath: readonly EventTarget[],
  contentNode: Ref<HTMLDivElement | undefined>,
) {
  return (
    contentNode.value != null && composedPath.includes(contentNode.value)
  );
}

function nodeContainsDescendant(
  rootNode: HTMLElement,
  descendant: HTMLElement,
): boolean {
  if (rootNode === descendant) {
    return true;
  }

  let parent = descendant.parentNode;

  while (parent != null) {
    if (parent === rootNode) {
      return true;
    }
    parent = parent.parentNode;
  }

  return false;
}

// function wasPolarisPortalDescendant(
//   composedPath: readonly EventTarget[],
//   portalsContainerElement: HTMLElement,
// ): boolean {
//   return composedPath.some(
//     (eventTarget) =>
//       eventTarget instanceof Node &&
//       portalsContainerElement?.contains(eventTarget),
//   );
// }

</script>
