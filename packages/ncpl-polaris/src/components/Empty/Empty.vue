<template>
    <component v-if="wrap" :is="wrap" v-bind="$attrs">
        <slot></slot>
    </component>
    <slot v-else></slot>
</template>
<script setup lang="ts">
defineOptions({
    inheritAttrs: false,
});
defineProps<{
    wrap?: string,
}>();
</script>