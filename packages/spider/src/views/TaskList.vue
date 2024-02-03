<template>
  <SkeletonList v-if="firstLoading" />
  <NpPage v-else title="任务" full-width>
    <template #primaryAction>
      <NpButton variant="primary" @click="router.push('/tasks/new')">添加任务</NpButton>
    </template>


    <NpCard padding="0">
      <template v-if="tasks?.data?.length > 0">
        <NpIndexFilters :mode="IndexFiltersMode.Default" v-model:selected="viewSelected" :tabs="views"
          v-model:sort-selected="sortSelected" :sort-options="sortOptions" v-model:query-value="queryValue"
          :filters="filters" can-create-new-view>
        </NpIndexFilters>
        <NpIndexTable :resource-name="resourceName"
          :headings="[{ title: 'ID' }, { title: '任务名' }, { title: '抓取数量' }, { title: '产品数量' }, { title: '状态' }, { title: '状态' }]"
          :rows="tasks.data">
          <template #default="{ index, row: task }">
            <NpIndexTableRow :id="task.id" :selected="selectedResources == 'All' || selectedResources.includes(task.id)"
              :position="index">
              <NpIndexTableCell>
                <NpText variant="bodyMd" font-weight="bold" as="span">
                  <NpButton variant="plain" @click="router.push(`/task/${task.id}`)">#{{ task.id }}</NpButton>
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
                  <NpButton :icon="DeleteMinor" variant="tertiary" :loading="task.loading" @click="onClearProduct(task)">
                  </NpButton>
                  <NpText>{{ task.products_count }}</NpText>
                </NpInlineStack>
              </NpIndexTableCell>
              <NpIndexTableCell>
                <NpInlineStack gap="200" block-align="center">
                  <NpBadge v-if="task.ruled" tone="success">网址已抓取</NpBadge>
                  <NpBadge v-if="task.parsed" tone="success">数据已解析</NpBadge>
                  <NpBadge v-if="task.status == 'running'" tone="attention">运行中</NpBadge>
                </NpInlineStack>
              </NpIndexTableCell>
              <NpIndexTableCell>
                <NpButtonGroup>
                  <NpButton :disabled="task.status == 'running' || task.loading"
                    @click="router.push(`/webs/${task.map.id}/`)">设置规则
                  </NpButton>
                  <NpButton :pressed="task.status == 'running'" :loading="task.loading" @click="onToggleTask(task)">
                    {{ task.status == 'running' ? '暂停运行' : `开始运行` }}
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
import { ref, reactive, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import request from "../request";
import ExportButton from "../components/Task/ExportButton.vue";
import SkeletonList from "../components/SkeletonList.vue";
import { useFrame, NpPage, NpButton, NpCard, NpIndexFilters, NpIndexTable, IndexFiltersMode, NpEmptyState, NpIndexTableRow, NpIndexTableCell, NpInlineStack, NpText, NpButtonGroup, NpBadge } from "@ncpl/ncpl-polaris";
import { DeleteMinor } from "@ncpl/ncpl-icons";


const router = useRouter();
const firstLoading = ref(true);
const filters = ref([])

const resourceName = {
  singular: 'tasks',
  plural: 'tasks',
};


type TaskType = {
  id: string;
  name: string;
  status?: string;
  loading?: boolean;
  parsed: 1 | 0,
  ruled: 1 | 0,
  map: {
    id: string,
    next_id: string,
  };
}

const tasks = reactive<{
  total: number;
  data: TaskType[];
}>({
  total: 0,
  data: [],
})

const selectedResources = ref<string[] | 'All'>([]);

const frameContext = useFrame();

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

const loadList = () => {
  request.get('/tasks').then((data: any) => {
    firstLoading.value = false;
    tasks.data = data.data as TaskType[];
    tasks.total = data.total;
  })
}

let timeInterval = setInterval(loadList, 15000)
loadList();

const onToggleTask = (task) => {
  const status = task.status == 'running' ? 'stop' : 'run';
  task.loading = true;
  request.post(`/tasks/${task.id}/action`, { action: status }).then((data: any) => {
    task.status = data.status;
    task.loading = false;
  })
}

const onExportTask = (task, type: string) => {
  task.loading = true;
  clearInterval(timeInterval)
  request.post(`/tasks/${task.id}/action`, { action: 'export', type }).then(({ id }: any) => {
    timeInterval = setInterval(loadList, 15000)
    task.loading = false;
    if (id) {
      frameContext.showToast({
        id: `${task.id}_${id}`,
        content: '导出请求已接收'
      })
    }
  })
}

const onClearProduct = (task) => {
  task.loading = true;
  request.post(`/tasks/${task.id}/action`, { action: 'clearProduct' }).then(({ url }: any) => {
    task.loading = false;
    task.parsed = 0;
    task.products_count = 0;
  })
}

const onClearMap = (task) => {
  task.loading = true;
  request.post(`/tasks/${task.id}/action`, { action: 'clearMap' }).then(({ url }: any) => {
    task.loading = false;
    task.ruled = 0;
    task.map_count = 0;
  })
}

onUnmounted(() => {
  clearInterval(timeInterval)
});

</script>