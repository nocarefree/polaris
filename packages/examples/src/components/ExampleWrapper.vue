<template>
    <NpText v-if="title" variant="headingMd" as="h2">{{ title }}</NpText>
    <NpCard padding="0" style="margin-bottom:1em">
        <NpScrollable :style="{ height: height ? `${height}px` : '250px' }">
            <div class="example-wrapper">
                <div>
                    <slot></slot>
                </div>
            </div>
        </NpScrollable>
    </NpCard>
</template>
<script setup lang="ts">
import { NpCard, NpScrollable, NpText } from "@ncpl/ncpl-polaris";
defineProps<{ height?: number | string; title?: string; }>()
</script>


<style lang="scss">
.example-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px;
    background-color: var(--p-color-bg);
    border-radius: var(--border-radius-600);
    min-height: 100%;

    >div {
        width: 100%;
    }

}
</style>