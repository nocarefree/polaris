<template>
  <Button variant="tertiary" :pressed="pressed" :icon="XIcon"
    :accessibility-label="i18n.translate('Polaris.Common.close')" />
</template>
<script setup lang="ts">
import type { CloseButtonProps } from './CloseButton';
import Button from '@ncpl-polaris/components/Button';
import { useI18n } from "../../context";
import { XIcon } from "@ncpl/ncpl-icons"

defineOptions({
  name: 'NpModalCloseButton',
})
defineProps<CloseButtonProps>()
const i18n = useI18n();
</script>
