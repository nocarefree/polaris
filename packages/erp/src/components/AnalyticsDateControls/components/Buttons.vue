<template>
    <NpInlineStack :align="align ? 'between' : 'end'" gap="200">
        <NpButton @click="$emit('cancel')">
            {{ i18n.translate("AnalyticsDateControls.actionButtons.cancel") }}
        </NpButton>
        <NpButton :disabled="disableApplyButton" variant="primary" @click="$emit('apply')">
            {{ i18n.translate("AnalyticsDateControls.actionButtons.apply") }}
        </NpButton>
    </NpInlineStack>
</template>
<script setup lang="ts">
import { NpInlineStack, NpButton } from "@ncpl/ncpl-polaris";
import { isCondensedPage } from "../../../utils";
import { useCommon } from "../../context";


withDefaults(defineProps<{
    disableApplyButton?: boolean;
}>(), {
    disableApplyButton: false,
});
defineEmits(['cancel', 'apply']);
const { i18n } = useCommon();
const align = isCondensedPage();

</script>