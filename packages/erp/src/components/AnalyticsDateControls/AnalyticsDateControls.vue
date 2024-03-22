<template>
    <NpInlineStack>
        <NpPopover v-model:active="active">
            <template #activator>
                <NpButton size="slim" :icon="CalendarIcon" :disabled="disabled"
                    :show-notification-dot="showNotificationDot">{{ buttonContent }}</NpButton>
            </template>
            <Dialog :date-range="selectedRangeDate" @change="" @cancel="active = false" :quick-picks="primaryQuickPicks"
                :layout="lgUp ? 'large' : mdDown ? 'small' : 'medium'"></Dialog>
        </NpPopover>
    </NpInlineStack>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import Dialog from "./components/Dialog.vue";
import { NpPopover, NpInlineStack, NpButton, I18n, useBreakpoints } from '@ncpl/ncpl-polaris';
import { CalendarIcon } from "@ncpl/ncpl-icons";
import { rangeDate, HumanizedTimeFormat, isRangeDateType } from "./analytics-date-range";

type PropsType = {
    disabled?: boolean;
    showNotificationDot?: boolean;
}

withDefaults(defineProps<PropsType>(), {
    disabled: false,
    showNotificationDot: false,
})
const active = ref(false);
const selectedRangeDate = ref();
const { mdDown, lgUp } = useBreakpoints();


const buttonContent = computed(() => {
    if (selectedRangeDate.value.title != null)
            return selectedRangeDate.value.title;
        const d = primaryQuickPicks.value.all.find(g=>isRangeDateType(g) && selectedRangeDate.value.alias === g.alias);
        return (d == null ? void 0 : d.title) ?? selectedRangeDate.value.toHumanizedString(u)
})


const Fe = "_ArrowIcon_mvvec_1", Qe = {
    ArrowIcon: Fe
}
    , Le = {
        compareTo: "Compare to: {dateRange}",
        quickPicks: {
            today: "Today",
            yesterday: "Yesterday",
            last7days: "Last 7 days",
            last30days: "Last 30 days",
            last90days: "Last 90 days",
            lastMonth: "Last month",
            lastYear: "Last year",
            weekToDate: "Week to date",
            monthToDate: "Month to date",
            quarterToDate: "Quarter to date",
            yearToDate: "Year to date",
            last12months: "Last 12 months",
            last365days: "Last 365 days",
            bfcm: "BFCM ({year})",
            firstQuarter: "1st Quarter ({year})",
            secondQuarter: "2nd Quarter ({year})",
            thirdQuarter: "3rd Quarter ({year})",
            fourthQuarter: "4th Quarter ({year})",
            previousPeriod: "Previous period",
            previousYear: "Previous year",
            noComparison: "No comparison",
            sections: {
                bfcm: "Black Friday Cyber Monday",
                quarters: "Quarters"
            }
        },
        actionButtons: {
            apply: "Apply",
            cancel: "Cancel"
        },
        quickPicksDropdown: {
            customDateRange: "Custom",
            label: "Date range"
        },
        textFields: {
            placeholderDateValue: "YYYY-MM-DD",
            sinceTextFieldLabel: "Starting",
            untilTextFieldLabel: "Ending"
        },
        timeDimensions: {
            activatorText: "Group by: {timeDimension}",
            hour: "Hourly",
            day: "Daily",
            week: "Weekly",
            month: "Monthly",
            quarter: "Quarterly",
            year: "Yearly",
            hour_of_day: "Hour of day",
            day_of_week: "Day of week",
            month_of_year: "Month of year",
            none: "None"
        }
    }
    , Ye = {
        AnalyticsDateControls: Le
    }
    , Ue = {
        compareTo: "对比：{dateRange}",
        quickPicks: {
            today: "今天",
            yesterday: "昨天",
            last7days: "过去 7 天",
            last30days: "过去 30 天",
            last90days: "过去 90 天",
            lastMonth: "上个月",
            lastYear: "去年",
            weekToDate: "本周至今",
            monthToDate: "本月至今",
            quarterToDate: "本季度至今",
            yearToDate: "本年至今",
            last12months: "过去 12 个月",
            last365days: "过去 365 天",
            bfcm: "BFCM（{year} 年）",
            firstQuarter: "第一季度（{year} 年）",
            secondQuarter: "第二季度（{year} 年）",
            thirdQuarter: "第三季度（{year} 年）",
            fourthQuarter: "第四季度（{year} 年）",
            previousPeriod: "上一时间段",
            previousYear: "前一年",
            noComparison: "无对比",
            sections: {
                bfcm: "黑色星期五/网络星期一",
                quarters: "季度"
            }
        },
        actionButtons: {
            apply: "应用",
            cancel: "取消"
        },
        quickPicksDropdown: {
            customDateRange: "自定义",
            label: "日期范围"
        },
        textFields: {
            placeholderDateValue: "YYYY-MM-DD",
            sinceTextFieldLabel: "开始日期",
            untilTextFieldLabel: "结束日期"
        },
        timeDimensions: {
            hour: "每小时",
            day: "每天",
            week: "每周",
            month: "每月",
            quarter: "每季度",
            year: "每年",
            hour_of_day: "一天中的某一小时",
            day_of_week: "一周中的某一天",
            month_of_year: "一年中的某一月",
            none: "无",
            activatorText: "分组依据：{timeDimension}"
        }
    }
    , Ze = {
        AnalyticsDateControls: Ue
    }
    , E = {
        [Symbol.for("i18n-id")]: "AnalyticsDateControls_7w9cyn",
        en: Ye,
        "zh-CN": Ze
    };

const i18n = computed(() => new I18n(Ze));

const s = "America/New_York";
const currentTime = computed(() => new HumanizedTimeFormat(new Date, s))

const n = computed(() => [{
    title: i18n.value.translate("AnalyticsDateControls.quickPicks.today"),
    alias: "today",
    since: "today",
    until: "today"
}, {
    title: i18n.value.translate("AnalyticsDateControls.quickPicks.yesterday"),
    alias: "yesterday",
    since: "yesterday",
    until: "yesterday"
}, {
    title: i18n.value.translate("AnalyticsDateControls.quickPicks.last7days"),
    alias: "last7days",
    since: "-7d",
    until: "-1d"
}, {
    title: i18n.value.translate("AnalyticsDateControls.quickPicks.last30days"),
    alias: "last30days",
    since: "-30d",
    until: "-1d"
}, {
    title: i18n.value.translate("AnalyticsDateControls.quickPicks.last90days"),
    alias: "last90days",
    since: "-90d",
    until: "-1d"
}, {
    title: i18n.value.translate("AnalyticsDateControls.quickPicks.last365days"),
    alias: "last365days",
    since: "-365d",
    until: "-1d"
}, {
    title: i18n.value.translate("AnalyticsDateControls.quickPicks.lastMonth"),
    alias: "last_month",
    since: "-1m",
    until: "-1m"
}, {
    title: i18n.value.translate("AnalyticsDateControls.quickPicks.last12months"),
    alias: "last12months",
    since: "-12m",
    until: "-1m"
}, {
    title: i18n.value.translate("AnalyticsDateControls.quickPicks.lastYear"),
    alias: "last_year",
    since: "-1y",
    until: "-1y"
}, {
    title: i18n.value.translate("AnalyticsDateControls.quickPicks.weekToDate"),
    alias: "week_to_date",
    since: "0w",
    until: "today"
}, {
    title: i18n.value.translate("AnalyticsDateControls.quickPicks.monthToDate"),
    alias: "month_to_date",
    since: "0m",
    until: "today"
}, {
    title: i18n.value.translate("AnalyticsDateControls.quickPicks.quarterToDate"),
    alias: "quarter_to_date",
    since: "0q",
    until: "today"
}, {
    title: i18n.value.translate("AnalyticsDateControls.quickPicks.yearToDate"),
    alias: "year_to_date",
    since: "0y",
    until: "today"
}].map(h => rangeDate({
    ...h,
    timeZone: s
}))
);


const r = (h: string) => {
    const p = new HumanizedTimeFormat(h, s)
        , D = {
            1: "AnalyticsDateControls.quickPicks.firstQuarter",
            2: "AnalyticsDateControls.quickPicks.secondQuarter",
            3: "AnalyticsDateControls.quickPicks.thirdQuarter",
            4: "AnalyticsDateControls.quickPicks.fourthQuarter"
        };
    return {
        title: i18n.value.translate(D[p.quarter], {
            year: p.year
        }),
        alias: `quarter-${p.quarter}-${p.year}`
    }
}
const c = computed(() => [{
    title: r("-1q").title,
    alias: r("-1q").alias,
    since: "-1q",
    until: "-1q"
}, {
    title: r("-2q").title,
    alias: r("-2q").alias,
    since: "-2q",
    until: "-2q",
    comparisonOf: r("-1q").alias
}, {
    title: r("-3q").title,
    alias: r("-3q").alias,
    since: "-3q",
    until: "-3q",
    comparisonOf: r("-2q").alias
}, {
    title: r("-4q").title,
    alias: r("-4q").alias,
    since: "-4q",
    until: "-4q",
    comparisonOf: r("-3q").alias
}].map(h => rangeDate({
    ...h,
    timeZone: s
}))
);





const u = computed(() => ({
    title: i18n.value.translate("AnalyticsDateControls.quickPicks.noComparison"),
    alias: "noComparison"
}))
const y = computed(() => selectedRangeDate.value.getComparisonRange({
    type: "previousPeriod",
    title: i18n.value.translate("AnalyticsDateControls.quickPicks.previousPeriod")
}))
const C = computed(() => selectedRangeDate.value.getComparisonRange({
    type: "previousYear",
    title: i18n.value.translate("AnalyticsDateControls.quickPicks.previousYear")
}))


const primaryQuickPicks = computed(() => {
    return {
        common: n.value,
        quarters: {
            title: i18n.value.translate("AnalyticsDateControls.quickPicks.sections.quarters"),
            alias: "quarters",
            options: c.value
        },
        all: [...n.value, ...c.value]
    }
})

const comparisonQuickPicks = computed(() => {
    return {
        common: [u.value, y.value, C.value],
        quarters: {
            title: i18n.value.translate("AnalyticsDateControls.quickPicks.sections.quarters"),
            alias: "quarters",
            options: c.value
        },
        all: [u.value, y.value, C.value, ...c.value]
    }
})
</script>