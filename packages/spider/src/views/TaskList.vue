<template>
  <NpPage title="产品" full-width>
    <template #primaryAction>
      <NpButton variant="primary">添加任务</NpButton>
    </template>


    <NpCard padding="0">
      <NpIndexFilters 
        :mode="IndexFiltersMode.Default" 
        v-model:selected="viewSelected" 
        :tabs="views"
        v-mode:sort-selected="sortSelected"
        :sort-options="sortOptions"
        v-mode:query-value="queryValue"

        can-create-new-view
        >
      </NpIndexFilters>
      <NpIndexTable></NpIndexTable>
    </NpCard>

  </NpPage>
</template> 
<script setup lang="ts">
import { ref } from "vue";
import { NpPage, NpButton, NpCard, NpIndexFilters, NpIndexTable, IndexFiltersMode } from "@ncpl/ncpl-polaris";

const viewSelected = ref(0);
const views = [
  { id: "1", content: '全部' },
  { id: "2", content: '采集中' },
  { id: "3", content: '已完成' },
];

const sortSelected = ref([]);
const sortOptions = [
  { label: '任务号', value: 'task asc', directionLabel: 'Ascending' },
  { label: '任务号', value: 'task desc', directionLabel: 'Descending' },
  { label: '线程', value: 'process asc', directionLabel: 'Ascending' },
  { label: '线程', value: 'process desc', directionLabel: 'Ascending' },
  { label: '名称', value: 'name asc', directionLabel: 'A-Z' },
  { label: '名称', value: 'name desc', directionLabel: 'A-Z' },
  { label: '状态', value: 'status asc', directionLabel: 'A-Z' },
  { label: '状态', value: 'status desc', directionLabel: 'A-Z' }
];

const queryValue = ref("")



</script>