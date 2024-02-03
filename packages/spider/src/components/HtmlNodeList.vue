<template>
    <div v-for="(node, index) in children">
        <HtmlNodeItem v-bind="node" :id="`${prefixId}_${index}`"></HtmlNodeItem>
    </div>
</template>
<script setup lang="ts">
import HtmlNodeItem from "./HtmlNodeItem.vue"

defineProps<{ children: any[], prefixId?: string }>();

</script>