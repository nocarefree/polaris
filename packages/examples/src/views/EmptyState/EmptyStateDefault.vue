<template>
    <NpEmptyState heading="没有任何任务" :action="{ content:'创建任务',url:'' }" :secondary-action="{ content:'了解详细信息',url:'' }">
        <p>请创建你的任务</p>
    </NpEmptyState>
</template>

<script setup lang="ts">
import { NpEmptyState } from "@ncpl/ncpl-polaris";
</script>