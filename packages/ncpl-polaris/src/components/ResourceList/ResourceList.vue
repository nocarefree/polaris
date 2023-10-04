<template>
  <div />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { ResourceListProps } from './ResourceList'
import styles from './ResourceList.module.scss'

defineOptions({
  name: 'NpResourceList',
})
defineProps<ResourceListProps>()
</script>
