<template>
    <div :style="{ maxWidth }">
        <NpBox v-if="layout === 'small'" padding="400">
            <NpBlockStack>
                <DateSelect :selected-date-range="currentDateRange" :quick-picks="quickPicks"
                    @change="onUpdateDateRangeFromQuickPicks"></DateSelect>
                <NpInlineGrid columns="1fr auto 1fr" align-items="center" gap="200">
                    <DateInput type="since" :value="!currentDateRange ? void 0 : currentDateRange.since.toSqlString()"
                        @change="onUpdateDateRangeFromTextField" :should-display-abbreviated-month="false"
                        :disable-dates-after="todayDate"></DateInput>
                    <div class="ArrowIcon">
                        <NpIcon :source="ArrowRightIcon" tone="subdued"></NpIcon>
                    </div>
                    <DateInput type="until" :value="!currentDateRange ? void 0 : currentDateRange.since.toSqlString()"
                        @change="onUpdateDateRangeFromTextField" :should-display-abbreviated-month="false"
                        :disable-dates-after="todayDate"></DateInput>
                </NpInlineGrid>

                <NpBox>
                    <NpDatePicker @monthChange="" :month="calendarPosition.month" :year="calendarPosition.year"
                        @update:modelValue="onUpdateDateRangeFromCalendar" :model-value="selectedDate"
                        :allow-range="true" :multi-month="false" :disableDatesAfter="false">
                    </NpDatePicker>
                </NpBox>
            </NpBlockStack>
        </NpBox>
        <NpInlineGrid v-else :columns="{ md: '180px 1fr', lg: 'minmax(160px, 210px) minmax(520px, 1fr)' }">
            <NpBox border-inline-end-width="025"
                :border-color="quickPicks.common.length < 10 ? 'border-secondary' : 'transparent'">
                <DateList :selected-date-range="currentDateRange" :quick-picks="quickPicks"
                    @change="onUpdateDateRangeFromQuickPicks"></DateList>
            </NpBox>
            <NpBox padding="400">
                <NpBlockStack>
                    <NpInlineGrid columns="1fr auto 1fr" align-items="center" gap="200">
                        <DateInput type="since"
                            :value="!currentDateRange ? void 0 : currentDateRange.since.toSqlString()"
                            @change="onUpdateDateRangeFromTextField"
                            :should-display-abbreviated-month="layout === 'medium'" :disable-dates-after="todayDate">
                        </DateInput>
                        <div class="ArrowIcon">
                            <NpIcon :source="ArrowRightIcon" tone="subdued"></NpIcon>
                        </div>
                        <DateInput type="until"
                            :value="!currentDateRange ? void 0 : currentDateRange.since.toSqlString()"
                            @change="onUpdateDateRangeFromTextField"
                            :should-display-abbreviated-month="layout === 'medium'" :disable-dates-after="todayDate">
                        </DateInput>
                    </NpInlineGrid>
                    <NpBox>
                        <NpDatePicker @monthChange="onUpdateCalendarPosition" :month="calendarPosition.month"
                            :year="calendarPosition.year" @update:modelValue="onUpdateDateRangeFromCalendar"
                            :model-value="selectedDate" :allow-range="true" :multi-month="true"
                            :disableDatesAfter="false">
                        </NpDatePicker>
                    </NpBox>
                </NpBlockStack>
            </NpBox>
        </NpInlineGrid>
        <NpDivider></NpDivider>
        <NpBox padding="400">
            <NpBlockStack>
                <Buttons :disable-apply-button="!isDirty"></Buttons>
            </NpBlockStack>
        </NpBox>
    </div>
</template>
<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { NpBox, NpBlockStack, NpInlineGrid, NpDivider, NpIcon, NpDatePicker } from "@ncpl/ncpl-polaris"
import Buttons from "./Buttons.vue";
import DateSelect from "./DateSelect.vue";
import DateInput from "./DateInput.vue";
import { ArrowRightIcon } from "@ncpl/ncpl-icons";
import DateList from "./DateList.vue";
import { useCommon } from "../../context";
import { HumanizedDate, rangeDate, isRangeDateType, type RangeDateType } from "../utils/analytics-date-range";
import type { PrimaryQuickPicks } from "../utils/use-quick-picks";
import type { DatePickerProps } from "@ncpl/ncpl-polaris"


const { ianaTimeZone } = useCommon();
const props = defineProps<{
    dateRange?: RangeDateType,
    quickPicks: PrimaryQuickPicks;
    layout: 'large' | 'small' | 'medium';
}>();

const currentDateRange = ref<RangeDateType | undefined>(props.dateRange);
const selectedDate = computed<DatePickerProps['modelValue']>(() => !currentDateRange.value ? void 0 : {
    start: currentDateRange.value.since.getBrowserValueAtZeroTime(),
    end: currentDateRange.value.until.getBrowserValueAtZeroTime()
});
const calendarPosition = ref(getCalendarPosition(currentDateRange.value));
const isDirty = ref<boolean>(false);
const source = ref<string | undefined | null>()

const maxWidth = computed(() => {
    return props.layout === "small" ? undefined :
        props.layout === "medium" ? "530px" : "730px"
});

const todayDate = computed(() => {
    const p = new HumanizedDate("today", ianaTimeZone.value).value
        , D = new Date
    return p > D ? p : D
})


watch(() => [props.layout], () => {
    calendarPosition.value = getCalendarPosition(currentDateRange.value);
})


function getCalendarPosition(dateRange?: RangeDateType) {
    const n = dateRange ?? rangeDate({
        since: 'today',
        until: 'today',
        timeZone: ianaTimeZone.value
    }), a = n.until.getPrevious({
        quantity: 1,
        unit: 'm'
    }), l = props.layout === 'large',
        {
            month: r,
            year: c
        } = l ? a : n.until;
    return {
        month: r - 1,
        year: c
    }
}
function isCalendarPosition(t?: RangeDateType) {
    if (!t) return !1;

    const {
        month: s,
        year: n
    } = calendarPosition.value;
    const a = props.layout;

    const {
        since: {
            month: l,
            year: r
        },
        until: {
            month: c,
            year: o
        }
    } = t,
        m = s + 1;
    if (a !== 'large') return c === m &&
        o === n;
    const u = t.until.getPrevious({
        quantity: 1,
        unit: 'm'
    }),
        y = c === m &&
            o === n,
        C = l === m &&
            r === n,
        b = u.month === m &&
            u.year === n;
    return y && C || b
}

function ae(t: RangeDateType, e: RangeDateType[]) {
    if (t == null) return null;
    const n = [
        ...e.filter(a => isRangeDateType(a) && a.isEqual(t))
    ];
    return n.length === 0 ? t : n[0]
}

function onUpdateDateRangeFromCalendar(range: DatePickerProps['modelValue']) {
    const {
        start: s,
        end: n
    } = range,
        a = rangeDate({
            since: s,
            until: n,
            timeZone: ianaTimeZone.value
        }),
        l = ae(a, props.quickPicks.all);
    currentDateRange.value = l ?? a;
    isDirty.value = true;
    source.value = 'calendar';
}
function onUpdateDateRangeFromQuickPicks(s: RangeDateType, n?: string) {
    const a = isCalendarPosition(s);
    !a && s != null &&
        (
            calendarPosition.value = getCalendarPosition(s)
        ), (
            currentDateRange.value = s,
            source.value = n,
            isDirty.value = true
        )
}
function onUpdateCalendarPosition(month: number, year: number) {
    calendarPosition.value = { month, year }
}
function onUpdateDateRangeFromTextField(inputValue: string, type: "since" | "until") {
    const selectedDateRange = currentDateRange.value;
    const timeZone = ianaTimeZone.value

    let a = rangeDate({
        since: inputValue,
        until: inputValue,
        timeZone
    });
    if (selectedDateRange) {
        const o = new HumanizedDate(inputValue, timeZone),
            m = {
                since: selectedDateRange.since,
                until: selectedDateRange.until
            };
        m[type] = o;
        const k = type === 'since' &&
            o.value > m.until.value,
            u = type === 'until' &&
                o.value < m.since.value;
        k ? m.until = o : u &&
            (m.since = o),
            a = rangeDate({
                since: m.since.value,
                until: m.until.value,
                timeZone
            })
    }
    const l = ae(a, props.quickPicks.all),
        r = isCalendarPosition(a);
    return !r &&
        a != null &&
        (
            calendarPosition.value = getCalendarPosition(a)
        ),
        (
            currentDateRange.value = l ?? a,
            isDirty.value = !0,
            source.value = 'input'
        )
}



</script>