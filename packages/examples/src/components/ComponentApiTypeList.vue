<template>
    <NpBlockStack gap="100">
        <template v-for="(type) in types">
            <NpDivider />
            <ComponentApiTypeItem :name="type.name" :type="type.type" :fun="type.fun" :required="type.required"
                :description="type.description" :expands="type.expands" />
        </template>
    </NpBlockStack>
</template>
<script setup lang="ts">
import ComponentApiTypeItem from "./ComponentApiTypeItem.vue";
import type { ApiItemType } from "../types"
import { NpDivider, NpBlockStack } from "@ncpl/ncpl-polaris";
defineProps<{
    types: ApiItemType[]
}>();
</script>