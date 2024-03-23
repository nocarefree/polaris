<template>
    <div :style="{ maxWidth }">
        <NpBox v-if="layout === 'small'" padding="400">
            <NpBlockStack>
                <DateSelect :selected-date-range="dateRange" :quick-picks="quickPicks" @change=""></DateSelect>
                <NpInlineGrid columns="1fr auto 1fr" align-items="center" gap="200">
                    <DateInput type="since" :value="!dateRange ? void 0 : dateRange.since.toSqlString()" @change=""
                        :should-display-abbreviated-month="false" :disable-dates-after="j"></DateInput>
                    <div class="ArrowIcon">
                        <NpIcon :source="ArrowRightIcon" tone="subdued"></NpIcon>
                    </div>
                    <DateInput type="until" :value="!dateRange ? void 0 : dateRange.since.toSqlString()" @change=""
                        :should-display-abbreviated-month="false" :disable-dates-after="j"></DateInput>
                </NpInlineGrid>

                <NpBox>
                    <NpDatePicker @monthChange="" :month="calendarPosition.month" :year="calendarPosition.year" @change="" :selected="selectedDate"
                        :allow-range="true" :multi-month="false" :disableDatesAfter="false">
                    </NpDatePicker>
                </NpBox>
            </NpBlockStack>
        </NpBox>
        <NpInlineGrid v-else :columns="{ md: '180px 1fr', lg: 'minmax(160px, 210px) minmax(520px, 1fr)' }">
            <NpBox border-inline-end-width="025"
                :border-color="quickPicks.common.length < 10 ? 'border-secondary' : 'transparent'">
                <DateList :selected-date-range="dateRange" :quick-picks="quickPicks"></DateList>
            </NpBox>
            <NpBox padding="400">
                <NpBlockStack>
                    <NpInlineGrid columns="1fr auto 1fr" align-items="center" gap="200">
                        <DateInput type="since" :value="!dateRange ? void 0 : dateRange.since.toSqlString()" @change=""
                            :should-display-abbreviated-month="layout === 'medium'" :disable-dates-after="j">
                        </DateInput>
                        <div class="ArrowIcon">
                            <NpIcon :source="ArrowRightIcon" tone="subdued"></NpIcon>
                        </div>
                        <DateInput type="until" :value="!dateRange ? void 0 : dateRange.since.toSqlString()" @change=""
                            :should-display-abbreviated-month="layout === 'medium'" :disable-dates-after="j">
                        </DateInput>
                    </NpInlineGrid>
                    <NpBox>
                        <NpDatePicker @monthChange="" :month="calendarPosition.month" :year="calendarPosition.year" @change=""
                            :selected="selectedDate" :allow-range="true" :multi-month="true" :disableDatesAfter="false">
                        </NpDatePicker>
                    </NpBox>
                </NpBlockStack>
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
import { computed } from "vue";
import { NpBox, NpBlockStack, NpInlineGrid, NpDivider, NpIcon, NpDatePicker } from "@ncpl/ncpl-polaris"
import Buttons from "./Buttons.vue";
import DateSelect from "./DateSelect.vue";
import DateInput from "./DateInput.vue";
import { HumanizedDate, rangeDate } from "../analytics-date-range";
import { ArrowRightIcon } from "@ncpl/ncpl-icons";
import DateList from "./DateList.vue";
import { useCommon }from "../../context";


const { ianaTimeZone } = useCommon();
const props = defineProps<{
    dateRange?: {
        since: HumanizedDate;
        until: HumanizedDate;
    },
    quickPicks: any,
    layout: 'large' | 'small' | 'medium',
}>()


const selectedDate = computed(() => !props.dateRange ? void 0 : {
    start: props.dateRange.since.getBrowserValueAtZeroTime(),
    end: props.dateRange.until.getBrowserValueAtZeroTime()
});

const maxWidth = computed(() => {
    return props.layout === "small" ? undefined :
        props.layout === "medium" ? "530px" : "730px"
});

const j = computed(() => {
    const p = new HumanizedDate("today", ianaTimeZone.value).value
        , D = new Date
    return p > D ? p : D
})


const calendarPosition = computed(()=>{

    const n = props.dateRange ?? rangeDate({
        since: 'today',
        until: 'today',
        timeZone: ianaTimeZone.value
    }),
        a = n.until.getPrevious({
            quantity: 1,
            unit: 'm'
        }),
        l = props.layout === 'large',
        {
            month: r,
            year: c
        }
            = l ? a : n.until;
    return {
        month: r - 1,
        year: c
    }
})

</script>