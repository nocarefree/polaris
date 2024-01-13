<template>
  <NpPage title="任务" full-width>
    <template #primaryAction>
      <NpButton variant="primary" @click="router.push('/tasks/new')">添加任务</NpButton>
    </template>


    <NpCard padding="0">
      <template v-if="tasks && tasks.data.length > 0">
        <NpIndexFilters :mode="IndexFiltersMode.Default" v-model:selected="viewSelected" :tabs="views"
          v-model:sort-selected="sortSelected" :sort-options="sortOptions" v-model:query-value="queryValue"
          :filters="filters" can-create-new-view>
        </NpIndexFilters>
        <NpIndexTable :resource-name="resourceName" :headings="[{ title: 'ID' }, { title: '名称' }]"
          :item-count="tasks.data.length" selectable v-model:selected="selectedResources">
          <NpIndexTableRow v-for="(task, index) in tasks.data" :id="task.id" :key="task.id"
            :selected="selectedResources == 'All' || selectedResources.includes(task.id)" :position="index">
            <NpIndexTableCell>
              <NpText variant="bodyMd" font-weight="bold" as="span">
                #{{ task.id }}
              </NpText>
            </NpIndexTableCell>
            <NpIndexTableCell>
              <NpText>
                {{ task.name }}
              </NpText>
            </NpIndexTableCell>
          </NpIndexTableRow>
        </NpIndexTable>
      </template>
      <template v-else>
        <NpEmptyState heading="没有任何任务" :action="{ content: '创建任务', url: '/tasks/new' }"
          image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
          :secondary-action="{ content: '了解详细信息', url: '' }">
          <p>请创建你的任务</p>
        </NpEmptyState>
      </template>
    </NpCard>

  </NpPage>
</template> 
<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import request from "../request";
import { NpPage, NpButton, NpCard, NpIndexFilters, NpIndexTable, IndexFiltersMode, NpEmptyState, NpIndexTableRow, NpIndexTableCell, NpText } from "@ncpl/ncpl-polaris";

const router = useRouter();

const resourceName = {
  singular: 'tasks',
  plural: 'tasks',
};

const filters = [];

const tasks = ref<{
  total: number;
  data: {
    id: string,
    name: string,
  }[];
}>({
  total: 0,
  data: [],
})

request.get('/tasks').then((data) => {
  tasks.value = data;
})

const selectedResources = ref<string[] | 'All'>([]);

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