<template>
  <Popover :active="isVisible" @close="toggleMenuVisibility" prefer-input-activator>
    <template #activator>
      <BulkActionButton disclosure show-content-in-button @action="toggleMenuVisibility" :content="title"
        :indicator="isNewBadgeInBadgeActions" />
    </template>
    <ActionList :items="actions" @actionAnyItem="toggleMenuVisibility" />
  </Popover>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { BulkActionMenuProps } from './BulkActionMenu'
import Popover from '../../Popover'
import ActionList from '../../ActionList'
import BulkActionButton from "../BulkActionButton"

defineOptions({
  name: 'NpBulkActionsBulkActionMenu',
})
defineProps<BulkActionMenuProps>()

const isVisible = ref(false)
const toggleMenuVisibility = () => {
  isVisible.value = !isVisible.value
}
</script>
