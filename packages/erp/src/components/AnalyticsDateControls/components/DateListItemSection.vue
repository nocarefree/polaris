<template>
    <div class="Container">
        <button class="Button" type="button">
            <span>{{ title }}</span>
            <span>
                <NpIcon tone="base" :source="opened ? ChevronUpIcon : ChevronDownIcon"></NpIcon>
            </span>
        </button>
        <div>
            <NpCollapsible v-model:open="opened">
                <slot></slot>
            </NpCollapsible>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { NpIcon, NpCollapsible } from "@ncpl/ncpl-polaris";
import { ChevronUpIcon, ChevronDownIcon } from "@ncpl/ncpl-icons";

const props = defineProps<{
    title: string;
    alias: string;
    isOpenOnMount?: boolean;
}>()

const opened = ref(props.isOpenOnMount);

</script>