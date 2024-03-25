
import { HumanizedDate, rangeDate, type RangeDateType } from "./analytics-date-range";
import { useCommon } from "../../context"


const quarterTitle = (h: string) => {

    const { i18n, shopTimeZone } = useCommon();

    const p = new HumanizedDate(h, shopTimeZone.value)
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

type ComparisonQuickPick = {
    title: string;
    alias?: string;
} | RangeDateType;

export interface ComparisonQuickPicks {
    common: ComparisonQuickPick[];
    quarters: {
        title: string;
        alias: string;
        options: RangeDateType[];
    };
    all: ComparisonQuickPick[];
}

export interface PrimaryQuickPicks {
    common: RangeDateType[];
    quarters: {
        title: string;
        alias: string;
        options: RangeDateType[];
    },
    all: RangeDateType[];
}

export interface QuickPicksType {
    primaryQuickPicks: PrimaryQuickPicks;
    comparisonQuickPicks: ComparisonQuickPicks;
}

export const useQuickPicks = (selectedRangeDate: RangeDateType): QuickPicksType => {


    const { i18n, shopTimeZone } = useCommon();

    const baseOpitons = [{
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
        timeZone: shopTimeZone.value
    }));


    const quarterOptions = [{
        title: quarterTitle("-1q").title,
        alias: quarterTitle("-1q").alias,
        since: "-1q",
        until: "-1q"
    }, {
        title: quarterTitle("-2q").title,
        alias: quarterTitle("-2q").alias,
        since: "-2q",
        until: "-2q",
        comparisonOf: quarterTitle("-1q").alias
    }, {
        title: quarterTitle("-3q").title,
        alias: quarterTitle("-3q").alias,
        since: "-3q",
        until: "-3q",
        comparisonOf: quarterTitle("-2q").alias
    }, {
        title: quarterTitle("-4q").title,
        alias: quarterTitle("-4q").alias,
        since: "-4q",
        until: "-4q",
        comparisonOf: quarterTitle("-3q").alias
    }].map(h => rangeDate({
        ...h,
        timeZone: shopTimeZone.value
    }));

    const u = {
        title: i18n.value.translate("AnalyticsDateControls.quickPicks.noComparison"),
        alias: "noComparison"
    }, y = selectedRangeDate.getComparisonRange({
        type: "previousPeriod",
        title: i18n.value.translate("AnalyticsDateControls.quickPicks.previousPeriod")
    }), C = selectedRangeDate.getComparisonRange({
        type: "previousYear",
        title: i18n.value.translate("AnalyticsDateControls.quickPicks.previousYear")
    })

    return {
        primaryQuickPicks: {
            common: baseOpitons,
            quarters: {
                title: i18n.value.translate("AnalyticsDateControls.quickPicks.sections.quarters"),
                alias: "quarters",
                options: quarterOptions
            },
            all: [...baseOpitons, ...quarterOptions]
        },
        comparisonQuickPicks: {
            common: [u, y, C],
            quarters: {
                title: i18n.value.translate("AnalyticsDateControls.quickPicks.sections.quarters"),
                alias: "quarters",
                options: quarterOptions
            },
            all: [u, y, C, ...quarterOptions]
        }
    }
}

