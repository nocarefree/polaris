<template>
  <Button v-if="polarisSummerEditions2023" primary plain :pressed="pressed" :icon="CancelMajor"
    @click="e => $emit('click', e)" :accessibility-label="i18n.translate('Polaris.Common.close')" />
  <button v-else :class="classNames(styles.CloseButton, titleHidden && styles.titleHidden, pressed &&
    styles.pressed)" :aria-label="i18n.translate('Polaris.Common.close')" @click="e => $emit('click', e)">
    <Icon :source="MobileCancelMajor" color="base" />
  </button>
</template>
<script setup lang="ts">
import type { CloseButtonProps } from './CloseButton'
import Button from '@ncpl-polaris/components/Button'
import Icon from '@ncpl-polaris/components/Icon'
import { CancelMajor, MobileCancelMajor } from "@ncpl/ncpl-icons"
import { useFeatures, useI18n } from "../../context"
import { classNames } from '@ncpl-polaris/utils'
import styles from './CloseButton.module.scss'


defineOptions({
  name: 'NpModalCloseButton',
})
defineProps<CloseButtonProps>()

const { polarisSummerEditions2023 } = useFeatures();
const i18n = useI18n();
</script>
