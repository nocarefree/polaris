<template>
  <NpLoading v-if="tasksLoading"></NpLoading>
  <SkeletonList v-if="firstLoading" />
  <NpPage v-else title="任务" full-width>
    <template #primaryAction>
      <NpButton variant="primary" @click="router.push('/tasks/new')">添加任务</NpButton>
    </template>
    <NpCard padding="0">
      <template v-if="result?.tasks?.data?.length > 0">
        <NpIndexFilters :mode="IndexFiltersMode.Default" v-model:selected="viewSelected" :tabs="views"
          v-model:sort-selected="sortSelected" :sort-options="sortOptions" v-model:query-value="queryValue"
          :filters="filters" can-create-new-view>
        </NpIndexFilters>
        <NpIndexTable :resource-name="resourceName" :has-more-items="true"
          :headings="[{ title: 'ID' }, { title: '任务名' }, { title: '抓取数量' }, { title: '产品数量' }, { title: '状态' }, { title: '状态' }]"
          :rows="result.tasks.data" :pagination="taskPagination" :promoted-bulk-actions="promotedBulkActions"
          :bulk-actions="bulkActions" v-model:selected="selectedResources">
          <template #default="{ index, row: task }">
            <NpIndexTableRow :id="task.id" :selected="selectedResources == 'All' || selectedResources.includes(task.id)"
              :position="index">
              <NpIndexTableCell>
                <NpText variant="bodyMd" font-weight="bold" as="span">
                  <NpButton variant="plain" @click="router.push(`/ task / ${task.id} `)">#{{ task.id }}</NpButton>
                </NpText>
              </NpIndexTableCell>
              <NpIndexTableCell>
                <NpText>
                  {{ task.name }}
                </NpText>
              </NpIndexTableCell>
              <NpIndexTableCell>
                <NpInlineStack gap="200" block-align="center">
                  <NpButton :icon="DeleteMinor" variant="tertiary" :loading="task.loading" @click="onClearMap(task)">
                  </NpButton>
                  <NpText>{{ task.maps_count }}</NpText>
                </NpInlineStack>
              </NpIndexTableCell>
              <NpIndexTableCell>
                <NpInlineStack gap="200" block-align="center">
                  <NpButton :icon="DeleteMinor" variant="tertiary" :loading="task.loading"
                    @click="onClearProduct(task)">
                  </NpButton>
                  <NpText>{{ task.products_count }}</NpText>
                </NpInlineStack>
              </NpIndexTableCell>
              <NpIndexTableCell>
                <NpInlineStack gap="200" block-align="center">
                  <NpBadge v-if="task.ruled" tone="success">网址已抓取</NpBadge>
                  <NpBadge v-if="task.parsed" tone="success">数据已解析</NpBadge>
                  <NpBadge v-if="task.status == 'RUNNING'" tone="attention">运行中</NpBadge>
                </NpInlineStack>
              </NpIndexTableCell>
              <NpIndexTableCell>
                <NpButtonGroup>
                  <NpButton :disabled="task.status == 'RUNNING' || task.loading"
                    @click="router.push(`/ webs / ${task.map.id} /`)">设置规则
                  </NpButton>
                  <NpButton :pressed="task.status == 'RUNNING'" :loading="task.loading" @click="onToggleTask(task)">
                    {{ task.status == 'RUNNING' ? '暂停运行' : `开始运行` }}
                  </NpButton>
                  <ExportButton v-if="task.parsed" @click="e => onExportTask(task, e)" :loading="task.loading" />

                </NpButtonGroup>
              </NpIndexTableCell>
            </NpIndexTableRow>
          </template>
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
import { ref, onUnmounted, watch, computed } from "vue";
import { useRouter } from "vue-router";
import { useQuery } from '@vue/apollo-composable';
import ExportButton from "../components/Task/ExportButton.vue";
import SkeletonList from "../components/SkeletonList.vue";
import { NpLoading, useFrame, NpPage, NpButton, NpCard, NpIndexFilters, NpIndexTable, IndexFiltersMode, NpEmptyState, NpIndexTableRow, NpIndexTableCell, NpInlineStack, NpText, NpButtonGroup, NpBadge } from "@ncpl/ncpl-polaris";
import { DeleteMinor } from "@ncpl/ncpl-icons";
import { gql } from "graphql-tag";

const router = useRouter();
const filters = ref([])
const firstLoading = ref(false);

const resourceName = {
  singular: 'tasks',
  plural: 'tasks',
};


// type TaskType = {
//   id: string;
//   name: string;
//   status?: string;
//   loading?: boolean;
//   parsed: boolean,
//   ruled: boolean,
//   products_count?: number;
//   maps_count?: number;
//   map: {
//     id: string,
//     next_id: string,
//   };
// }

// const tasks = ref<{
//   total: number;
//   data: TaskType[];
// }>({
//   total: 0,
//   data: [],
// })


const selectedResources = ref<string[] | 'All'>([]);
const frameContext = useFrame();
const viewSelected = ref(0);
const views = [
  { id: "1", content: '全部' },
  { id: "2", content: '采集中' },
  { id: "3", content: '已完成' },
];

const sortSelected = ref<string[]>(['id desc']);
const sortOptions = [
  { label: '任务号', value: 'id asc', directionLabel: 'Ascending' },
  { label: '任务号', value: 'id desc', directionLabel: 'Descending' },
  { label: '线程', value: 'process asc', directionLabel: 'Ascending' },
  { label: '线程', value: 'process desc', directionLabel: 'Ascending' },
  { label: '名称', value: 'name asc', directionLabel: 'A-Z' },
  { label: '名称', value: 'name desc', directionLabel: 'A-Z' },
  { label: '状态', value: 'status asc', directionLabel: 'A-Z' },
  { label: '状态', value: 'status desc', directionLabel: 'A-Z' }
];

const tasksVariables = ref({
  page: 1,
  orderBy: [{ column: 'ID', order: 'DESC' }],
})

const { restart, loading: tasksLoading, result, onResult } = useQuery(gql`query GetTasks( $page:Int, $orderBy: [QueryTasksOrderByOrderByClause!]){
    tasks( page: $page, orderBy: $orderBy ){
      data{
        id
        name
        status
        maps_count
        products_count
        parsed
        ruled
        map{
          id
          next_id
        }
      }
      paginatorInfo{
        total
        currentPage
        hasMorePages
        firstItem
      }
    }
  }`, tasksVariables)

const taskPagination = computed(() => {
  const { tasks: { paginatorInfo } } = result.value
  return {
    hasNext: paginatorInfo.hasMorePages,
    onNext: () => tasksVariables.value.page += 1,
    hasPrevious: paginatorInfo.currentPage > 1,
    onPrevious: () => tasksVariables.value.page -= 1,
  }
});

onResult((queryResult) => {
  firstLoading.value = false;
})

watch(() => sortSelected, () => {
  tasksVariables.value.orderBy = sortSelected.value.map((i: string) => {
    const [column, order] = i.split(' ');
    return {
      column: column.toUpperCase(),
      order: order.toUpperCase(),
    }
  })
})



const queryValue = ref("")


let timeInterval: any;
const autoRefresh = () => {
  if (timeInterval) {
    stopRefresh()
  }
  timeInterval = setInterval(restart, 15000)
}
const stopRefresh = () => {
  timeInterval && clearInterval(timeInterval)
}



const onToggleTask = (task: TaskType) => {
  const status = task.status == 'RUNNING' ? 'stop' : 'run';
  task.loading = true;
  stopRefresh()
  // request.post(`/tasks/${task.id}/action`, { action: status }).then((data: any) => {
  //   autoRefresh();
  //   task.status = data.status;
  //   task.loading = false;
  // })
}

const onExportTask = (task: TaskType, type: string) => {
  task.loading = true;
  stopRefresh()
  // request.post(`/tasks/${task.id}/action`, { action: 'export', type }).then(({ id }: any) => {
  //   autoRefresh();
  //   task.loading = false;
  //   if (id) {
  //     frameContext.showToast({
  //       id: `${task.id}_${id}`,
  //       content: '导出请求已接收'
  //     })
  //   }
  // })
}

const onClearProduct = (task: TaskType) => {
  task.loading = true;
  stopRefresh();
  // request.post(`/tasks/${task.id}/action`, { action: 'clearProduct' }).then(({ url }: any) => {
  //   autoRefresh();
  //   task.loading = false;
  //   task.parsed = 0;
  //   task.products_count = 0;
  // })
}

const onClearMap = (task: TaskType) => {
  task.loading = true;
  stopRefresh();
  // request.post(`/tasks/${task.id}/action`, { action: 'clearMap' }).then(({ url }: any) => {
  //   autoRefresh();
  //   task.loading = false;
  //   task.ruled = 0;
  //   task.maps_count = 0;
  // })
}

onUnmounted(() => {
  clearInterval(timeInterval)
});


const promotedBulkActions = [
  {
    content: 'Create shipping labels',
    onAction: () => console.log('Todo: implement create shipping labels'),
  },
  {
    content: 'Mark as fulfilled',
    onAction: () => console.log('Todo: implement mark as fulfilled'),
  },
  {
    content: 'Capture payment',
    onAction: () => console.log('Todo: implement capture payment'),
  },
];
const bulkActions = [
  {
    content: 'Add tags',
    onAction: () => console.log('Todo: implement bulk add tags'),
  },
  {
    content: 'Remove tags',
    onAction: () => console.log('Todo: implement bulk remove tags'),
  },
  {
    title: 'Import',
    items: [
      {
        content: 'Import from PDF',
        onAction: () => console.log('Todo: implement PDF importing'),
      },
      {
        content: 'Import from CSV',
        onAction: () => console.log('Todo: implement CSV importing'),
      },
    ],
  },
  {
    icon: DeleteMinor,
    destructive: true,
    content: 'Delete customers',
    onAction: () => console.log('Todo: implement bulk delete'),
  },
];

</script>