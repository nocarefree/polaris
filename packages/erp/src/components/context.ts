import { ref, inject, type Ref } from "vue"
import { I18n } from "@ncpl/ncpl-polaris";


const i18nContent = {
    en: {
        AnalyticsDateControls: {
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
    },
    zh: {
        AnalyticsDateControls: {
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
    }
}

const i18n = ref(new I18n(i18nContent.zh));

export const ianaTimeZoneKey = Symbol("InjectionKey");
export const useCommon = () => {
    return {
        ianaTimeZone: inject<Ref<string>>(ianaTimeZoneKey, ref('UTC')),
        i18n: i18n,
        shopTimeZone: "America/New_York",
    }
}



