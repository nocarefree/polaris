<template>
  <nav role="navigation">
    <Button :key="backAction.content" :url="'url' in backAction ? backAction.url : undefined"
      @click="(e: any) => 'onAction' in backAction ? backAction.onAction() : undefined"
      @pointerDown="handleMouseUpByBlurring" :icon="ArrowLeftIcon"
      :accessibility-label="backAction.accessibilityLabel ?? backAction.content" />
  </nav>
</template>
<script setup lang="ts">
import type { BreadcrumbsProps } from './Breadcrumbs';
import Button from "../Button";
import { handleMouseUpByBlurring } from '../../utils/focus';
import { ArrowLeftIcon } from "@ncpl/ncpl-icons";

defineOptions({
  name: 'NpBreadcrumbs',
})
defineProps<BreadcrumbsProps>()
</script>
