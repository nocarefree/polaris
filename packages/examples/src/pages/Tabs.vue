<template>
    <NpPage title="tabs" full-width>
        <NpLayout>
            <NpLayoutSection>
                <NpLegacyCard>
                    <NpTabs :tabs="tabs" v-model:selected="selected" can-create-new-view @createNewView="onCreateNewView">
                        <NpLegacyCardSection :title="tabs[selected].content">
                            <p>Tab {{ selected }} selected</p>
                        </NpLegacyCardSection>
                    </NpTabs>
                </NpLegacyCard>
            </NpLayoutSection>
        </NpLayout>
    </NpPage>
</template>
<script setup lang="ts">
import { ref, computed } from "vue"
import { NpTabs, NpLayout, NpLayoutSection, NpPage, NpLegacyCard, NpLegacyCardSection, NpWrapper, NpButton, NpTooltip } from "@ncpl/ncpl-polaris"


const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const itemStrings = ref([
    'All',
    'Unpaid',
    'Open',
    'Closed',
    'Local delivery',
    'Local pickup',
]);
const selected = ref(0);

const deleteView = (index: number) => {
    const newItemStrings = [...itemStrings.value];
    newItemStrings.splice(index, 1);
    itemStrings.value = newItemStrings;
    selected.value = 0
};

const duplicateView = async (name: string) => {
    itemStrings.value = [...itemStrings.value, name];
    selected.value = itemStrings.value.length;
    await sleep(1);
    return true;
};

const tabs = computed(() => itemStrings.value.map((item, index) => ({
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
                    onPrimaryAction: (value: string) => {
                        const newItemsStrings = tabs.value.map((item, idx) => {
                            if (idx === index) {
                                return value;
                            }
                            return item.content;
                        });

                        itemStrings.value = newItemsStrings;
                        return true;
                    },
                },
                {
                    type: 'duplicate',
                    onPrimaryAction: (name) => {
                        duplicateView(name);
                        return true;
                    },
                },
                {
                    type: 'edit',
                },
                {
                    type: 'delete',
                    onPrimaryAction: () => {
                        deleteView(index);
                        return true;
                    },
                },
            ],
})));

const onCreateNewView = (value: string, done) => {
    console.log(value, done)
    itemStrings.value = [...itemStrings.value, value];
    selected.value = (itemStrings.value.length);
};



</script>