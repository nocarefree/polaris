<template>
  <template v-if="sortable">
    <div v-if="(!sortTooltipContent || indexTable.selectMode)" :class="styles.SortableTableHeadingWithCustomMarkup">
      <UnstyledButton v-bind="defaultSortButtonProps">
        <span :class="classNames(styles.TableHeadingSortIcon, alignment === 'end' &&
    styles['TableHeadingSortIcon-heading-align-end'], isCurrentlySorted &&
  styles['TableHeadingSortIcon-visible'],)">
          <SourceComponent focusable="false" aria-hidden="true" :class="styles.TableHeadingSortSvg" />
        </span>
        <span :class="classNames(
    sortTooltipContent &&
    indexTable.selectMode &&
    tooltipContent &&
    styles.TableHeadingTooltipUnderlinePlaceholder,
  )">
          <slot></slot>
        </span>
      </UnstyledButton>
    </div>
    <Tooltip v-if="!tooltipContent" v-bind="defaultTooltipProps" :content="sortTooltipContent"
      preferredPosition="above">
      <UnstyledButton v-bind="defaultSortButtonProps">
        <span :class="classNames(
    styles.TableHeadingSortIcon,
    alignment === 'end' &&
    styles['TableHeadingSortIcon-heading-align-end'],
    isCurrentlySorted && styles['TableHeadingSortIcon-visible'],
  )">
          <SourceComponent focusable="false" aria-hidden="true" :class="styles.TableHeadingSortSvg" />
        </span>
        <span :class="classNames(
    sortTooltipContent &&
    indexTable.selectMode &&
    tooltipContent &&
    styles.TableHeadingTooltipUnderlinePlaceholder,
  )">
          <slot></slot>
        </span>
      </UnstyledButton>
    </Tooltip>
    <div v-else :class="styles.SortableTableHeadingWithCustomMarkup">
      <UnstyledButton v-bind="defaultSortButtonProps">
        <Tooltip activator-wrapper="div" v-bind="defaultTooltipProps" padding="400" border-radius="200"
          preferred-position="above" :content="tooltipContent">
          <span :class="styles.TableHeadingUnderline">
            <slot></slot>
          </span>
        </Tooltip>

        <Tooltip activator-wrapper="div" v-bind="defaultTooltipProps" :content="sortTooltipContent"
          preferredPosition="above">
          <span :class="classNames(styles.TableHeadingSortIcon, alignment === 'end' &&
    styles['TableHeadingSortIcon-heading-align-end'], isCurrentlySorted && styles['TableHeadingSortIcon-visible'],
  )">
            <SourceComponent focusable=" false" aria-hidden="true" :class="styles.TableHeadingSortSvg" />
          </span>
        </Tooltip>
      </UnstyledButton>
    </div>
  </template>
  <Tooltip v-else-if="tooltipContent" v-bind="defaultTooltipProps" padding="400" border-radius="200"
    preferred-position="above" :content="tooltipContent" activator-wrapper="span">
    <span :class="classNames(styles.TableHeadingUnderline, styles.SortableTableHeaderWrapper,)">
      <slot></slot>
    </span>
  </Tooltip>
  <slot v-else></slot>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useIndexTable } from '../../context';
import type { HeaderContentProps } from "../types"
import UnstyledButton from "../../UnstyledButton"
import Tooltip from "../../Tooltip"
import styles from "../IndexTable.module.scss";
import { classNames } from "../../../utils";
import { SortAscendingIcon, SortDescendingIcon } from "@ncpl/ncpl-icons"



const props = defineProps<HeaderContentProps>();


const indexTable = useIndexTable();
const renderAfterSelectEvent = ref(false);
const emit = defineEmits(['sort']);
const hasSelected = ref(false);
const lastSortedColumnIndex = ref<number | undefined>(indexTable.value.sortColumnIndex)


const handleSortHeadingClick = () => {
  const isAscending = indexTable.value.sortDirection === 'ascending';
  let newDirection: any = props.defaultSortDirection;
  if (isCurrentlySorted.value) {
    newDirection = isAscending ? 'descending' : 'ascending';
  }

  renderAfterSelectEvent.value = false;
  hasSelected.value = false;
  lastSortedColumnIndex.value = indexTable.value.sortColumnIndex;
  emit('sort', props.index, newDirection);
}


const isCurrentlySorted = computed(() => {
  return props.index === indexTable.value.sortColumnIndex;
})

const isPreviouslySorted = computed(() => {
  return !isCurrentlySorted && props.index === lastSortedColumnIndex.value;
})

const defaultTooltipProps = computed(() => {
  return {
    width: props.tooltipWidth ?? 'default',
    onClick: props.tooltipPersistsOnClick,
  };
});



const SourceComponent = computed(() => {
  let newDirection: any = props.defaultSortDirection;
  let SourceComponent =
    newDirection === 'ascending' ? SortAscendingIcon : SortDescendingIcon;
  if (isCurrentlySorted) {
    SourceComponent =
      indexTable.value.sortDirection === 'ascending'
        ? SortAscendingIcon
        : SortDescendingIcon;
  }
  return SourceComponent;
})

const defaultSortButtonProps = computed(() => {

  return {
    onClick: handleSortHeadingClick,
    class: classNames(
      styles.TableHeadingSortButton,
      !isCurrentlySorted.value && props.alignment === 'end' && styles['TableHeadingSortButton-heading-align-end'],
      isCurrentlySorted.value && props.alignment === 'end' && styles['TableHeadingSortButton-heading-align-end-currently-sorted'],
      isPreviouslySorted.value && !renderAfterSelectEvent.value && props.alignment === 'end' && styles['TableHeadingSortButton-heading-align-end-previously-sorted'],
    ),
    tabindex: indexTable.value.selectMode ? -1 : 0,
  }
});

</script>