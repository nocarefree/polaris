<template>
  <div :class="classNames(
    styles.FileUpload,
    dropZone.measuring && styles.measuring,
    dropZone.size === 'large' && styles.large,
    dropZone.size === 'small' && styles.small,
  )">
    <BlockStack v-if="dropZone.size == 'large' || dropZone.size == 'medium'" inline-align="center" gap="200">
      <div :class="classNames(
        styles.Action,
        dropZone.disabled && styles.disabled,
      )">{{ _actionTitle }}</div>
      <Text v-if="actionHint" variant="bodySm" as="p" color="subdued">
        {{ actionHint }}
      </Text>
    </BlockStack>
    <div v-else :class="classNames(styles.UploadIcon, dropZone.disabled && styles.disabled)">
      <Icon :source="UploadIcon" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import BlockStack from "../../BlockStack"
import Text from "../../Text"
import Icon from "../../Icon"
import styles from "./FileUpload.module.scss"
import { classNames } from '@ncpl-polaris/utils';
import { useI18n, dropZoneContext } from "../../context"
import { UploadIcon } from "@ncpl/ncpl-icons";
import { createAllowMultipleKey } from "../utils"
import { capitalize } from "lodash"

const props = defineProps<{
  actionTitle?: string;
  actionHint?: string;
}>();



const i18n = useI18n();
const dropZone = dropZoneContext.inject()


const _actionTitle = computed(() => {
  const typeSuffix = capitalize(dropZone.value.type);
  const allowMultipleKey = createAllowMultipleKey(dropZone.value.allowMultiple);
  return props.actionTitle || i18n.value.translate(`Polaris.DropZone.${allowMultipleKey}.actionTitle${typeSuffix}`)
});
</script>