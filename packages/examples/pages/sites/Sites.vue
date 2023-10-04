<template>
    <NpLoading v-if="store.loading" />
    <NpSkeletonPage v-if="!store.resources" full-width>
        <NpLayout>
            <NpLayoutSection>
                <NpLegacyCard sectioned>

                </NpLegacyCard>
            </NpLayoutSection>
        </NpLayout>
    </NpSkeletonPage>
    <NpPage v-else title="网站" full-width>
        <NpLayout>
            <NpLayoutSection>
                <NpIndexTable v-if="store.resources.data.length > 0" v-bind="indexTable">
                    <NpIndexTableRow v-for="(site, index) in store.resources.data" :id="site.id" :key="site.id"
                        :selected="selectedResources.includes(site.id)" :position="index">
                        <NpIndexTableCell>
                            <NpText variant="bodyMd" fontWeight="bold" as="span">
                                {{ site.name }}
                            </NpText>
                        </NpIndexTableCell>
                        <NpIndexTableCell>{{ site.date }}</NpIndexTableCell>
                        <NpIndexTableCell>{{ site.path }}</NpIndexTableCell>
                        <NpIndexTableCell>{{ site.note }}</NpIndexTableCell>
                        <NpIndexTableCell>{{ site.status }}</NpIndexTableCell>
                    </NpIndexTableRow>
                </NpIndexTable>
                <NpLegacyCard v-else sectioned>
                    <NpEmptyState heading="网站将显示在此处" :action="emptyAction"
                        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png">
                        <p>现在还未有任何网站，在使用之前先创建网站。</p>
                    </NpEmptyState>
                </NpLegacyCard>
            </NpLayoutSection>
        </NpLayout>
    </NpPage>
</template>
<script setup lang="ts">
import { ref } from "vue"
import { NpEmptyState, NpLayout, NpLayoutSection, NpPage, NpLegacyCard, NpSkeletonPage, NpLoading, NpIndexTable, NpIndexTableRow, NpIndexTableCell, NpText } from "@ncpl/ncpl-polaris"
import { useRouter } from 'vue-router'
import { useStore } from "./site"

const store = useStore();
const router = useRouter();

const emptyAction = {
    content: '添加网站',
    onAction: () => router.push({ path: '/sites/new' })
}

store.loadResources();


const selectedResources = ref([]);

const indexTable = {
    resourceName: {
        singular: 'order',
        plural: 'orders',
    },
    selectedItemsCount: 0,
    onSelectionChange: () => { },
    itemCount: 0,
    headings: [
        { title: 'Order' },
        { title: 'Date' },
        { title: 'Customer' },
        { title: 'Total', alignment: 'end' },
        { title: 'Payment status' },
        { title: 'Fulfillment status' },
    ]
}

const resources = ref({
    total: 5,
    data: [
        { id: 1, name: 'test1', path: '/www/wwwroot/test1', }
    ]
});

</script>