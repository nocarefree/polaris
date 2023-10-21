<template>
  <nav v-if="type == 'table'" :aria-label="navLabel" :ref="node" :className="classNames(styles.Pagination, styles.table)">
    <Box background="bg-surface-secondary" padding-bloc-start="150" padding-block-end="150" padding-inline-start="300"
      padding-inline-end="200">
      <InlineStack :align="labelComponent ? 'space-between' : 'end'" block-align="center">
        <Text as="span" variant="bodySm" font-weight="medium">
          <component :is="labelComponent"></component>
        </Text>
        <ButtonGroup variant="segmented">
          <component :is="constructedPrevious"></component>
          <component :is="constructedNext"></component>
        </ButtonGroup>
      </InlineStack>
    </Box>
  </nav>
  <nav v-else :aria-label="navLabel" ref="node" :class="styles.Pagination">
    <ButtonGroup variant="segmented">
      <component :is="constructedPrevious"></component>
      <Box v-if="labelComponent" padding="300" padding-block-start="0" padding-block-end="0">
        <div aria-live="polite">
          <span v-if="hasNext && hasPrevious">
            <component :is="labelComponent"></component>
          </span>
          <Text v-else tone="subdued" as="span">
            <component :is="labelComponent"></component>
          </Text>
        </div>
      </Box>
      <component :is="constructedNext"></component>
    </ButtonGroup>
  </nav>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, onUpdated, h, useSlots } from 'vue'
import type { PaginationProps } from './Pagination'
import ButtonGroup from "../ButtonGroup"
import Button from "../Button"
import Box from "../Box"
import Text from "../Text"
import Tooltip from "../Tooltip"
import styles from './Pagination.module.scss'
import { ChevronLeftMinor, ChevronRightMinor } from "@ncpl/ncpl-icons";
import { useI18n } from "../context"
import { useEventListener } from "@vueuse/core"
import { isInputFocused } from '@ncpl-polaris/utils/is-input-focused';
import { classNames } from "@ncpl-polaris/utils"

defineOptions({
  name: 'NpPagination',
})
const props = defineProps<PaginationProps>()
const emit = defineEmits(['previous', 'next'])
const node = ref();
const i18n = useI18n()
const slots = useSlots();

const navLabel = computed(() => {
  return props.accessibilityLabel || i18n.value.translate('Polaris.Pagination.pagination');
})

const previousLabel = computed(() => {
  return props.accessibilityLabels?.previous || i18n.value.translate('Polaris.Pagination.previous');
})

const nextLabel = computed(() => {
  return props.accessibilityLabels?.next || i18n.value.translate('Polaris.Pagination.next');
})

const labelComponent = computed(() => {
  return props.label ? typeof props.label === 'string' ? [props.label] : props.label : slots.label;
})

const constructedPrevious = computed(() => {
  const { previousURL, hasPrevious, previousTooltip } = props;
  const button = () => h(Button, {
    outline: true,
    icon: ChevronLeftMinor,
    accessibilityLabel: previousLabel.value,
    url: previousURL,
    onClick: emit('previous'),
    disabled: !hasPrevious,
    id: "previousURL"
  }, { default: null })
  return previousTooltip && hasPrevious ? () => h(Tooltip, { activatorWrapper: "span", content: previousTooltip, preferredPosition: "below" }, { default: button }) : button
})

const constructedNext = computed(() => {
  const { nextURL, hasNext, nextTooltip } = props;
  const button = () => h(Button, {
    outline: true,
    icon: ChevronRightMinor,
    accessibilityLabel: nextLabel.value,
    url: nextURL,
    onClick: emit('next'),
    disabled: !hasNext,
    id: "previousURL",
  }, { default: null })
  return nextTooltip && hasNext ? () => h(Tooltip, { activatorWrapper: "span", content: nextTooltip, preferredPosition: "below" }, { default: button }) : button
})

function clickPaginationLink(id: string, node?: HTMLElement) {
  return () => {
    if (node == null) {
      return;
    }

    const link: HTMLAnchorElement | null = node.querySelector(`#${id}`);
    if (link) {
      link.click();
    }
  };
}

let cleanpre: () => void, cleannext: () => void;
function bindKeys() {
  const { previousKeys, hasPrevious, previousURL, nextKeys, hasNext, nextURL } = props;

  if (previousKeys && previousKeys.length > 0 && hasPrevious) {
    cleanpre = useEventListener(window, 'keydown', (e) => {
      if (previousKeys.indexOf(e.keyCode) > -1 && !isInputFocused()) {
        previousURL ? clickPaginationLink('previousURL', node.value) : emit('previous')
      }
    })
  } else {
    cleanpre && cleanpre();
  }

  if (nextKeys && nextKeys.length > 0 && hasNext) {
    cleannext = useEventListener(window, 'keydown', (e) => {
      if (nextKeys.indexOf(e.keyCode) > -1 && !isInputFocused()) {
        nextURL ? clickPaginationLink('nextURL', node.value) : emit('next')
      }
    })
  } else {
    cleannext && cleannext();
  }
}

onMounted(bindKeys)
onUpdated(bindKeys)

</script>
