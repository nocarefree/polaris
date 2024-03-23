<template>
    <NpTextField v-model="value" label="text"></NpTextField>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { NpTextField } from "@ncpl/ncpl-polaris"
const value = ref();
</script>