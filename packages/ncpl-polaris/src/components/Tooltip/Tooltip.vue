<template>
  <component :is="activatorWrapper" @mouseleave="handleMouseLeave" @mouseenter="handleMouseEnterFix"
    @mousedown="persistOnClick ? togglePersisting() : undefined" ref="activatorContainer" @keyup="handleKeyUp"
    :class="wrapperClassNames">
    <slot></slot>
    <Portal id-prefix="tooltip">
      <TooltipOverlay ref="overlay" @mouseleave="handleMouseLeave" @mouseenter="handleMouseEnterFix" :id="id"
        :preferred-position="preferredPosition" :activator="activatorNode" :active="_active"
        :accessibility-label="accessibilityLabel" :prevent-interaction="dismissOnMouseOut" :width="width"
        :padding="padding" :border-radius="borderRadius" :z-index-override="zIndexOverride" :instant="!shouldAnimate">
        <slot v-if="$slots.content" name="content"></slot>
        <component v-else :is="()=>[content]"></component>
      </TooltipOverlay>
    </Portal>
  </component>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { TooltipProps } from './Tooltip'
import { useId } from '../context';
import Portal from "../Portal";
import TooltipOverlay from "./TooltipOverlay/TooltipOverlay.vue";
import styles from './Tooltip.module.scss';
import { classNames } from "../../utils";
import { findFirstFocusableNode } from "../../utils/focus"
import { useEventListener } from "@vueuse/core";

const HOVER_OUT_TIMEOUT = 150;

defineOptions({
  name: 'NpTooltip',
})
const props = withDefaults(defineProps<TooltipProps>(), {
  preferredPosition: 'above',
  activatorWrapper: 'span',
  width: 'default',
  padding: 'default',
  borderRadius: '200',
})
const emit = defineEmits(['open', 'close']);

const id = useId();
const activatorContainer = ref();
const overlay = ref();
const shouldAnimate = ref<boolean>(Boolean(!props.active))
const _active = ref<boolean>(Boolean(props.active));
const mouseEntered = ref<boolean>(false)
const hoverDelayTimeout = ref<any>()
const persist = ref(Boolean(props.active) && Boolean(props.persistOnClick))

const activatorNode = computed(() => {
  return activatorContainer.value?.firstElementChild;
})

const firstFocusable = computed(() => {
  if (activatorNode.value) {
    const firstFocusable = activatorNode.value
      ? findFirstFocusableNode(activatorNode.value)
      : null;
    const accessibilityNode = firstFocusable || activatorNode.value;

    return accessibilityNode;

    if (!accessibilityNode) return;

    accessibilityNode.tabIndex = 0;
    accessibilityNode.setAttribute('aria-describedby', id.value);
    accessibilityNode.setAttribute('data-polaris-tooltip-activator', 'true');
  }
  return undefined;
})


const wrapperClassNames = computed(() => {
  return classNames(
    props.activatorWrapper == 'div' && styles.TooltipContainer,
    props.hasUnderline && styles.HasUnderline,
  );
})

const presenceList = { tooltip: false };

const handleOpen = () => {
  //shouldAnimate.value = !presenceList.tooltip && !_active.value;
  emit('open');
}

let a: any = 0;
const handleFocus = () => {
  _active.value = true;
  a && clearTimeout(a)
}
const handleBlur = () => {
  a = setTimeout(() => {
    _active.value = false;
  })

}
const handleClose = () => {
  //shouldAnimate.value = false;
  emit('close');
  a = setTimeout(() => {
    //removePresence('tooltip');
  }, HOVER_OUT_TIMEOUT);
}
const handleMouseLeave = (event: MouseEvent) => {

  let rect;
  const overlayEl = overlay.value?.$el;
  rect = overlayEl?.getBoundingClientRect?.();
  if (rect && event.target != overlayEl) {
    if (event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom) {
      return true;
    }
  }

  if (activatorContainer.value && event.target != activatorContainer.value) {
    rect = activatorContainer.value.getBoundingClientRect();
    if (event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom) {
      return true;
    }
  }

  if (hoverDelayTimeout.value) {
    clearTimeout(hoverDelayTimeout.value);
    hoverDelayTimeout.value = null;
  }

  mouseEntered.value = false;
  handleClose();

  if (!persist.value) {
    handleBlur();
  }
}
const handleMouseEnterFix = () => {
  if (!mouseEntered.value) {
    mouseEntered.value = true;
    if (props.hoverDelay && !presenceList.tooltip) {
      hoverDelayTimeout.value = setTimeout(() => {
        handleOpen();
        handleFocus();
      }, props.hoverDelay);
    } else {
      handleOpen();
      handleFocus();
    }

  }
}
const handleKeyUp = (event: KeyboardEvent) => {
  if (event.key !== 'Escape') return;
  handleClose();
  handleBlur();
  props.persistOnClick && togglePersisting();
}

const togglePersisting = () => {
  persist.value = !persist.value;
}

watch(() => props.active, () => {
  if (props.active === false && _active.value) {
    handleClose();
    handleBlur();
  }
});

watch(() => [props.active, props.persistOnClick], () => {
  persist.value = Boolean(props.active) && Boolean(props.persistOnClick);
});

watch(() => firstFocusable.value, () => {
  if (firstFocusable.value) {
    firstFocusable.value.tabIndex = 0;
    firstFocusable.value.setAttribute('aria-describedby', id.value);
    firstFocusable.value.setAttribute('data-polaris-tooltip-activator', 'true');
  }
})

useEventListener(firstFocusable, 'focus', () => {
  handleOpen();
  handleFocus();
})
useEventListener(firstFocusable, 'blur', () => {
  handleClose();
  handleBlur();
  if (props.persistOnClick) {
    togglePersisting();
  }
})


</script>
