<template>
  <div :class="classNames(
    styles.FileUpload,
    dropZone.measuring && styles.measuring,
    dropZone.size === 'large' && styles.large,
    dropZone.size === 'small' && styles.small,
  )">
    <VerticalStack v-if="dropZone.size == 'large' || dropZone.size == 'medium'" inline-align="center" gap="2">
      <div :class="classNames(
        styles.Action,
        dropZone.disabled && styles.disabled,
      )">{{ _actionTitle }}</div>
      <Text v-if="actionHint" variant="bodySm" as="p" color="subdued">
        {{ actionHint }}
      </Text>
    </VerticalStack>

    <template v-else>
      <div v-if="polarisSummerEditions2023" :class="classNames(styles.UploadIcon, dropZone.disabled && styles.disabled)">
        <Icon :source="UploadMajor" />
      </div>
      <img v-else width="20" :src="uploadArrow" alt="" />
    </template>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import VerticalStack from "../../VerticalStack"
import Text from "../../Text"
import Icon from "../../Icon"
import styles from "./FileUpload.module.scss"
import { classNames } from '@ncpl-polaris/utils';
import { useI18n, useFeatures, dropZoneContext } from "../../context"
import { UploadMajor } from "@ncpl/ncpl-icons"
import uploadArrow from "../images/upload-arrow.svg";
import { createAllowMultipleKey } from "../utils"
import { capitalize } from "lodash"

const props = defineProps<{
  actionTitle?: string;
  actionHint?: string;
}>();



const i18n = useI18n();
const { polarisSummerEditions2023 } = useFeatures();
const dropZone = dropZoneContext.inject()


const _actionTitle = computed(() => {
  const typeSuffix = capitalize(dropZone.value.type);
  const allowMultipleKey = createAllowMultipleKey(dropZone.value.allowMultiple);
  return props.actionTitle || i18n.value.translate(`Polaris.DropZone.${allowMultipleKey}.actionTitle${typeSuffix}`)
});
</script>