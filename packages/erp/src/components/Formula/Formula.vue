<template>
    <NpBox>
        <NpBlockStack inline-align="start" gap="200" as="div">
            <NpText v-if="title" variant="bodyMd" as="p" font-weight="semibold"></NpText>
            {{ definition }}
            <NpBox v-if="_formula" as="div" padding="200" background="bg" border-radius="100" width="100%">
                <Highlighter :result="_formula.result" :variables="_formula.variables"></Highlighter>
            </NpBox>
        </NpBlockStack>
    </NpBox>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { NpBlockStack, NpBox, NpText } from '@ncpl/ncpl-polaris';
import Highlighter from "./components/Highlighter";

const props = defineProps<{
    title?: string;
    definition?: string;
    formula?: string;
}>();

const _formula = computed(() => {
    const { formula } = props;
    try {
        const n = !formula ? void 0 : formula.split('='),
            t = n ? n[0] : '',
            o = n ? n[1].split(' ').filter((r: string) => r.length > 0) : [];
        return {
            result: t,
            variables: o
        }
    } catch {
        return null
    }
})
</script>