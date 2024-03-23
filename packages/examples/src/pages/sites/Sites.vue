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
                <NpLegacyCard sectioned title="Background color">
                    <NpRangeSlider label="Opacity percentage" v-model="rangValue" output />
                </NpLegacyCard>
                <NpLegacyCard v-if="store.resources.data.length > 0">
                    <NpIndexFilters :sort-options="sortOptions" query-placeholder="Searching in all"
                        :primary-action="primaryAction" :filters="filters" :appliedFilters="appliedFilters"
                        :cancel-action="{ onAction: () => { }, disabled: false, loading: false }" :tabs="tabs"
                        can-create-new-view @createNewView="() => { }" @clearAll="() => { }" v-model:selected="selected"
                        v-model:mode="mode" v-model:sort-selected="sortSelected" v-model:query-value="queryValue" />
                    <NpIndexTable v-bind="indexTable" v-model:selected="selectedResources" :rows="store.resources.data">
                        <template #default="{ index, row: site }">
                            <NpIndexTableRow :id="site.id" :position="index">
                                <NpIndexTableCell>
                                    <NpText variant="bodyMd" font-weight="bold" as="span">
                                        {{ site.name }}
                                    </NpText>
                                </NpIndexTableCell>
                                <NpIndexTableCell>{{ site.date }}</NpIndexTableCell>
                                <NpIndexTableCell>{{ site.path }}</NpIndexTableCell>
                                <NpIndexTableCell>{{ site.note }}</NpIndexTableCell>
                                <NpIndexTableCell>
                                    <NpBadge progress="partiallyComplete">Partially paid</NpBadge>
                                </NpIndexTableCell>
                            </NpIndexTableRow>
                        </template>
                    </NpIndexTable>
                </NpLegacyCard>
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
import { ref, onMounted, computed, h } from "vue"
import { NpBadge, NpRangeSlider, NpChoiceList, NpTextField, NpEmptyState, NpLayout, NpLayoutSection, NpPage, NpLegacyCard, NpSkeletonPage, NpLoading, NpIndexTable, NpIndexTableRow, NpIndexTableCell, NpText, NpIndexFilters } from "@ncpl/ncpl-polaris"
import { useRouter } from 'vue-router'
import { useStore } from "./site"

const store = useStore();
const router = useRouter();
const allResourcesSelected = ref(false);

const emptyAction = {
    content: '添加网站',
    onAction: () => router.push({ path: '/sites/new' })
}



onMounted(() => {
    store.loadResources();
})


const selectedResources = ref<number[]>([]);
const rangValue = ref<number>(32)

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

const onSelectionChange = (type) => {
    console.log(type)
    allResourcesSelected.value = type;
}


const sortOptions = [
    { label: 'Order', value: 'order asc', directionLabel: 'Ascending' },
    { label: 'Order', value: 'order desc', directionLabel: 'Descending' },
    { label: 'Customer', value: 'customer asc', directionLabel: 'A-Z' },
    { label: 'Customer', value: 'customer desc', directionLabel: 'Z-A' },
    { label: 'Date', value: 'date asc', directionLabel: 'A-Z' },
    { label: 'Date', value: 'date desc', directionLabel: 'Z-A' },
    { label: 'Total', value: 'total asc', directionLabel: 'Ascending' },
    { label: 'Total', value: 'total desc', directionLabel: 'Descending' },
];
const mode = ref('DEFAULT');
const sortSelected = ref(['order asc'])
const queryValue = '';
const selected = ref(0)
const accountStatus = ref<[string] | undefined>()
const moneySpent = ref<[number, number] | undefined>()
const taggedWith = ref('');

const primaryAction = computed(() => {
    return selected.value === 0 ? {
        type: 'save-as',
        onAction: () => { },
        disabled: false,
        loading: false,
    }
        : {
            type: 'save',
            onAction: () => { },
            disabled: false,
            loading: false,
        }
});


const tabs = computed(() => {
    return [
        'All',
        'Unpaid',
        'Open',
        'Closed',
        'Local delivery',
        'Local pickup',
    ].map((item, index) => ({
        content: item,
        index,
        onAction: () => { },
        id: `${item}-${index}`,
        isLocked: index === 0,
        actions:
            index === 0
                ? []
                : [
                    {
                        type: 'rename',
                        onAction: () => { },
                        onPrimaryAction: (value: string, done) => {
                            const newItemsStrings = tabs.value.map((item, idx) => {
                                if (idx === index) {
                                    return value;
                                }
                                return item.content;
                            });
                            //setItemStrings(newItemsStrings);
                            done();
                        },
                    },
                    {
                        type: 'duplicate',
                        onPrimaryAction: (value: string) => {
                            return true;
                        },
                    },
                    {
                        type: 'edit',
                    },
                    {
                        type: 'delete',
                        onPrimaryAction: () => {
                            return true;
                        },
                    },
                ],
    }));
});

const filters = ref([
    {
        key: 'accountStatus',
        label: 'Account status',
        filter: () => h(NpChoiceList, {
            title: "Account status",
            titleHidden: true,
            choices: [
                { label: 'Enabled', value: 'enabled' },
                { label: 'Not invited', value: 'not invited' },
                { label: 'Invited', value: 'invited' },
                { label: 'Declined', value: 'declined' },
            ],
            selected: accountStatus.value || [],
            'onUpdate:selected': (e) => { accountStatus.value = e },
            allowMultiple: true
        }
        ),
        shortcut: true,
    },
    {
        key: 'taggedWith',
        label: 'Tagged with',
        filter: () => h(NpTextField, {
            label: "Tagged with",
            modelValue: '',
            'onUpdate:modelValue': (e) => { taggedWith.value = e },
            autoComplete: "off",
            labelHidden: true
        }),
        shortcut: true,
    },
    {
        key: 'moneySpent',
        label: 'Money spent',
        filter: () => h(NpRangeSlider, {
            label: "Money spent is between",
            labelHidden: true,
            modelValue: moneySpent.value,
            'onUpdate:modelValue': (e) => { moneySpent.value = e },
            prefix: "$",
            output: true,
            min: 0,
            max: 2000,
            step: 1,
            onChange: (e) => {

            },
        })
    },
]);


const appliedFilters = computed(() => {
    let appliedFilters: any = []
    if (accountStatus.value && accountStatus.value.length > 0) {
        const key = 'accountStatus';
        appliedFilters.push({
            key,
            label: disambiguateLabel(key, accountStatus.value),
            onRemove: () => accountStatus.value = undefined,
        });
    }
    if (moneySpent.value) {
        const key = 'moneySpent';
        appliedFilters.push({
            key,
            label: disambiguateLabel(key, moneySpent.value),
            onRemove: () => moneySpent.value = undefined,
        });
    }
    if (taggedWith.value) {
        const key = 'taggedWith';
        appliedFilters.push({
            key,
            label: disambiguateLabel(key, taggedWith.value),
            onRemove: taggedWith.value = '',
        });
    }
    return appliedFilters;
})

function disambiguateLabel(key: string, value: string | any[]): string {
    switch (key) {
        case 'moneySpent':
            return `Money spent is between $${value[0]} and $${value[1]}`;
        case 'taggedWith':
            return `Tagged with ${value}`;
        case 'accountStatus':
            return (value as string[]).map((val) => `Customer ${val}`).join(', ');
        default:
            return value as string;
    }
}
</script>