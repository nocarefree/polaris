<template>
  <nav role="navigation">
    <Button :key="backAction.content" :url="'url' in backAction ? backAction.url : undefined"
      @click="'onAction' in backAction ? backAction.onAction : undefined" @pointerDown="handleMouseUpByBlurring"
      :icon="ArrowLeftMinor" :accessibility-label="backAction.accessibilityLabel ?? backAction.content" />
  </nav>
</template>
<script setup lang="ts">
import type { BreadcrumbsProps } from './Breadcrumbs';
import Button from "@ncpl-polaris/components/Button";
import { handleMouseUpByBlurring } from '@ncpl-polaris/utils/focus';
import { ArrowLeftMinor } from "@ncpl/ncpl-icons";

defineOptions({
  name: 'NpBreadcrumbs',
})
defineProps<BreadcrumbsProps>()
</script>
