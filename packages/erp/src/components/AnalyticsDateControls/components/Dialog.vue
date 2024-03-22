<template>
    <div :style="{ maxWidth }">
        <NpBox v-if="layout === 'small'" padding="400">
            <NpBlockStack>
                <DateSelect :selected-date-range="dateRange" :quick-picks="quickPicks" @change=""></DateSelect>
                <NpInlineGrid columns="1fr auto 1fr" align-items="center" gap="200">
                    <DateInput type="since" :value="dateRange ? void 0 : dateRange.since.toSqlString()" @change=""
                        :should-display-abbreviated-month="false" :disable-dates-after="j"></DateInput>
                    <div class="ArrowIcon">
                        <NpIcon :source="ArrowRightIcon" tone="subdued"></NpIcon>
                    </div>
                    <DateInput type="until" :value="dateRange ? void 0 : dateRange.since.toSqlString()" @change=""
                        :should-display-abbreviated-month="false" :disable-dates-after="j"></DateInput>
                </NpInlineGrid>

                <NpBox>
                    <NpDatePicker @monthChange="" :month="m.month" :year="m.year" @change=" :selected=""
                        :allow-range="true" :multiMonth="layout==='large'" :disableDatesAfter="false">
                    </NpDatePicker>
                </NpBox>
            </NpBlockStack>
        </NpBox>
        <NpInlineGrid v-else :columns="{ md: '180px 1fr', lg: 'minmax(160px, 210px) minmax(520px, 1fr)' }">
            <NpBox border-inline-end-width="025"
                :border-color="common.length < 10 ? 'border-secondary' : 'transparent'">
                <NpBlockStack>
                    {{ Xe }}
                </NpBlockStack>
                <NpBox padding="400">
                    <NpBlockStack>
                        <NpInlineGrid columns="1fr auto 1fr" align-items="center" gap="200">
                            <DateInput type="since" :value="dateRange ? void 0 : dateRange.since.toSqlString()"
                                @change="" :should-display-abbreviated-month="layout === 'medium'"
                                :disable-dates-after="j"></DateInput>
                            <div class="ArrowIcon">
                                <NpIcon :source="ArrowRightIcon" tone="subdued"></NpIcon>
                            </div>
                            <DateInput type="until" :value="dateRange ? void 0 : dateRange.since.toSqlString()"
                                @change="" :should-display-abbreviated-month="layout === 'medium'"
                                :disable-dates-after="j"></DateInput>
                        </NpInlineGrid>
                    </NpBlockStack>
                </NpBox>
            </NpBox>
        </NpInlineGrid>
        <NpDivider></NpDivider>
        <NpBox padding="400">
            <NpBlockStack>
                <Buttons></Buttons>
            </NpBlockStack>
        </NpBox>
    </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import { NpBox, NpBlockStack, NpInlineGrid, NpDivider, NpIcon, NpDatePicker } from "@ncpl/ncpl-polaris"
import Buttons from "./Buttons.vue";
import DateSelect from "./DateSelect.vue";
import DateInput from "./DateInput.vue";
import { HumanizedTimeFormat } from "../analytics-date-range";
import { ArrowRightIcon } from "@ncpl/ncpl-icons";


const l = "UTC";
const props = defineProps<{
    dateRange: any,
    quickPicks: any,
    layout: 'large' | 'small' | 'medium',
}>()

const maxWidth = computed(() => {
    return props.layout === "small" ? undefined :
        props.layout === "medium" ? "530px" : "730px"
});

const m:any;



const j = computed(() => {
    const p = new HumanizedTimeFormat("today", l).value
        , D = new Date
    return p > D ? p : D
})

</script>