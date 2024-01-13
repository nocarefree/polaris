<template>
  <NpLoading v-if="store.loading" />
  <NpIndexTable v-else v-bind="indexTable" v-model:selected="selectedResources" :rows="store.resources.data"
    :bulk-actions="bulkActions" :promoted-bulk-actions="promotedBulkActions">
    <template #default="{ index, row: order }">
      <NpIndexTableRow :id="order.id" :position="index">
        <NpIndexTableCell>
          <NpText variant="bodyMd" font-weight="bold" as="span">
            {{ order.order }}
          </NpText>
        </NpIndexTableCell>
        <NpIndexTableCell>{{ order.date }}</NpIndexTableCell>
        <NpIndexTableCell>{{ order.customer }}</NpIndexTableCell>
        <NpIndexTableCell>{{ order.total }}</NpIndexTableCell>
        <NpIndexTableCell>
          <NpBadge progress="partiallyComplete">Partially paid</NpBadge>
        </NpIndexTableCell>
      </NpIndexTableRow>
    </template>
  </NpIndexTable>
</template>
<script setup lang="ts">
import { ref, onMounted, } from "vue";
import { NpBadge, NpLoading, NpIndexTable, NpIndexTableRow, NpIndexTableCell, NpText } from "@ncpl/ncpl-polaris";


const store = ref<{
  loading: boolean;
  name: { singular: string, plural: string },
  resources: {
    data: { [key: string]: any }[];
  }
}>({
  loading: true,
  name: {
    singular: 'order',
    plural: 'orders',
  },
  resources: {
    data: []
  }
});

onMounted(() => {
  setTimeout(() => {
    store.value.loading = false;
    store.value.resources.data = [
      {
        id: '1021',
        order: '#1020',
        date: 'Jul 20 at 4:34pm',
        customer: 'Jaydon Stanton',
        total: '$969.44',
      },
      {
        id: '1022',
        order: '#1019',
        date: 'Jul 20 at 3:46pm',
        customer: 'Ruben Westerfelt',
        total: '$701.19',
      },
      {
        id: '1023',
        order: '#1018',
        date: 'Jul 20 at 3.44pm',
        customer: 'Leo Carder',
        total: '$798.24',
      },
    ];

  }, 500)
});



const selectedResources = ref<number[] | 'All'>([]);



const indexTable = {
  resourceName: {
    singular: 'order',
    plural: 'orders',
  },
  headings: [
    { title: '网站' },
    { title: '日期' },
    { title: '路径' },
    { title: '备注', alignment: 'end' },
    { title: '状态', alignment: 'end' },
  ]
}



const promotedBulkActions = [
  {
    content: 'Create shipping labels',
    onAction: () => console.log('Todo: implement bulk edit'),
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
    content: 'Delete orders',
    onAction: () => console.log('Todo: implement bulk delete'),
  },
];


</script>