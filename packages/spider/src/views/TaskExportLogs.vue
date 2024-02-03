<template>
    <SkeletonList v-if="firstLoading" />
    <NpPage v-else title="导出日志" full-width>
        <NpCard padding="0">
            <template v-if="logs?.data?.length > 0">
                <NpIndexFilters :mode="IndexFiltersMode.Default" v-model:selected="viewSelected" :tabs="views"
                    v-model:sort-selected="sortSelected" :sort-options="sortOptions" v-model:query-value="queryValue"
                    :filters="filters" can-create-new-view>
                </NpIndexFilters>
                <NpIndexTable :resource-name="resourceName" :headings="[{ title: 'ID' }, { title: '任务名' }, { title: '文件' }]"
                    :rows="logs.data">
                    <template #default="{ index, row: log }">
                        <NpIndexTableRow :id="log.id"
                            :selected="selectedResources == 'All' || selectedResources.includes(log.id)" :position="index">
                            <NpIndexTableCell>
                                <NpText variant="bodyMd" font-weight="bold" as="span">
                                    <NpButton variant="plain" @click="router.push(`/task/${log.id}`)">#{{ log.id }}
                                    </NpButton>
                                </NpText>
                            </NpIndexTableCell>
                            <NpIndexTableCell>
                                <NpText>
                                    {{ log.task.name }}
                                </NpText>
                            </NpIndexTableCell>
                            <NpIndexTableCell>
                                <NpBadge v-if="log.status == 'running'" tone="attention">运行中</NpBadge>
                                <NpInlineStack v-else gap="200" block-align="center">
                                    <NpLink v-for="(path, index) in log.files" :url="path" target="_blank">{{ `文件${index +
                                        1}` }}</NpLink>
                                </NpInlineStack>
                            </NpIndexTableCell>
                        </NpIndexTableRow>
                    </template>
                </NpIndexTable>
            </template>
            <template v-else>
                <NpEmptyState heading="没有任何记录"></NpEmptyState>
            </template>
        </NpCard>

    </NpPage>
</template> 
<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import request from "../request";
import SkeletonList from "../components/SkeletonList.vue";
import { NpPage, NpButton, NpCard, NpIndexFilters, NpInlineStack, NpIndexTable, IndexFiltersMode, NpEmptyState, NpIndexTableRow, NpIndexTableCell, NpLink, NpText, NpBadge } from "@ncpl/ncpl-polaris";
import { DeleteMinor } from "@ncpl/ncpl-icons";


const router = useRouter();
const firstLoading = ref(true);

const resourceName = {
    singular: 'logs',
    plural: 'logs',
};

const filters = [];

type ExportLogType = {
    id: string;
    task: { name: string };
    files?: string[];
    created: string;
}

const logs = reactive<{
    total: number;
    data: ExportLogType[];
}>({
    total: 0,
    data: [],
})

const selectedResources = ref<string[] | 'All'>([]);

const viewSelected = ref(0);
const views = [
    { id: "1", content: '全部' },
    { id: "2", content: '导出中' },
    { id: "3", content: '已完成' },
];

const sortSelected = ref([]);
const sortOptions = [
    { label: '任务号', value: 'task asc', directionLabel: 'Ascending' },
    { label: '任务号', value: 'task desc', directionLabel: 'Descending' },
    { label: '状态', value: 'status asc', directionLabel: 'A-Z' },
    { label: '状态', value: 'status desc', directionLabel: 'A-Z' }
];

const queryValue = ref("")

request.get('/export_logs').then((data: any) => {
    logs.data = data.data as ExportLogType[];
    logs.total = data.total;
    firstLoading.value = false;
})

</script>