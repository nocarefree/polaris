<template>
    <div :class="styles.Navigation" :ref="(e: any) => setRef && setRef(e)">
        <Button variant="tertiary" :icon="ChevronLeftIcon" :disabled="isScrolledFarthestLeft"
            :accessibility-label="leftA11yLabel" @click="$emit('navigateTableLeft')" />
        <template v-for="( column, index ) in  columnVisibilityData ">
            <div v-if="index < fixedFirstColumns"
                :class="classNames(styles.Pip, column.isVisible && styles['Pip-visible'])" :key="`pip-${index}`" />
        </template>
        <Button variant="tertiary" :icon="ChevronRightIcon" :disabled="isScrolledFarthestRight"
            :accessibility-label="rightA11yLabel" @click="$emit('navigateTableRight')" />
    </div>
</template>
<script setup lang=ts>
import { computed } from "vue";
import { useI18n } from "../../context";
import Button from "../../Button";
import styles from "../DataTable.module.scss";
import type { NavigationProps } from "./types";
import { classNames } from "../../../utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@ncpl/ncpl-icons";

defineProps<NavigationProps>()
defineEmits(['navigateTableLeft', 'navigateTableRight'])

const i18n = useI18n();

const leftA11yLabel = computed(() => i18n.value.translate(
    'Polaris.DataTable.navAccessibilityLabel',
    { direction: 'left' },
));

const rightA11yLabel = computed(() => i18n.value.translate(
    'Polaris.DataTable.navAccessibilityLabel',
    { direction: 'right' },
));
</script>