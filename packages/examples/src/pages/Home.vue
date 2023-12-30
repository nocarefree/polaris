<template>
  <NpPageActions :primary-action="{ content: 'Save' }" :secondary-actions="[{ content: 'Delete', destructive: true }]" />


  <NpCard padding="0">
    <div :style="{
      alignItems: 'stretch',
      borderTop: '1px solid #DFE3E8',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'stretch',
      position: 'relative',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
    }">
      <div :style="{ padding: '12px' }">
        <NpTextField :focused="showFooterAction" clear-button label-hidden label="Customer segments"
          placeholder="Search segments" auto-complete="off" v-model="searchValue" :aria-active-descendant="activeOptionId"
          :aria-controls="listboxId" @clearButtonClick="searchValue = ''">
          <template name="prefix">
            <NpIcon :source="SearchMinor" />
          </template>
        </NpTextField>
      </div>

      <NpScrollable shadow :style="{
        position: 'relative',
        height: '292px',
        padding: 'var(--p-space-200) 0',
        borderBottomLeftRadius: 'var(--p-border-radius-200)',
        borderBottomRightRadius: 'var(--p-border-radius-200)',
      }" @scrolledToBottom="handleLazyLoadSegments">
        <NpListbox enable-keyboard-control :auto-selection="AutoSelection.FirstSelected"
          accessibility-label="Search for and select a customer segment" :custom-list-id="listboxId"
          @select="handleSegmentSelect" @activeOptionChange="e => activeOptionId = e">
          <template v-if="segmentOptions.length > 0">
            <template v-for="({ label, id, value }) in segmentOptions.slice(0, visibleOptionIndex)">
              <NpListboxOption :value="value" :selected="segments[selectedSegmentIndex].value === value">
                <NpListboxTextOption :selected="segments[selectedSegmentIndex].value === value">
                  {{ label }}
                </NpListboxTextOption>
              </NpListboxOption>
            </template>


          </template>
          <NpListboxAction v-if="showFooterAction" :value="actionValue">
            <span :style="{ color: 'var(--p-color-text-emphasis)' }">
              Show all 111 segments
            </span>
          </NpListboxAction>
          <NpEmptySearchResult v-if="segmentOptions.length === 0" title=""
            :description='`No segments found matching "${searchValue}"`' />
          <NpListboxLoading v-if="lazyLoading"
            :accessibility-label="`${searchValue ? 'Filtering' : 'Loading'} customer segments`" />
        </NpListbox>
      </NpScrollable>
    </div>
  </NpCard>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import { NpPageActions, NpIcon, NpCard, NpTextField, NpListbox, NpScrollable, NpListboxAction, NpListboxLoading, AutoSelection, NpListboxOption, NpListboxTextOption, NpEmptySearchResult } from "@ncpl/ncpl-polaris"
import { SearchMinor, NoteMinor, CirclePlusMinor } from "@ncpl/ncpl-icons";


const segments = [
  {
    label: 'All customers',
    id: 'gid://shopify/CustomerSegment/1',
    value: '0',
  },
  {
    label: 'VIP customers',
    id: 'gid://shopify/CustomerSegment/2',
    value: '1',
  },
  {
    label: 'New customers',
    id: 'gid://shopify/CustomerSegment/3',
    value: '2',
  },
  {
    label: 'Abandoned carts - last 30 days',
    id: 'gid://shopify/CustomerSegment/4',
    value: '3',
  },
  {
    label: 'Wholesale customers',
    id: 'gid://shopify/CustomerSegment/5',
    value: '4',
  },
  {
    label: 'Email subscribers',
    id: 'gid://shopify/CustomerSegment/6',
    value: '5',
  },
  {
    label: 'From New York',
    id: 'gid://shopify/CustomerSegment/7',
    value: '6',
  },
  {
    label: 'Repeat buyers',
    id: 'gid://shopify/CustomerSegment/8',
    value: '7',
  },
  {
    label: 'First time buyers',
    id: 'gid://shopify/CustomerSegment/9',
    value: '8',
  },
  {
    label: 'From Canada',
    id: 'gid://shopify/CustomerSegment/10',
    value: '9',
  },
  {
    label: 'Bought in last 60 days',
    id: 'gid://shopify/CustomerSegment/11',
    value: '10',
  },
  {
    label: 'Bought last BFCM',
    id: 'gid://shopify/CustomerSegment/12',
    value: '11',
  },
];

const lazyLoadSegments = Array.from(Array(100)).map((_, index) => ({
  label: `Other customers ${index + 13}`,
  id: `gid://shopify/CustomerSegment/${index + 13}`,
  value: `${index + 12}`,
}));


segments.push(...lazyLoadSegments);

const listboxId = 'SearchableListbox';
const searchValue = ref('');
const showFooterAction = ref(true);
const visibleOptionIndex = ref(6);
const activeOptionId = ref(segments[0].id)
const selectedSegmentIndex = ref(0);
const actionValue = '__ACTION__';
const lazyLoading = ref(false);
const willLoadMoreResults = ref(true);

const segmentOptions = computed(() => {
  if (!searchValue.value) return segments;

  return segments.filter((segment) => {
    return segment.label
      .toLocaleLowerCase()
      .includes(searchValue.value.toLocaleLowerCase().trim());
  });
});

const interval = 25;

const handleSelectionChange = () => { }
const handleLazyLoadSegments = () => {
  if (willLoadMoreResults.value && !showFooterAction.value) {
    lazyLoading.value = true;

    setTimeout(() => {
      const remainingOptionCount = segmentOptions.value.length - visibleOptionIndex.value;
      const nextVisibleOptionIndex =
        remainingOptionCount >= interval
          ? visibleOptionIndex.value + interval
          : visibleOptionIndex.value + remainingOptionCount;

      lazyLoading.value = false;
      visibleOptionIndex.value = nextVisibleOptionIndex;

      if (remainingOptionCount <= interval) {
        willLoadMoreResults.value = false;
      }
    }, 1000);
  }
}
const handleChange = () => { }

const handleClickShowAll = () => {
  showFooterAction.value = false;
  visibleOptionIndex.value = segments.length;
};

const handleSegmentSelect = (segmentIndex) => {
  if (segmentIndex === actionValue) {
    return handleClickShowAll();
  }

  selectedSegmentIndex.value = (Number(segmentIndex));
}
</script>