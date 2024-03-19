<template>
  <PositionedOverlay v-if="transitionStatus !== TransitionStatus.Exited || active" ref="overlayRef"
    :full-width="fullWidth" :active="active" :activator="activator" :prefer-input-activator="preferInputActivator"
    :preferred-position="preferredPosition" :preferred-alignment="preferredAlignment" :fixed="fixed"
    @scrollOut="handleScrollOut" :class="className" :z-index-override="zIndexOverride">
    <template #default="{ measuring, desiredHeight, positioning }">
      <div :class="classNames(
    styles.Popover,
    positioning === 'above' && styles.positionedAbove,
    fullWidth && styles.fullWidth,
    measuring && styles.measuring,
    hideOnPrint && styles['PopoverOverlay-hideOnPrint'],
  )
    " v-bind="overlay.props">
        <EventListener event="click" :handler="handleClick" />
        <EventListener event="touchstart" :handler="handleClick" />
        <KeypressListener :key-code="Key.Escape" :handler="handleEscape" />
        <div :class="styles.FocusTracker" tabindex="0" @focus="handleFocusFirstItem"></div>
        <div :class="styles.ContentContainer">
          <div :id="id" :tabindex="autofocusTarget === 'none' ? undefined : -1" :class="classNames(
    styles.Content,
    fullHeight && styles['Content-fullHeight'],
    fluidContent && styles['Content-fluidContent'],
  )
    " :style="measuring ? undefined : { height: `${desiredHeight}px` }" ref="contentNode">
            <RenderPopoverContent>
              <slot></slot>
            </RenderPopoverContent>
          </div>
        </div>
        <div :class="styles.FocusTracker" tabindex="0" @focus="handleFocusLastItem"></div>
      </div>
    </template>
  </PositionedOverlay>
</template>
<script setup lang="ts">
import { ref, computed, h, defineComponent, onMounted, Fragment, watch, onUnmounted, nextTick } from 'vue'
import type { Ref } from 'vue';
import { classNames, elementChildren } from "@ncpl-polaris/utils"
import { findFirstKeyboardFocusableNode } from "@ncpl-polaris/utils/focus"
import { type PopoverOverlayProps, PopoverCloseSource } from './PopoverOverlay'
import { overlay } from "../../shared";
import EventListener from "../../EventListener";
import KeypressListener from "../../KeypressListener"
import { Key } from "../../types";
import styles from '../Popover.module.scss'
import Pane from "../Pane/Pane.vue";
import PositionedOverlay from "@ncpl-polaris/components/PositionedOverlay/PositionedOverlay.vue"
import { useTheme, usePortalsManager } from '../../context';


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
const { container } = usePortalsManager();

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

      if (children[0].type.__name == Pane.__name) {
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
  //const preventCloseOnChildOverlayClick = props.preventCloseOnChildOverlayClick;
  const wasDescendant = props.preventCloseOnChildOverlayClick
    ? wasPolarisPortalDescendant(composedPath, container.value!)
    : wasContentNodeDescendant(composedPath, contentNode);
  //const wasDescendant = wasContentNodeDescendant(composedPath, contentNode);
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
  if (!props.active) {
    return;
  }
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

  if (autofocusTarget === 'none' || !contentNode) {
    return;
  }

  requestAnimationFrame(() => {
    if (!contentNode.value) {
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

const changeTransitionStatus = (status: TransitionStatus, cb?: () => void) => {
  transitionStatus.value = status
  // Forcing a reflow to enable the animation
  contentNode.value && contentNode.value.getBoundingClientRect();
  cb && nextTick(cb);
}



onMounted(() => {
  if (props.active) {
    focusContent();
    changeTransitionStatus(TransitionStatus.Entered);
  }
});

let enteringTimer: any;
const clearTransitionTimeout = () => {
  if (enteringTimer) {
    window.clearTimeout(enteringTimer);
  }
}

watch(() => props.active, (val: boolean, oldVal: boolean) => {
  if (val && !oldVal) {
    focusContent();
    changeTransitionStatus(TransitionStatus.Entering, () => {
      clearTransitionTimeout();

      enteringTimer = window.setTimeout(() => {
        transitionStatus.value = TransitionStatus.Entered;
      }, parseInt(theme.value.motion['motion-duration-100'], 10));
    });
  }

  if (!val && oldVal) {
    clearTransitionTimeout();
    transitionStatus.value = TransitionStatus.Exited;
  }
})

onUnmounted(() => {
  clearTransitionTimeout();
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

function wasPolarisPortalDescendant(
  composedPath: readonly EventTarget[],
  portalsContainerElement: HTMLElement,
): boolean {
  return composedPath.some(
    (eventTarget) =>
      eventTarget instanceof Node &&
      portalsContainerElement?.contains(eventTarget),
  );
}

</script>
