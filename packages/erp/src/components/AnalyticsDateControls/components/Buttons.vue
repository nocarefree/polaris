<template>
    <NpInlineStack :align="align ? 'between' : 'end'">
        <NpButton @click="$emit('cancel')">
            {{ i18n.translate("AnalyticsDateControls.actionButtons.cancel") }}
        </NpButton>
        <NpButton disabled="disableApplyButton" variant="primary" @click="$emit('apply')">
            {{ i18n.translate("AnalyticsDateControls.actionButtons.cancel") }}
        </NpButton>
    </NpInlineStack>
</template>
<script setup lang="ts">
import { NpInlineStack, NpButton, useI18n } from "@ncpl/ncpl-polaris";
import { isCondensedPage } from "../../../utils";


withDefaults(defineProps<{
    disableApplyButton?: boolean;
}>(), {
    disableApplyButton: false,
});
defineEmits(['cancel', 'apply']);
const i18n = useI18n();
const align = isCondensedPage();

</script>