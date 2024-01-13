<template>
    <NpBox padding="400" gap="500">
        <NpBlockStack gap="200">
            <NpInlineStack gap="100" block-align="center">
                <NpBadge tone="info" size="large"><b>{{ name }}</b></NpBadge>
                <template v-if="type">
                    <NpBadge v-if="!required" tone="critical">?</NpBadge>
                    <span>
                        <Highlighter @click="onShowType" :type="type"></Highlighter>
                    </span>
                </template>
                <template v-if="fun">
                    <span>
                        <Highlighter @click="onShowType" :type="fun"></Highlighter>
                    </span>
                </template>
            </NpInlineStack>
            <NpText v-if="description" variant="bodyLg" as="p" tone="subdued">{{ description }}</NpText>
            <NpCard v-if="showType" padding="0">
                <NpBox padding="400" gap="500" background="bg-surface-info">
                    <NpInlineStack align="space-between" block-align="center" gap="200" :wrap="false">
                        <NpText as="h2" variant="headingSm" tone="success">
                            {{ showType.kind || 'interface' }} {{ showType.name }}
                        </NpText>
                        <NpButton variant="plain" @click="showType = null">
                            <template #icon>
                                <NpIcon :source="CancelMinor" />
                            </template>
                        </NpButton>
                    </NpInlineStack>
                </NpBox>
                <ComponentApiTypeList :types="showType.types" />
            </NpCard>
        </NpBlockStack>
    </NpBox>
</template>
<script setup lang="ts">
import { ref } from "vue";
import Highlighter from "./Highlighter.vue"
import ComponentApiTypeList from "./ComponentApiTypeList.vue";
import type { ApiType, ApiItemType } from "../types"
import { NpBlockStack, NpButton, NpInlineStack, NpText, NpBadge, NpIcon, NpBox, NpCard } from "@ncpl/ncpl-polaris";
import { CancelMinor } from "@ncpl/ncpl-icons";

const props = defineProps<ApiItemType>();
const showType = ref<ApiType | undefined | null>();

const onShowType = (name: string) => {
    const { expands = [] } = props;
    console.log(name);
    showType.value = expands.find(i => i.name == name);
}

</script>