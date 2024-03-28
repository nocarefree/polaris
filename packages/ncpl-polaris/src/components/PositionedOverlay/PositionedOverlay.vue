<template>
  <div :class="className" :style="_style" ref="overlay">
    <slot :measuring="state.measuring" :left="state.left" :right="state.right" :positioning="state.positioning"
      :desired-height="state.height" :activator-rect="state.activatorRect" :chevron-offset="state.chevronOffset">
    </slot>
  </div>
</template>
<script setup lang="ts">
import { computed, reactive, ref, onMounted, onUnmounted, nextTick } from 'vue';
import type { CSSProperties, MaybeRef } from "vue"
import type { PositionedOverlayProps } from './PositionedOverlay'
import { useScrollable } from "../context"
import { dataPolarisTopBar, layer } from "../shared"
import styles from './PositionedOverlay.module.scss'
import { classNames, getRectForNode, Rect } from '../../utils';
import { useEventListener } from '@vueuse/core'
import {
  calculateVerticalPosition,
  calculateHorizontalPosition,
  rectIsOutsideOfRect,
  intersectionWithViewport,
  windowRect,
} from "./math"

type Positioning = 'above' | 'below';


interface State {
  measuring: boolean;
  activatorRect: Rect;
  left?: number;
  right?: number;
  top: number;
  height: number;
  width: number | null;
  positioning: Positioning;
  zIndex: number | null;
  outsideScrollableContainer: boolean;
  lockPosition: MaybeRef<boolean>;
  chevronOffset: number;
}


defineOptions({
  name: 'NpPositionedOverlay',
})

const OBSERVER_CONFIG = {
  childList: true,
  subtree: true,
  characterData: true,
  attributeFilter: ['style'],
};

const props = defineProps<PositionedOverlayProps>();
const state = reactive<State>({
  measuring: true,
  activatorRect: getRectForNode(props.activator),
  right: undefined,
  left: undefined,
  top: 0,
  height: 0,
  width: null,
  positioning: 'below',
  zIndex: null,
  outsideScrollableContainer: false,
  lockPosition: false,
  chevronOffset: 0,
})

const overlay = ref<HTMLElement>();
let scrollableContainers: (HTMLElement | Document)[] = [];

const className = computed(() => {
  return classNames(
    styles.PositionedOverlay,
    props.fixed && styles.fixed,
    props.preventInteraction && styles.preventInteraction
  );
});

const _style = computed<CSSProperties>(() => {
  return {
    top: state.top == null || isNaN(state.top) ? undefined : `${state.top}px`,
    left: state.left == null || isNaN(state.left) ? undefined : `${state.left}px`,
    right: state.right == null || isNaN(state.right) ? undefined : `${state.right}px`,
    width: state.width == null || isNaN(state.width) ? undefined : `${state.width}px`,
    zIndex: props.zIndexOverride || state.zIndex || undefined,
  };
});

const handleMeasurement = (...avg: any) => {
  const { lockPosition, top } = state;
  observer.disconnect();

  state.height = 0;
  state.positioning = 'below';
  state.measuring = true;

  nextTick(() => {
    let firstScrollableContainer = scrollableContainers[0] ?? null;

    if (overlay.value == null || firstScrollableContainer == null) {
      return;
    }

    const {
      activator,
      preferredPosition = 'below',
      preferredAlignment = 'center',
      onScrollOut,
      fullWidth,
      preferInputActivator = true,
      fixed
    } = props;

    const preferredActivator = preferInputActivator
      ? activator.querySelector('input') || activator
      : activator;
    const activatorRect = getRectForNode(preferredActivator);

    const currentOverlayRect = getRectForNode(overlay.value);
    const scrollableElement = isDocument(firstScrollableContainer)
      ? document.body
      : firstScrollableContainer;
    const scrollableContainerRect = getRectForNode(scrollableElement);

    const overlayRect = fullWidth
      ? new Rect({ ...currentOverlayRect, width: activatorRect.width })
      : currentOverlayRect;

    // If `body` is 100% height, it still acts as though it were not constrained to that size. This adjusts for that.
    if (scrollableElement === document.body) {
      scrollableContainerRect.height = document.body.scrollHeight;
    }

    let topBarOffset = 0;
    const topBarElement = scrollableElement.querySelector(
      `${dataPolarisTopBar.selector}`,
    );
    if (topBarElement) {
      topBarOffset = topBarElement.clientHeight;
    }

    const overlayMargins =
      overlay.value.firstElementChild &&
        overlay.value.firstElementChild instanceof HTMLElement
        ? getMarginsForNode(overlay.value.firstElementChild as HTMLElement)
        : { activator: 0, container: 0, horizontal: 0 };

    const containerRect = windowRect();
    const zIndexForLayer = getZIndexForLayerFromNode(activator);
    const zIndex =
      zIndexForLayer == null ? zIndexForLayer : zIndexForLayer + 1;
    const verticalPosition = calculateVerticalPosition(
      activatorRect,
      overlayRect,
      overlayMargins,
      scrollableContainerRect,
      containerRect,
      preferredPosition,
      fixed,
      topBarOffset,
    );

    const horizontalPosition = calculateHorizontalPosition(
      activatorRect,
      overlayRect,
      containerRect,
      overlayMargins,
      preferredAlignment,
    );

    const chevronOffset = activatorRect.center.x - horizontalPosition +
      overlayMargins.horizontal * 2;

    state.measuring = false;
    state.activatorRect = getRectForNode(activator);
    state.left = preferredAlignment !== 'right' ? horizontalPosition : undefined;
    state.right = preferredAlignment === 'right' ? horizontalPosition : undefined;
    state.top = lockPosition ? top : verticalPosition.top;
    state.lockPosition = fixed;
    state.height = verticalPosition.height || 0;
    state.width = fullWidth ? overlayRect.width : null;
    state.positioning = verticalPosition.positioning as Positioning;
    state.outsideScrollableContainer = onScrollOut != null && rectIsOutsideOfRect(
      activatorRect,
      intersectionWithViewport(scrollableContainerRect),
    );
    state.zIndex = zIndex;
    state.chevronOffset = chevronOffset;

    nextTick(() => {
      observer.observe(overlay.value!, OBSERVER_CONFIG);
      observer.observe(activator, OBSERVER_CONFIG);
    })
  });



}

const observer = new MutationObserver(handleMeasurement);


const setScrollableContainers = () => {
  const scrollable = useScrollable();
  const containers: (HTMLElement | Document)[] = [];
  let scrollableContainer = scrollable.forNode(props.activator);

  if (scrollableContainer) {
    containers.push(scrollableContainer);

    while (scrollableContainer?.parentElement) {
      scrollableContainer = scrollable.forNode(
        scrollableContainer.parentElement,
      );

      containers.push(scrollableContainer);
    }
  }
  scrollableContainers = containers;
}

const registerScrollHandlers = () => {
  scrollableContainers.forEach((node) => {
    node.addEventListener('scroll', handleMeasurement);
  });
};

const unregisterScrollHandlers = () => {
  scrollableContainers.forEach((node) => {
    node.removeEventListener('scroll', handleMeasurement);
  });
};

onMounted(() => {
  setScrollableContainers();

  if (scrollableContainers.length && !props.fixed) {
    registerScrollHandlers();
  }

  handleMeasurement();
})

onUnmounted(() => {
  unregisterScrollHandlers();
});

useEventListener(window, 'resize', handleMeasurement)

function getZIndexForLayerFromNode(node: HTMLElement) {
  const layerNode = node.closest(layer.selector) || document.body;
  const zIndex =
    layerNode === document.body
      ? 'auto'
      : parseInt(window.getComputedStyle(layerNode).zIndex || '0', 10);
  return zIndex === 'auto' || isNaN(zIndex) ? null : zIndex;
}

function isDocument(node: HTMLElement | Document): node is Document {
  return node === document;
};

function getMarginsForNode(node: HTMLElement) {
  const nodeStyles = window.getComputedStyle(node);

  return {
    activator: parseFloat(nodeStyles.marginTop || '0'),
    container: parseFloat(nodeStyles.marginBottom || '0'),
    horizontal: parseFloat(nodeStyles.marginLeft || '0'),
  };
}
</script>
