<template>
  <ul :class="styles.ExceptionList">
    <Item v-for="(item, index) in items" :key="index" v-bind="item"></Item>
  </ul>
</template>
<script setup lang="ts">
import type { ExceptionListProps } from './ExceptionList';
import styles from './ExceptionList.module.scss';
import Item from "./Item.vue";

defineOptions({
  name: 'NpExceptionList',
})
defineProps<ExceptionListProps>()
</script>
