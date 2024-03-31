<template>
  <NpPage title="订单" :primary-action="primaryAction" :secondaryActions="secondaryActions">
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
import { ref } from 'vue';
import { NpPage, NpCard, NpEmptyState, NpText, NpButton, NpInlineStack, NpIndexFilters, NpButtonGroup, NpBadge, NpIndexTable, NpIndexTableRow, NpIndexTableCell } from "@ncpl/ncpl-polaris";

const primaryAction = ref({
  content: '创建订单', onAction: () => { }
})

const secondaryActions = ref([
  {
    content: '导出', onAction: () => { }
  }
])
</script>
