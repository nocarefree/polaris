import { onBeforeUnmount, onMounted, ref, computed, watchEffect } from 'vue';

import { debounce } from '@ncpl-polaris/utils/debounce';

export enum IndexFiltersMode {
  Default = 'DEFAULT',
  Filtering = 'FILTERING',
  EditingColumns = 'EDITING_COLUMNS',
}

const DEBOUNCE_PERIOD = 250;

export function useIsSticky(
  mode: IndexFiltersMode,
  disabled: boolean,
  isFlushWhenSticky: boolean,
) {
  const hasIOSupport =
    typeof window !== 'undefined' && Boolean(window.IntersectionObserver);

  const options = {
    root: null,
    rootMargin: `${isFlushWhenSticky ? '0px' : '-56px'} 0px 0px 0px`,
    threshold: 0,
  };

  const indexFilteringHeight = ref(0);
  const isSticky = ref(false);
  const measurerRef = ref<HTMLDivElement>();
  const intersectionRef = ref<HTMLDivElement>();

  const handleIntersect = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      isSticky.value = !entry.isIntersecting;
    });
  };

  const observer = hasIOSupport ? new IntersectionObserver(handleIntersect, options) : null;

  function computeDimensions() {
    const node = measurerRef.value;
    if (!node) {
      return {
        height: 0,
      };
    }
    const box = node.getBoundingClientRect();
    indexFilteringHeight.value = box.height;
  }

  const debouncedComputeDimensions = debounce(
    computeDimensions,
    DEBOUNCE_PERIOD,
    {
      trailing: true,
    },
  );

  onMounted(() => {
    computeDimensions();
    window.addEventListener('resize', debouncedComputeDimensions);
  })

  onBeforeUnmount(() => {
    observer?.disconnect();
    window.removeEventListener('resize', debouncedComputeDimensions);
  })

  watchEffect(() => {
    if (intersectionRef.value && observer) {
      observer.observe(intersectionRef.value);
    }
  })

  return {
    intersectionRef,
    measurerRef,
    isSticky: computed(() => isSticky.value && !disabled),
    indexFilteringHeight,
  };
}
