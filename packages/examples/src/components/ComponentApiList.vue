<template>
    <NpLegacyCard v-if="apis">

        <NpTabs :tabs="tabs" v-model:selected="selected"></NpTabs>

        <template v-for="(api, index) in  apis ">
            <template v-if="selected == index">
                <ComponentApiTypeList :types="api.types"></ComponentApiTypeList>
            </template>
        </template>

    </NpLegacyCard>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import ComponentApiTypeList from "./ComponentApiTypeList.vue";
import { NpLegacyCard, NpTabs } from "@ncpl/ncpl-polaris";
import type { ComponentApiType } from "../types"


const props = defineProps<{
    apis?: ComponentApiType[],
}>();

const tabs = computed(() => {
    const { apis = [] } = props;
    let data = [];
    for (let _api of apis) {
        data.push({
            id: _api.label,
            content: _api.label,
            panelId: `panel-id-${_api.label}`,
        })
    }
    return data;
});

const selected = ref(0);

</script>