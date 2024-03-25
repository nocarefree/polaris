<template>
    <div :class="$style.Container">
        <button :class="$style.Button" type="button" @click="opened = !opened">
            <span>{{ title }}</span>
            <span>
                <NpIcon tone="base" :source="opened ? ChevronUpIcon : ChevronDownIcon"></NpIcon>
            </span>
        </button>
        <div>
            <NpCollapsible v-model:open="opened" :id="collapsibleId">
                <slot></slot>
            </NpCollapsible>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { NpIcon, NpCollapsible, useId } from "@ncpl/ncpl-polaris";
import { ChevronUpIcon, ChevronDownIcon } from "@ncpl/ncpl-icons";

const props = defineProps<{
    title: string;
    alias: string;
    isOpenOnMount?: boolean;
}>()

const opened = ref(props.isOpenOnMount);
const collapsibleId = useId(props.alias)

</script>
<style module>
.Container {
    display: flex;
    width: 100%;
    flex-direction: column;
    margin-bottom: var(--p-space-100);
}

.Button {
    background: none;
    border: none;
    font-size: inherit;
    line-height: inherit;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1 1;
    text-align: left;
    padding: var(--p-space-200);
    margin: 0 var(--p-space-100);
    border-radius: var(--p-border-radius-200);
}
</style>