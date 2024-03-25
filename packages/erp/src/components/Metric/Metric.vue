<template>
    <div :class="styles.MetricLayout">
        <div :class="styles.Header">
            <div :class="styles.Title styles.HasPrimaryAction">
                <button class="Button">
                    <NpText as="h2">{{ title }}</NpText>
                </button>
            </div>
        </div>
        <div class="styles.PrimaryAction">
            <div class="pencilContainer">
                <NpPopover>
                    <template #activator>
                        <NpButton size="slim" @click="active = !active" :icon=" EditIcon " :disabled=" false "
                            :show-notification-dot=" false "></NpButton>
                    </template>
                    <div class="metricEditButtonPopOverContainer">
                        <NpBox>
                            <NpTextField :icon=" SearchIcon " v-model=" searchValue "></NpTextField>
                        </NpBox>
                        <NpBox>
                            <NpActionList :items=" items "></NpActionList>
                        </NpBox>
                    </div>
                </NpPopover>
            </div>
        </div>
        <div class="styles.Content">
            <div class="FlexWrapper">
                <div v-if=" content " class="PrimaryMetricWrapper">
                    <p class="PrimaryMetric Compact">
                        {{ content }}
                    </p>
                </div>
                <NpIcon :source=" MinusIcon "></NpIcon>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import styles from "./Metric.module.scss";

import { NpPopover, NpText, NpTextField, NpBox, NpActionList, NpIcon } from "@ncpl/ncpl-polaris";
import { EditIcon, SearchIcon, MinusIcon } from "@ncpl/ncpl-icons";


defineProps<{
    title: string;
    items: any[];
    content?: string;
}>();

const active = ref(false);
const searchValue = ref("");
</script>