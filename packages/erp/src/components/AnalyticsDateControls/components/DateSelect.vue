<template>
    <NpSelect></NpSelect>
</template>
<script setup lang="ts">
import { NpSelect } from "@ncpl/ncpl-polaris";
defineProps<{
    selectedDateRange: any;
    quickPicks: any;
}>()

</script>