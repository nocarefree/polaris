import { ref, type MaybeRef, unref, onMounted, onBeforeUnmount } from 'vue';

import { debounce } from '@ncpl-polaris/utils/debounce';

const DEBOUNCE_PERIOD = 250;

const PADDING_IN_SELECT_MODE = 92;

export function useIsBulkActionsSticky(selectMode: MaybeRef<boolean>) {
  const hasIOSupport =
    typeof window !== 'undefined' && Boolean(window.IntersectionObserver);
  const isBulkActionsSticky = ref(false);
  const bulkActionsAbsoluteOffset = ref(0);
  const bulkActionsMaxWidth = ref(0);
  const bulkActionsOffsetLeft = ref(0);
  const bulkActionsIntersectionRef = ref<HTMLDivElement>();
  const tableMeasurerRef = ref<HTMLDivElement>();

  const handleIntersect = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      isBulkActionsSticky.value = !entry.isIntersecting;
    });
  };

  const options = {
    root: null,
    rootMargin: '-12px',
    threshold: 0,
  };
  const observerRef = ref<IntersectionObserver | null>(
    hasIOSupport ? new IntersectionObserver(handleIntersect, options) : null,
  );

  const computeTableDimensions = () => {
    const node = tableMeasurerRef.value;
    if (!node) {
      return {
        maxWidth: 0,
        offsetHeight: 0,
        offsetLeft: 0,
      };
    }
    const box = node.getBoundingClientRect();
    const paddingHeight = unref(selectMode) ? PADDING_IN_SELECT_MODE : 0;
    const offsetHeight = box.height - paddingHeight;
    const maxWidth = box.width;
    const offsetLeft = box.left;

    bulkActionsAbsoluteOffset.value = offsetHeight;
    bulkActionsMaxWidth.value = maxWidth;
    bulkActionsOffsetLeft.value = offsetLeft
  }

  const debouncedComputeTableHeight = debounce(
    computeTableDimensions,
    DEBOUNCE_PERIOD,
    {
      trailing: true,
    },
  );

  onMounted(() => {
    computeTableDimensions();

    const observer = observerRef.value;
    if (!observer) {
      return;
    }

    const node = bulkActionsIntersectionRef.value;

    if (node) {
      observer.observe(node);
    }


    window.addEventListener('resize', debouncedComputeTableHeight);

  });

  onBeforeUnmount(() => {
    const observer = observerRef.value
    observer?.disconnect();
    window.removeEventListener('resize', debouncedComputeTableHeight);
  })

  return {
    bulkActionsIntersectionRef,
    tableMeasurerRef,
    isBulkActionsSticky,
    bulkActionsAbsoluteOffset,
    bulkActionsMaxWidth,
    bulkActionsOffsetLeft,
    computeTableDimensions,
  };
}
