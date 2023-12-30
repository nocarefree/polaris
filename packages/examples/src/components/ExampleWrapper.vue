<template>
    <NpCard padding="0" style="margin-bottom:1em">
        <div class="example-wrapper" :style="{ height: height ? `${height}px` : undefined }">
            <div>
                <slot></slot>
            </div>
        </div>
    </NpCard>
</template>
<script setup lang="ts">
import { NpCard } from "@ncpl/ncpl-polaris";
defineProps<{ height?: number | string; }>()
</script>


<style lang="scss">
.example-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 300px;
    padding-left: 32px;
    padding-right: 32px;
    background-color: var(--p-color-bg);
    border-radius: var(--border-radius-600);

    >div {
        width: 100%;
    }

}
</style>