<template>
  <NpButtonGroup variant="segmented">
    <NpButton :disabled="disabled" :loading="loading" @click="$emit('click', 'shopify')" variant="primary">导出数据
    </NpButton>
    <NpPopover v-model:active="open">
      <template #activator>
        <NpButton :disabled="disabled || loading" :icon="ChevronDownMinor" @click="open = !open" variant="primary"
          accessibility-label="更多导出" />
      </template>
      <NpActionList action-role="menuitem" :items="[
        {
          content: '导出shopify表格',
          onAction: () => $emit('click', 'shopify'),
        },
        {
          content: '导出shopyy表格',
          onAction: () => $emit('click', 'shopyy'),
        },
      ]" />
    </NpPopover>
  </NpButtonGroup>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NpButtonGroup, NpButton, NpPopover, NpActionList } from "@ncpl/ncpl-polaris";
import { ChevronDownMinor } from "@ncpl/ncpl-icons";

defineProps<{ disabled?: boolean; loading?: boolean; }>();
defineEmits(['click']);
const open = ref(false);

</script>