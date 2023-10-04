<template>
  <component :is="wrapper" @mouseleave="handleMouseLeave" @mouseenter="handleMouseEnterFix"
    @mousedown="persistOnClick ? togglePersisting() : undefined" ref="activatorContainer" @keyup="handleKeyUp"
    :class="wrapperClassNames">
    <slot></slot>
    <Portal id-prefix="tooltip">
      <TooltipOverlay v-bind="overlayProps">
        <slot v-if="$slots.content" name="content"></slot>
        <template v-else-if="typeof content == 'string'">{{ content }}</template>
        <component v-else :is="content"></component>
      </TooltipOverlay>
    </Portal>
  </component>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { TooltipProps } from './Tooltip'
import { useFeatures, useId } from '../context';
import Portal from "@ncpl-polaris/components/Portal";
import TooltipOverlay from "./TooltipOverlay/TooltipOverlay.vue";
import styles from './Tooltip.module.scss';
import { classNames } from "@ncpl-polaris/utils";
import { findFirstFocusableNode } from "@ncpl-polaris/utils/focus"
import { useEventListener } from "@vueuse/core";

defineOptions({
  name: 'NpTooltip',
})
const props = defineProps<TooltipProps>()
const emit = defineEmits(['open', 'close']);

const id = useId();
const activatorContainer = ref();
const shouldAnimate = ref<boolean>(Boolean(!props.active))
const _active = ref<boolean>(Boolean(props.active));
const mouseEntered = ref<boolean>(false)
const hoverDelayTimeout = ref<any>()
const persist = ref(Boolean(props.active) && Boolean(props.persistOnClick))

const { polarisSummerEditions2023 } = useFeatures();

const wrapper = computed(() => {
  return props.activatorWrapper || 'span';
})

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

const overlayProps = computed(() => {
  const { preferredPosition = 'above', accessibilityLabel, dismissOnMouseOut, width = 'default', padding = 'default', borderRadius, zIndexOverride } = props;
  return {
    id: id.value,
    preferredPosition,
    accessibilityLabel,
    activator: activatorNode.value,
    active: _active.value,
    preventInteraction: dismissOnMouseOut,
    width,
    padding,
    borderRadius: borderRadius || (polarisSummerEditions2023 ? '2' : '1'),
    zIndexOverride,
    instant: shouldAnimate.value,
    onmouseleave: handleMouseLeave,
    onmouseover: handleMouseEnterFix
  }
})

const wrapperClassNames = computed(() => {
  return classNames(
    wrapper.value == 'div' && styles.TooltipContainer,
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
}
const handleMouseLeave = () => {
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
