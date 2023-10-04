<template>
  <template v-if="sortable">
    <div v-if="(!sortTooltipContent || indexTable.selectMode)" :className="styles.SortableTableHeadingWithCustomMarkup">
      <UnstyledButton v-bind="defaultSortButtonProps">
        <span :className="classNames(styles.TableHeadingSortIcon, heading?.alignment === 'end' &&
          styles['TableHeadingSortIcon-heading-align-end'], isCurrentlySorted &&
        styles['TableHeadingSortIcon-visible'],)">
          <SourceComponent focusable="false" aria-hidden="true" :className="styles.TableHeadingSortSvg" />
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
    <Tooltip v-if="!tooltipContent" v-bind="defaultTooltipProps" :content="sortTooltipContent" preferredPosition="above">
      <UnstyledButton v-bind="defaultSortButtonProps">
        <span :class="classNames(
          styles.TableHeadingSortIcon,
          alignment === 'end' &&
          styles['TableHeadingSortIcon-heading-align-end'],
          isCurrentlySorted && styles['TableHeadingSortIcon-visible'],
        )">
          <SourceComponent focusable="false" aria-hidden="true" :className="styles.TableHeadingSortSvg" />
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
    <div v-else :className="styles.SortableTableHeadingWithCustomMarkup">
      <UnstyledButton v-bind="defaultSortButtonProps">
        <Tooltip v-bind="defaultHeaderTooltipProps">
          <span :className="styles.TableHeadingUnderline">
            <slot></slot>
          </span>
        </Tooltip>

        <Tooltip v-bind="defaultTooltipProps" :content="sortTooltipContent" preferredPosition="above">
          <span :className="classNames(styles.TableHeadingSortIcon, alignment === 'end' &&
            styles['TableHeadingSortIcon-heading-align-end'], isCurrentlySorted && styles['TableHeadingSortIcon-visible'],
          )">
            <SourceComponent focusable=" false" aria-hidden="true" :className="styles.TableHeadingSortSvg" />
          </span>
        </Tooltip>
      </UnstyledButton>
    </div>
  </template>
  <Tooltip v-else-if="tooltipContent" v-bind="defaultHeaderTooltipProps" activatorWrapper="span">
    <span :className="classNames(styles.TableHeadingUnderline, styles.SortableTableHeaderWrapper,)">
      <slot></slot>
    </span>
  </Tooltip>
  <slot v-else></slot>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useIndexTable } from '../../context';
import type { HeaderContentProps } from "./HeaderContent"
import { styles } from "../IndexTable.module.scss";
import { classNames } from "@ncpl-polaris/utils";
import { SortAscendingMajor, SortDescendingMajor } from "@ncpl/ncpl-icons"


type IndexTableSortDirection = 'ascending' | 'descending';

const props = defineProps<HeaderContentProps>();


const indexTable = useIndexTable();
const renderAfterSelectEvent = ref(false);
const emit = defineEmits(['sort']);


const handleSortHeadingClick = () => {
  renderAfterSelectEvent.value = false;
  hasSelected.current = false;
  indexTable.value.lastSortedColumnIndex = indexTable.value.sortColumnIndex;
  emit('sort', props.index, direction);
}


const isCurrentlySorted = computed(() => {
  return props.index === indexTable.value.sortColumnIndex;
})

const isPreviouslySorted = computed(() => {
  return !isCurrentlySorted && props.index === indexTable.value.lastSortedColumnIndex;
})

const defaultTooltipProps = computed(() => {
  return {
    width: props.tooltipWidth ?? 'default',
    activatorWrapper: 'div',
    onClick: props.tooltipPersistsOnClick,
  };
});



const SourceComponent = computed(() => {
  const isAscending = indexTable.value.sortDirection === 'ascending';
  let newDirection: any = props.defaultSortDirection;
  let SourceComponent =
    newDirection === 'ascending' ? SortAscendingMajor : SortDescendingMajor;
  if (isCurrentlySorted) {
    SourceComponent =
      indexTable.value.sortDirection === 'ascending'
        ? SortAscendingMajor
        : SortDescendingMajor;
  }
  return SourceComponent;
})

const defaultSortButtonProps = computed(() => {
  const isAscending = indexTable.value.sortDirection === 'ascending';
  let newDirection: any = props.defaultSortDirection;
  if (isCurrentlySorted.value) {
    newDirection = isAscending ? 'descending' : 'ascending';
  }

  return {
    onClick: handleSortHeadingClick,
    className: classNames(
      styles.TableHeadingSortButton,
      !isCurrentlySorted.value && props.alignment === 'end' && styles['TableHeadingSortButton-heading-align-end'],
      isCurrentlySorted.value && props.alignment === 'end' && styles['TableHeadingSortButton-heading-align-end-currently-sorted'],
      isPreviouslySorted.value && !renderAfterSelectEvent.value && props.alignment === 'end' && styles['TableHeadingSortButton-heading-align-end-previously-sorted'],
    ),
    tabIndex: indexTable.value.selectMode ? -1 : 0,
  }
});

const defaultHeaderTooltipProps = computed(() => {
  return {
    ...defaultTooltipProps,
    padding: '4',
    borderRadius: '2',
    content: props.tooltipContent,
    preferredPosition: 'above',
  };
})
</script>