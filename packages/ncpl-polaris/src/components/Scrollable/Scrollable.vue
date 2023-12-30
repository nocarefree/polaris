<template>
  <div :class="finalClassName" v-bind="scrollable.props" ref="scrollArea" :tabIndex="focusable ? 0 : undefined">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { scrollable } from "@ncpl-polaris/components/shared";
import { classNames, StickyManager } from "@ncpl-polaris/utils";
import { stickyManagerContext, scrollableContext } from "../context";
import { scrollableProps } from './Scrollable'
import styles from './Scrollable.module.scss'
import { debounce } from "@ncpl-polaris/utils/debounce";


interface ScrollToOptions {
  behavior?: 'instant' | 'smooth' | 'auto';
}

const MAX_SCROLL_HINT_DISTANCE = 100;
const LOW_RES_BUFFER = 2;

defineOptions({
  name: 'NpScrollable',
})
const props = defineProps(scrollableProps);
const emit = defineEmits(['scrolledToBottom']);

const scrollArea = ref();
const topShadow = ref(false);
const bottomShadow = ref(false);

const finalClassName = computed(() => {
  const { vertical, shadow, horizontal } = props;

  return classNames(
    styles.Scrollable,
    vertical && styles.vertical,
    horizontal && styles.horizontal,
    shadow && topShadow.value && styles.hasTopShadow,
    shadow && bottomShadow.value && styles.hasBottomShadow,
  );
})

const handleScroll = () => {
  const currentScrollArea = scrollArea.value;

  if (!currentScrollArea) {
    return;
  }

  requestAnimationFrame(() => {
    const { scrollTop, clientHeight, scrollHeight } = currentScrollArea;
    const canScroll = Boolean(scrollHeight > clientHeight);

    topShadow.value = Boolean(scrollTop > 0);
    const isAtBottomOfScroll = Boolean(
      scrollTop + clientHeight >= scrollHeight - LOW_RES_BUFFER,
    );
    bottomShadow.value = !isAtBottomOfScroll;


    if (canScroll && isAtBottomOfScroll) {
      emit('scrolledToBottom');
    }
  });
};

const prefersReducedMotion = () => {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (err) {
    return false;
  }
};

const scrollTo = (scrollY: number, options: ScrollToOptions = {}): void => {
  const optionsBehavior = options.behavior || 'smooth';
  const behavior = prefersReducedMotion() ? 'auto' : optionsBehavior;
  scrollArea.value?.scrollTo({ top: scrollY, behavior });
};

const performScrollHint = (elem?: HTMLDivElement | null) => {
  if (!elem || prefersReducedMotion()) {
    return;
  }

  const scrollableDistance = elem.scrollHeight - elem.clientHeight;
  const distanceToPeek =
    Math.min(MAX_SCROLL_HINT_DISTANCE, scrollableDistance) - LOW_RES_BUFFER;

  const goBackToTop = () => {
    requestAnimationFrame(() => {
      if (elem.scrollTop >= distanceToPeek) {
        elem.removeEventListener('scroll', goBackToTop);
        elem.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  };

  elem.addEventListener('scroll', goBackToTop);
  elem.scrollTo({ top: MAX_SCROLL_HINT_DISTANCE, behavior: 'smooth' });
}

const stickyManager = new StickyManager();

scrollableContext.provide(scrollTo);
stickyManagerContext.provide(stickyManager)

onMounted(() => {
  if (scrollArea.value) {
    stickyManager.setContainer(scrollArea.value);
    handleScroll();

    const handleResize = debounce(handleScroll, 50, { trailing: true });

    scrollArea.value.addEventListener('scroll', handleScroll);
    globalThis.addEventListener('resize', handleResize);
  }


  if (props.hint) {
    requestAnimationFrame(() => performScrollHint(scrollArea.value));
  }




});
</script>
