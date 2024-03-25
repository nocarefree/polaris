<template>
    <div :class="classNames($style.metricsButton, $style.metricsButtonWidth, $style.metricButtonSelected)">
        <NpBox background="t ? 'bg' : 'bg-surface'" padding="300" padding-block-start="150" padding-block-end="150"
            border-radius="200">
            <div class="MetricLayout">
                <div class="Header">
                    <div class="Title HasPrimaryAction">
                        <button class="Button">
                            <NpText as="h2">{{ title }}</NpText>
                        </button>
                    </div>
                </div>
                <div class="PrimaryAction">
                    <div class="pencilContainer">
                        <NpPopover>
                            <template #activator>
                                <NpButton size="slim" @click="active = !active" :icon="EditIcon" :disabled="false"
                                    :show-notification-dot="false"></NpButton>
                            </template>
                            <div class="metricEditButtonPopOverContainer">
                                <NpBox>
                                    <NpTextField :icon="SearchIcon" v-model="searchValue"></NpTextField>
                                </NpBox>
                                <NpBox>
                                    <NpActionList :items="items"></NpActionList>
                                </NpBox>
                            </div>
                        </NpPopover>
                    </div>
                </div>
                <div class="Content">
                    <div class="Message">
                        <NpText>—</NpText>
                    </div>
                </div>
            </div>
        </NpBox>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

import { NpPopover, NpText, NpTextField, NpBox, NpActionList, classNames } from "@ncpl/ncpl-polaris";
import { EditIcon, SearchIcon } from "@ncpl/ncpl-icons";


defineProps<{
    title: string;
    items: any[];
}>();

const active = ref(false);
const searchValue = ref("");
</script>
<style module></style>