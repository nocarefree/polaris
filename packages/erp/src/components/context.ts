import { ref, inject, type Ref } from "vue"
import { I18n } from "@ncpl/ncpl-polaris";
import { browserTimeZone } from "./AnalyticsDateControls/utils/analytics-date-range";


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


export interface MetricType{
    id:string;
    
}

const metrics = [
    {
        "id": "total-sales",
        "cardType": "full",
        "handle": "total-sales",
        "isHidden": false,
        "hideComparison": false,
        "metricDomain": "SALES",
        "metricsLibraryPreviewDescription": "将企业一段时间内的总销售额绘制图表并与过去的总销售额进行对比。",
        "overridePrimaryMetric": false,
        "overrideVisualization": false,
        "channels": null,
        "popover": {
            "definition": "总销售额等于毛销售额加上运费、税费、关税及其他费用，然后减去任何折扣和退款。包含所有销售渠道。",
            "formula": "总销售额 = 毛销售额 - 折扣 - 退款 + 运费 + 税费 + 关税 + 其他费用",
            "__typename": "Popover"
        },
        "primaryMetricConfig": {
            "operation": "SUM",
            "operationColumn": "total_sales",
            "valueFormat": "PRICE",
            "trendIndicator": {
                "isDownwardPositive": false,
                "isNeutral": false,
                "__typename": "TrendIndicator"
            },
            "__typename": "PrimaryMetricConfig"
        },
        "queries": [
            {
                "meta": {
                    "type": "primary",
                    "dataOnly": null,
                    "handle": "total_sales",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW total_sales\nOVER <%= overPeriod %> AS over\nFROM sales\n<% if (channelFilter) { %> WHERE <%= channelFilter %> <% } %>\nSINCE <%= period.since %>\nUNTIL <%= period.until %>\nORDER BY over ASC",
                "queryMeta": null,
                "__typename": "MetricQuery"
            }
        ],
        "report": {
            "handle": "sales_over_time",
            "params": null,
            "ignoreDatePicker": false,
            "__typename": "Report"
        },
        "requiresOnlineStore": false,
        "requiresPos": false,
        "title": "总销售额",
        "visualization": {
            "vizType": "LINE",
            "props": null,
            "options": {
                "__typename": "LineOptions",
                "valueFormat": "PRICE"
            },
            "__typename": "Visualization"
        },
        "footer": null,
        "__typename": "V1Metric"
    },
    {
        "id": "sales-channels",
        "cardType": "full",
        "handle": "sales-channels",
        "isHidden": false,
        "hideComparison": false,
        "metricDomain": "SALES",
        "metricsLibraryPreviewDescription": "对比热门销售渠道的总销售额。",
        "overridePrimaryMetric": false,
        "overrideVisualization": false,
        "channels": null,
        "popover": {
            "definition": "每个活跃销售渠道的总销售额。",
            "formula": null,
            "__typename": "Popover"
        },
        "primaryMetricConfig": null,
        "queries": [
            {
                "meta": {
                    "type": "primary",
                    "dataOnly": null,
                    "handle": "total_sales_by_channel",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW total_sales\nBY api_client_title\nFROM sales\n<% if (channelFilter) { %> WHERE <%= channelFilter %> <% } %>\n<% if (dateCondition) { %>\n  <%= channelFilter ? 'AND' : 'WHERE' %> <%= overPeriod %> < <%= dateCondition %>\n<% } %>\nSINCE <%= period.since %>\nUNTIL <%= period.until %>\nORDER BY total_sales DESC LIMIT 5",
                "queryMeta": null,
                "__typename": "MetricQuery"
            }
        ],
        "report": {
            "handle": "sales_by_channel_name",
            "params": null,
            "ignoreDatePicker": false,
            "__typename": "Report"
        },
        "requiresOnlineStore": false,
        "requiresPos": false,
        "title": "按渠道显示销售额",
        "visualization": {
            "vizType": "DYNAMICBAR",
            "props": null,
            "options": {
                "__typename": "DynamicBarOptions",
                "valueFormat": "PRICE"
            },
            "__typename": "Visualization"
        },
        "footer": null,
        "__typename": "V1Metric"
    },
    {
        "id": "sessions",
        "cardType": "full",
        "handle": "sessions",
        "isHidden": false,
        "hideComparison": false,
        "metricDomain": "ACQUISITION",
        "metricsLibraryPreviewDescription": "查看一段时间内的在线商店流量并与过去的流量趋势进行对比。",
        "overridePrimaryMetric": false,
        "overrideVisualization": false,
        "channels": [
            {
                "apiClientId": 580111,
                "handle": "online_store",
                "__typename": "ApiClientChannel"
            }
        ],
        "popover": {
            "definition": "您在线商店的流量大小，以访问数显示。",
            "formula": null,
            "__typename": "Popover"
        },
        "primaryMetricConfig": {
            "operation": "SUM",
            "operationColumn": "total_sessions",
            "valueFormat": "NUMBER",
            "trendIndicator": {
                "isDownwardPositive": false,
                "isNeutral": false,
                "__typename": "TrendIndicator"
            },
            "__typename": "PrimaryMetricConfig"
        },
        "queries": [
            {
                "meta": {
                    "type": "primary",
                    "dataOnly": null,
                    "handle": "total_sessions_over_time",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW total_sessions, total_visitors\nOVER <%= overPeriod %>(timestamp) AS visit_timestamp\nFROM visits\nSINCE <%= period.since %>\nUNTIL <%= period.until %>\nORDER BY visit_timestamp ASC",
                "queryMeta": null,
                "__typename": "MetricQuery"
            }
        ],
        "report": {
            "handle": "sessions_over_time",
            "params": null,
            "ignoreDatePicker": false,
            "__typename": "Report"
        },
        "requiresOnlineStore": true,
        "requiresPos": false,
        "title": "在线商店访问",
        "visualization": {
            "vizType": "LINE",
            "props": null,
            "options": null,
            "__typename": "Visualization"
        },
        "footer": null,
        "__typename": "V1Metric"
    },
    {
        "id": "conversion-rate",
        "cardType": "full",
        "handle": "conversion-rate",
        "isHidden": false,
        "hideComparison": false,
        "metricDomain": "BEHAVIOR",
        "metricsLibraryPreviewDescription": "了解在线商店购物者成为客户的频率，将总访问数与达成订单的访问数进行对比。",
        "overridePrimaryMetric": true,
        "overrideVisualization": true,
        "channels": null,
        "popover": {
            "definition": "达成在线商店订单的访问数占总访问数的百分比。",
            "formula": "在线商店转化率 = [转化的访问数/所有访问数] * 100",
            "__typename": "Popover"
        },
        "primaryMetricConfig": null,
        "queries": [
            {
                "meta": {
                    "type": "primary",
                    "dataOnly": null,
                    "handle": "checkouts",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW total_sessions, total_carts, total_checkouts, total_orders_placed\nFROM visits\n<% if (dateCondition) { %>\n  WHERE <%= overPeriod %> < <%= dateCondition %>\n<% } %>\nSINCE <%= period.since %>\nUNTIL <%= period.until %>",
                "queryMeta": null,
                "__typename": "MetricQuery"
            }
        ],
        "report": {
            "handle": "online_store_conversion",
            "params": null,
            "ignoreDatePicker": false,
            "__typename": "Report"
        },
        "requiresOnlineStore": true,
        "requiresPos": false,
        "title": "在线商店转化率",
        "visualization": {
            "vizType": "DATATABLE",
            "props": null,
            "options": null,
            "__typename": "Visualization"
        },
        "footer": null,
        "__typename": "V1Metric"
    },
    {
        "id": "total-orders",
        "cardType": "full",
        "handle": "total-orders",
        "isHidden": false,
        "hideComparison": false,
        "metricDomain": "ORDERS",
        "metricsLibraryPreviewDescription": "了解企业一段时间内的总订单数并与过去的订单数进行对比。",
        "overridePrimaryMetric": false,
        "overrideVisualization": false,
        "channels": null,
        "popover": {
            "definition": "所有销售渠道的订单总数。",
            "formula": null,
            "__typename": "Popover"
        },
        "primaryMetricConfig": {
            "operation": "SUM",
            "operationColumn": "total_orders",
            "valueFormat": "NUMBER",
            "trendIndicator": {
                "isDownwardPositive": false,
                "isNeutral": false,
                "__typename": "TrendIndicator"
            },
            "__typename": "PrimaryMetricConfig"
        },
        "queries": [
            {
                "meta": {
                    "type": "primary",
                    "dataOnly": null,
                    "handle": "total_orders_over_time",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW total_orders\nOVER <%= overPeriod %>(happened_at) AS timestamp\nFROM sales\n<% if (channelFilter) { %> WHERE <%= channelFilter %> <% } %>\nSINCE <%= period.since %>\nUNTIL <%= period.until %>\nORDER BY timestamp ASC",
                "queryMeta": null,
                "__typename": "MetricQuery"
            }
        ],
        "report": {
            "handle": "orders_over_time",
            "params": null,
            "ignoreDatePicker": false,
            "__typename": "Report"
        },
        "requiresOnlineStore": false,
        "requiresPos": false,
        "title": "总订单数",
        "visualization": {
            "vizType": "LINE",
            "props": null,
            "options": null,
            "__typename": "Visualization"
        },
        "footer": null,
        "__typename": "V1Metric"
    },
    {
        "id": "average-order-value",
        "cardType": "full",
        "handle": "average-order-value",
        "isHidden": false,
        "hideComparison": false,
        "metricDomain": "SALES",
        "metricsLibraryPreviewDescription": "查看客户平均消费金额在一段时间内的变化并与过去的时段进行对比。",
        "overridePrimaryMetric": false,
        "overrideVisualization": false,
        "channels": null,
        "popover": {
            "definition": "毛销售额（减去折扣）除以总订单数。不含调整，例如初始下单后对订单进行的任何编辑、换货或退货。",
            "formula": "平均订单金额 = [毛销售额 - 折扣]/订单数",
            "__typename": "Popover"
        },
        "primaryMetricConfig": {
            "operation": "NONE",
            "operationColumn": "average_order_value",
            "valueFormat": "PRICE",
            "trendIndicator": {
                "isDownwardPositive": false,
                "isNeutral": false,
                "__typename": "TrendIndicator"
            },
            "__typename": "PrimaryMetricConfig"
        },
        "queries": [
            {
                "meta": {
                    "type": "primary",
                    "dataOnly": null,
                    "handle": "aov_over_time",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW average_order_value\nOVER  <%= overPeriod %>(happened_at) AS timestamp\nFROM sales\n<% if (channelFilter) { %> WHERE <%= channelFilter %> <% } %>\nSINCE <%= period.since %>\nUNTIL <%= period.until %>\nORDER BY timestamp ASC",
                "queryMeta": null,
                "__typename": "MetricQuery"
            },
            {
                "meta": {
                    "type": "primaryMetric",
                    "dataOnly": null,
                    "handle": "primary_metric_aov",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW average_order_value\nFROM sales\n<% if (channelFilter) { %> WHERE <%= channelFilter %> <% } %>\n<% if (dateCondition) { %>\n  <%= channelFilter ? 'AND' : 'WHERE' %> <%= overPeriod %> < <%= dateCondition %>\n<% } %>\nSINCE <%= period.since %>\nUNTIL <%= period.until %>",
                "queryMeta": null,
                "__typename": "MetricQuery"
            }
        ],
        "report": {
            "handle": "average_order_value",
            "params": null,
            "ignoreDatePicker": false,
            "__typename": "Report"
        },
        "requiresOnlineStore": false,
        "requiresPos": false,
        "title": "平均订单金额",
        "visualization": {
            "vizType": "LINE",
            "props": null,
            "options": {
                "__typename": "LineOptions",
                "valueFormat": "PRICE"
            },
            "__typename": "Visualization"
        },
        "footer": null,
        "__typename": "V1Metric"
    },
    {
        "id": "top-products-by-units-sold",
        "cardType": "full",
        "handle": "top-products-by-units-sold",
        "isHidden": false,
        "hideComparison": false,
        "metricDomain": "SALES",
        "metricsLibraryPreviewDescription": "了解哪些是畅销产品及其销售额的变化情况。",
        "overridePrimaryMetric": false,
        "overrideVisualization": false,
        "channels": null,
        "popover": {
            "definition": "销售量最大的产品。包括所有销售渠道的订单。",
            "formula": null,
            "__typename": "Popover"
        },
        "primaryMetricConfig": null,
        "queries": [
            {
                "meta": {
                    "type": "primary",
                    "dataOnly": null,
                    "handle": "top_products",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW net_quantity\nBY product_title\nFROM sales\nWHERE sale_line_type == 'product'\n<% if (channelFilter) { %> AND <%= channelFilter %> <% } %>\n<% if (dateCondition) { %>\n  AND <%= overPeriod %> < <%= dateCondition %>\n<% } %>\nSINCE <%= period.since %>\nUNTIL <%= period.until %>\nORDER BY net_quantity DESC LIMIT 1000",
                "queryMeta": null,
                "__typename": "MetricQuery"
            }
        ],
        "report": {
            "handle": "sales_by_product_name",
            "params": {
                "sort": "net_quantity,DESC"
            },
            "ignoreDatePicker": false,
            "__typename": "Report"
        },
        "requiresOnlineStore": false,
        "requiresPos": false,
        "title": "畅销产品",
        "visualization": {
            "vizType": "DYNAMICBAR",
            "props": null,
            "options": null,
            "__typename": "Visualization"
        },
        "footer": null,
        "__typename": "V1Metric"
    },
    {
        "id": "customer-cohort-analysis",
        "cardType": "full",
        "handle": "customer-cohort-analysis",
        "isHidden": false,
        "hideComparison": false,
        "metricDomain": "CUSTOMERS",
        "metricsLibraryPreviewDescription": "了解复购的客户群体及复购频率。",
        "overridePrimaryMetric": true,
        "overrideVisualization": true,
        "channels": null,
        "popover": {
            "definition": "返回商店并复购的客户群体的百分比。这些群体按其首次下单日期进行分组。",
            "formula": null,
            "__typename": "Popover"
        },
        "primaryMetricConfig": null,
        "queries": [
            {
                "meta": {
                    "type": "primary",
                    "dataOnly": null,
                    "handle": "customer_retention_query_v4",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW total_customers AS \"customer_retention\"\nBY customer_cohort_period, periods_since_first_purchase\nFROM customer_cohorts_v4_monthly_rollup\nWHERE (periods_since_first_purchase < 12)\nSINCE -12m UNTIL -1m\nORDER BY \"customer_cohort_period\" ASC, \"periods_since_first_purchase\" ASC\nLIMIT 1000",
                "queryMeta": null,
                "__typename": "MetricQuery"
            }
        ],
        "report": {
            "handle": "customer_cohort_analysis",
            "params": null,
            "ignoreDatePicker": true,
            "__typename": "Report"
        },
        "requiresOnlineStore": false,
        "requiresPos": false,
        "title": "客户群体分析",
        "visualization": {
            "vizType": "COHORT",
            "props": null,
            "options": null,
            "__typename": "Visualization"
        },
        "footer": null,
        "__typename": "V1Metric"
    },
    {
        "id": "returning-customer-rate",
        "cardType": "full",
        "handle": "returning-customer-rate",
        "isHidden": false,
        "hideComparison": false,
        "metricDomain": "CUSTOMERS",
        "metricsLibraryPreviewDescription": "查看多次下单客户所占的百分比及其随时间推移的变化。",
        "overridePrimaryMetric": true,
        "overrideVisualization": true,
        "channels": null,
        "popover": {
            "definition": "在您选择的日期范围内下订单的客户中，从您的商店中多次下单的客户的百分比。",
            "formula": "复购率 = [回头客数/总客户数] * 100",
            "__typename": "Popover"
        },
        "primaryMetricConfig": null,
        "queries": [
            {
                "meta": {
                    "type": "primary",
                    "dataOnly": null,
                    "handle": "customers",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW customers\nBY customer_type\nFROM sales\n<% if (channelFilter) { %> WHERE <%= channelFilter %> <% } %>\n<% if (dateCondition) { %>\n  <%= channelFilter ? 'AND' : 'WHERE' %> <%= overPeriod %> < <%= dateCondition %>\n<% } %>\nSINCE <%= period.since %>\nUNTIL <%= period.until %>",
                "queryMeta": null,
                "__typename": "MetricQuery"
            },
            {
                "meta": {
                    "type": null,
                    "dataOnly": null,
                    "handle": "first_time_customers_over_time",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW customers\nOVER <%= overPeriod %> BY customer_type\nFROM sales\nWHERE sale_kind == \"order\" AND sale_line_type == \"product\" AND customer_type == 'First-time'\n<% if (channelFilter) { %> AND <%= channelFilter %> <% } %>\nSINCE <%= period.since %>\nUNTIL <%= period.until %>\nORDER BY <%= overPeriod %> ASC",
                "queryMeta": null,
                "__typename": "MetricQuery"
            },
            {
                "meta": {
                    "type": null,
                    "dataOnly": null,
                    "handle": "returning_customers_over_time",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW customers\nOVER <%= overPeriod %> BY customer_type\nFROM sales\nWHERE sale_kind == \"order\" AND sale_line_type == \"product\" AND customer_type == 'Returning'\n<% if (channelFilter) { %> AND <%= channelFilter %> <% } %>\nSINCE <%= period.since %>\nUNTIL <%= period.until %>\nORDER BY <%= overPeriod %> ASC",
                "queryMeta": null,
                "__typename": "MetricQuery"
            }
        ],
        "report": {
            "handle": "customers_over_time",
            "params": null,
            "ignoreDatePicker": false,
            "__typename": "Report"
        },
        "requiresOnlineStore": true,
        "requiresPos": false,
        "title": "复购率",
        "visualization": {
            "vizType": "STACKEDAREA",
            "props": null,
            "options": null,
            "__typename": "Visualization"
        },
        "footer": null,
        "__typename": "V1Metric"
    },
    {
        "id": "sales-attributed-to-marketing",
        "cardType": "full",
        "handle": "sales-attributed-to-marketing",
        "isHidden": false,
        "hideComparison": false,
        "metricDomain": "MARKETING",
        "metricsLibraryPreviewDescription": "对比不同营销工作的总销售额。",
        "overridePrimaryMetric": false,
        "overrideVisualization": false,
        "channels": null,
        "popover": {
            "definition": "由可跟踪的营销工作为在线商店带来的流量而产生的总销售额。",
            "formula": null,
            "__typename": "Popover"
        },
        "primaryMetricConfig": null,
        "queries": [
            {
                "meta": {
                    "type": "primary",
                    "dataOnly": null,
                    "handle": "marketing_sales_by_campaign",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW total_sales\nBY utm_campaign_name\nFROM sales\nWHERE utm_campaign_name != NULL\n<% if (dateCondition) { %>\n  AND <%= overPeriod %> < <%= dateCondition %>\n<% } %>\n<% if (channelFilter) { %> AND <%= channelFilter %> <% } %>\nSINCE <%= period.since %>\nUNTIL <%= period.until %>\nORDER BY total_sales DESC LIMIT 5",
                "queryMeta": null,
                "__typename": "MetricQuery"
            }
        ],
        "report": {
            "handle": "sales_attributed_to_marketing",
            "params": {
                "filter": "utm_campaign_name!=NULL"
            },
            "ignoreDatePicker": false,
            "__typename": "Report"
        },
        "requiresOnlineStore": true,
        "requiresPos": false,
        "title": "营销活动带来的销售额",
        "visualization": {
            "vizType": "DYNAMICBAR",
            "props": null,
            "options": {
                "__typename": "DynamicBarOptions",
                "valueFormat": "PRICE"
            },
            "__typename": "Visualization"
        },
        "footer": null,
        "__typename": "V1Metric"
    },
    {
        "id": "sessions-by-location",
        "cardType": "full",
        "handle": "sessions-by-location",
        "isHidden": false,
        "hideComparison": false,
        "metricDomain": "ACQUISITION",
        "metricsLibraryPreviewDescription": "比较得出为您在线商店带来最大流量的地理位置，了解购物者的所在位置。",
        "overridePrimaryMetric": false,
        "overrideVisualization": false,
        "channels": null,
        "popover": {
            "definition": "您在线商店中带来最高访问量的相关地理位置。",
            "formula": null,
            "__typename": "Popover"
        },
        "primaryMetricConfig": null,
        "queries": [
            {
                "meta": {
                    "type": "primary",
                    "dataOnly": null,
                    "handle": "sessions_by_location",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW total_sessions\nBY location_country\nFROM visits\n<% if (dateCondition) { %>\n  WHERE <%= overPeriod %> < <%= dateCondition %>\n<% } %>\nSINCE <%= period.since %>\nUNTIL <%= period.until %>\nORDER BY total_sessions DESC LIMIT 5",
                "queryMeta": null,
                "__typename": "MetricQuery"
            }
        ],
        "report": {
            "handle": "sessions_by_location",
            "params": null,
            "ignoreDatePicker": false,
            "__typename": "Report"
        },
        "requiresOnlineStore": true,
        "requiresPos": false,
        "title": "按地点显示访问量",
        "visualization": {
            "vizType": "DYNAMICBAR",
            "props": null,
            "options": null,
            "__typename": "Visualization"
        },
        "footer": null,
        "__typename": "V1Metric"
    },
    {
        "id": "sessions-by-device-type",
        "cardType": "full",
        "handle": "sessions-by-device-type",
        "isHidden": false,
        "hideComparison": false,
        "metricDomain": "ACQUISITION",
        "metricsLibraryPreviewDescription": "查看用于访问您在线商店的最常见设备类型。 ",
        "overridePrimaryMetric": false,
        "overrideVisualization": false,
        "channels": null,
        "popover": {
            "definition": "用于访问您在线商店的设备类型以及每个类型的访问数。",
            "formula": null,
            "__typename": "Popover"
        },
        "primaryMetricConfig": null,
        "queries": [
            {
                "meta": {
                    "type": "primary",
                    "dataOnly": null,
                    "handle": "sessions_by_device_type",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW total_sessions\nBY ua_form_factor\nFROM visits\n<% if (dateCondition) { %>\n  WHERE <%= overPeriod %> < <%= dateCondition %>\n<% } %>\nSINCE <%= period.since %>\nUNTIL <%= period.until %>\nORDER BY total_sessions DESC",
                "queryMeta": null,
                "__typename": "MetricQuery"
            }
        ],
        "report": {
            "handle": "sessions_by_device",
            "params": null,
            "ignoreDatePicker": false,
            "__typename": "Report"
        },
        "requiresOnlineStore": true,
        "requiresPos": false,
        "title": "按设备类型显示访问量",
        "visualization": {
            "vizType": "DONUT",
            "props": null,
            "options": null,
            "__typename": "Visualization"
        },
        "footer": null,
        "__typename": "V1Metric"
    },
    {
        "id": "sessions-by-social-source",
        "cardType": "full",
        "handle": "sessions-by-social-source",
        "isHidden": false,
        "hideComparison": false,
        "metricDomain": "ACQUISITION",
        "metricsLibraryPreviewDescription": "了解为您在线商店带来最大流量的社交媒体来源。",
        "overridePrimaryMetric": false,
        "overrideVisualization": false,
        "channels": null,
        "popover": {
            "definition": "为您在线商店带来最多访问的社交媒体推荐来源，例如 Facebook 或 Instagram。",
            "formula": null,
            "__typename": "Popover"
        },
        "primaryMetricConfig": null,
        "queries": [
            {
                "meta": {
                    "type": "primary",
                    "dataOnly": null,
                    "handle": "sessions_by_social_source",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW total_sessions\nBY referrer_name\nFROM visits\nWHERE referrer_source == 'Social'\n<% if (dateCondition) { %>\n  AND timestamp < <%= dateCondition %>\n<% } %>\nSINCE <%= period.since %>\nUNTIL <%= period.until %>\nORDER BY total_sessions DESC LIMIT 5",
                "queryMeta": null,
                "__typename": "MetricQuery"
            }
        ],
        "report": {
            "handle": "sessions_by_referrer",
            "params": {
                "referrer_source": "Social"
            },
            "ignoreDatePicker": false,
            "__typename": "Report"
        },
        "requiresOnlineStore": true,
        "requiresPos": false,
        "title": "按社交推荐来源显示访问量",
        "visualization": {
            "vizType": "DYNAMICBAR",
            "props": null,
            "options": null,
            "__typename": "Visualization"
        },
        "footer": null,
        "__typename": "V1Metric"
    },
    {
        "id": "sales-by-social-source",
        "cardType": "full",
        "handle": "sales-by-social-source",
        "isHidden": false,
        "hideComparison": false,
        "metricDomain": "ORDERS",
        "metricsLibraryPreviewDescription": "了解为您在线商店带来最高销量的社交媒体来源。",
        "overridePrimaryMetric": false,
        "overrideVisualization": false,
        "channels": null,
        "popover": {
            "definition": "源自社交媒体推荐来源（例如 Facebook 或 Instagram）的在线访问所带来的总销售额。",
            "formula": null,
            "__typename": "Popover"
        },
        "primaryMetricConfig": null,
        "queries": [
            {
                "meta": {
                    "type": "primary",
                    "dataOnly": null,
                    "handle": "sales_by_social_source",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW total_sales\nBY referrer_name\nFROM sales\nWHERE referrer_source == 'Social' AND referrer_name != \"\"\n<% if (dateCondition) { %>\n  AND happened_at < <%= dateCondition %>\n<% } %>\nSINCE <%= period.since %>\nUNTIL <%= period.until %>\nORDER BY total_sales DESC LIMIT 5",
                "queryMeta": null,
                "__typename": "MetricQuery"
            }
        ],
        "report": {
            "handle": "sales_by_referrer",
            "params": {
                "referrer_source": "Social"
            },
            "ignoreDatePicker": false,
            "__typename": "Report"
        },
        "requiresOnlineStore": false,
        "requiresPos": false,
        "title": "销售额（按社交渠道）",
        "visualization": {
            "vizType": "DYNAMICBAR",
            "props": null,
            "options": {
                "__typename": "DynamicBarOptions",
                "valueFormat": "PRICE"
            },
            "__typename": "Visualization"
        },
        "footer": null,
        "__typename": "V1Metric"
    },
    {
        "id": "top-referrers-by-sessions",
        "cardType": "full",
        "handle": "top-referrers-by-sessions",
        "isHidden": false,
        "hideComparison": false,
        "metricDomain": "ACQUISITION",
        "metricsLibraryPreviewDescription": "了解为您在线商店带来最大流量的网站。",
        "overridePrimaryMetric": false,
        "overrideVisualization": false,
        "channels": null,
        "popover": {
            "definition": "为在线商店带来最多访问的外部网站。",
            "formula": null,
            "__typename": "Popover"
        },
        "primaryMetricConfig": null,
        "queries": [
            {
                "meta": {
                    "type": "primary",
                    "dataOnly": null,
                    "handle": "top_referrers_by_sessions",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW total_sessions\nBY referrer_host\nFROM visits\nWHERE referrer_source == 'Unknown'\n<% if (dateCondition) { %>\n  AND <%= overPeriod %> < <%= dateCondition %>\n<% } %>\nSINCE <%= period.since %>\nUNTIL <%= period.until %>\nORDER BY total_sessions DESC",
                "queryMeta": null,
                "__typename": "MetricQuery"
            }
        ],
        "report": null,
        "requiresOnlineStore": true,
        "requiresPos": false,
        "title": "热门推荐渠道（按访问次数）",
        "visualization": {
            "vizType": "DATATABLE",
            "props": {
                "hide_scroll_indicator": true
            },
            "options": {
                "__typename": "DataTableOptions",
                "valueFormat": null,
                "getTitle": false,
                "getTitleLink": false,
                "primaryMetricColumn": "total_sessions",
                "titleColumn": "referrer_host"
            },
            "__typename": "Visualization"
        },
        "footer": null,
        "__typename": "V1Metric"
    },
    {
        "id": "sessions-by-traffic-source",
        "cardType": "full",
        "handle": "sessions-by-traffic-source",
        "isHidden": false,
        "hideComparison": false,
        "metricDomain": "ACQUISITION",
        "metricsLibraryPreviewDescription": "了解为您在线商店带来最大流量的来源。",
        "overridePrimaryMetric": false,
        "overrideVisualization": false,
        "channels": null,
        "popover": {
            "definition": "为您在线商店带来流量的流量来源类型（例如社交媒体或电子邮件）以及每种类型带来的访问数。",
            "formula": null,
            "__typename": "Popover"
        },
        "primaryMetricConfig": null,
        "queries": [
            {
                "meta": {
                    "type": "primary",
                    "dataOnly": null,
                    "handle": "traffic_source_sessions",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW total_sessions\nBY referrer_source\nFROM visits\n<% if (dateCondition) { %>\n  WHERE <%= overPeriod %> < <%= dateCondition %>\n<% } %>\nSINCE <%= period.since %>\nUNTIL <%= period.until %>\nORDER BY total_sessions DESC LIMIT 5",
                "queryMeta": null,
                "__typename": "MetricQuery"
            }
        ],
        "report": {
            "handle": "sessions_by_referrer",
            "params": null,
            "ignoreDatePicker": false,
            "__typename": "Report"
        },
        "requiresOnlineStore": true,
        "requiresPos": false,
        "title": "按流量来源显示访问量",
        "visualization": {
            "vizType": "DYNAMICBAR",
            "props": null,
            "options": null,
            "__typename": "Visualization"
        },
        "footer": null,
        "__typename": "V1Metric"
    },
    {
        "id": "sales-by-traffic-source",
        "cardType": "full",
        "handle": "sales-by-traffic-source",
        "isHidden": false,
        "hideComparison": false,
        "metricDomain": "SALES",
        "metricsLibraryPreviewDescription": "了解为您在线商店带来最高销量的流量来源。",
        "overridePrimaryMetric": false,
        "overrideVisualization": false,
        "channels": null,
        "popover": {
            "definition": "源自流量来源（例如社交媒体或电子邮件）的在线商店访问所带来的总销售额。",
            "formula": null,
            "__typename": "Popover"
        },
        "primaryMetricConfig": null,
        "queries": [
            {
                "meta": {
                    "type": "primary",
                    "dataOnly": null,
                    "handle": "sales_by_traffic_source",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW total_sales\nBY referrer_source\nFROM sales\n<% if (channelFilter) { %> WHERE <%= channelFilter %> <% } %>\n<% if (dateCondition) { %>\n  <%= channelFilter ? 'AND' : 'WHERE' %> <%= overPeriod %> < <%= dateCondition %>\n<% } %>\nSINCE <%= period.since %>\nUNTIL <%= period.until %>\nORDER BY total_sales DESC LIMIT 5",
                "queryMeta": null,
                "__typename": "MetricQuery"
            }
        ],
        "report": {
            "handle": "sales_by_referrer",
            "params": null,
            "ignoreDatePicker": false,
            "__typename": "Report"
        },
        "requiresOnlineStore": true,
        "requiresPos": false,
        "title": "销售额（按流量来源）",
        "visualization": {
            "vizType": "DYNAMICBAR",
            "props": null,
            "options": {
                "__typename": "DynamicBarOptions",
                "valueFormat": "PRICE"
            },
            "__typename": "Visualization"
        },
        "footer": null,
        "__typename": "V1Metric"
    },
    {
        "id": "top-landing-pages-by-sessions",
        "cardType": "full",
        "handle": "top-landing-pages-by-sessions",
        "isHidden": false,
        "hideComparison": false,
        "metricDomain": "ACQUISITION",
        "metricsLibraryPreviewDescription": "查看购物者访问您在线商店时最常使用的登陆页面。",
        "overridePrimaryMetric": false,
        "overrideVisualization": true,
        "channels": null,
        "popover": {
            "definition": "访客进入在线商店的热门网页，以及与每个登陆页面相关联的访问数。",
            "formula": null,
            "__typename": "Popover"
        },
        "primaryMetricConfig": null,
        "queries": [
            {
                "meta": {
                    "type": "primary",
                    "dataOnly": null,
                    "handle": "top_landing_pages",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW total_sessions\nBY page_path, host(page_url)\nFROM visits\nWHERE page_type != \"\" AND page_type != \"Unknown\"\n<% if (dateCondition) { %>\n  AND <%= overPeriod %> < <%= dateCondition %>\n<% } %>\nSINCE <%= period.since %>\nUNTIL <%= period.until %>\nORDER BY total_sessions DESC",
                "queryMeta": null,
                "__typename": "MetricQuery"
            }
        ],
        "report": {
            "handle": "sessions_by_landing_page",
            "params": null,
            "ignoreDatePicker": false,
            "__typename": "Report"
        },
        "requiresOnlineStore": true,
        "requiresPos": false,
        "title": "热门登陆页面（按访问次数）",
        "visualization": {
            "vizType": "DATATABLE",
            "props": {
                "truncate": true
            },
            "options": {
                "__typename": "DataTableOptions",
                "valueFormat": null,
                "getTitle": true,
                "getTitleLink": true,
                "primaryMetricColumn": "total_sessions",
                "titleColumn": "page_path"
            },
            "__typename": "Visualization"
        },
        "footer": null,
        "__typename": "V1Metric"
    },
    {
        "id": "retail-sales-by-staff-at-register",
        "cardType": "full",
        "handle": "retail-sales-by-staff-at-register",
        "isHidden": false,
        "hideComparison": false,
        "metricDomain": "SALES",
        "metricsLibraryPreviewDescription": "查看实体零售地点的每位员工获得的销售额明细。",
        "overridePrimaryMetric": false,
        "overrideVisualization": true,
        "channels": null,
        "popover": {
            "definition": "每位员工通过零售 POS 获得的总销售额。",
            "formula": null,
            "__typename": "Popover"
        },
        "primaryMetricConfig": null,
        "queries": [
            {
                "meta": {
                    "type": "primary",
                    "dataOnly": null,
                    "handle": "sales_by_staff",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW total_sales\nBY staff_name\nFROM sales\nWHERE api_client_title == 'Point of Sale'\n<% if (dateCondition) { %>\n  AND <%= overPeriod %> < <%= dateCondition %>\n<% } %>\n<% if (channelFilter) { %> AND <%= channelFilter %> <% } %>\nSINCE <%= period.since %>\nUNTIL <%= period.until %>\nORDER BY total_sales DESC",
                "queryMeta": null,
                "__typename": "MetricQuery"
            }
        ],
        "report": {
            "handle": "sales_by_employee",
            "params": null,
            "ignoreDatePicker": false,
            "__typename": "Report"
        },
        "requiresOnlineStore": false,
        "requiresPos": true,
        "title": "按收银台员工显示零售销售额",
        "visualization": {
            "vizType": "DATATABLE",
            "props": null,
            "options": {
                "__typename": "DataTableOptions",
                "valueFormat": "PRICE",
                "getTitle": false,
                "getTitleLink": false,
                "primaryMetricColumn": "total_sales",
                "titleColumn": "staff_name"
            },
            "__typename": "Visualization"
        },
        "footer": null,
        "__typename": "V1Metric"
    },
    {
        "id": "sales-by-pos-location",
        "cardType": "full",
        "handle": "sales-by-pos-location",
        "isHidden": false,
        "hideComparison": false,
        "metricDomain": "SALES",
        "metricsLibraryPreviewDescription": "对比所有实体零售地点的总销售额。",
        "overridePrimaryMetric": false,
        "overrideVisualization": true,
        "channels": null,
        "popover": {
            "definition": "每个实体零售 POS 地点的总销售额。",
            "formula": null,
            "__typename": "Popover"
        },
        "primaryMetricConfig": null,
        "queries": [
            {
                "meta": {
                    "type": "primary",
                    "dataOnly": null,
                    "handle": "sales_by_pos",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW total_sales\nBY pos_location_name\nFROM sales\nWHERE pos_location_name != ''\n<% if (dateCondition) { %>\n  AND <%= overPeriod %> < <%= dateCondition %>\n<% } %>\n<% if (channelFilter) { %> AND <%= channelFilter %> <% } %>\nSINCE <%= period.since %>\nUNTIL <%= period.until %>\nORDER BY total_sales DESC",
                "queryMeta": null,
                "__typename": "MetricQuery"
            }
        ],
        "report": {
            "handle": "sales_by_pos_location",
            "params": null,
            "ignoreDatePicker": false,
            "__typename": "Report"
        },
        "requiresOnlineStore": false,
        "requiresPos": true,
        "title": "按 POS 地点显示零售销售额",
        "visualization": {
            "vizType": "DATATABLE",
            "props": null,
            "options": {
                "__typename": "DataTableOptions",
                "valueFormat": "PRICE",
                "getTitle": false,
                "getTitleLink": false,
                "primaryMetricColumn": "total_sales",
                "titleColumn": "pos_location_name"
            },
            "__typename": "Visualization"
        },
        "footer": null,
        "__typename": "V1Metric"
    },
    {
        "id": "fulfilled-orders-over-time",
        "cardType": "full",
        "handle": "fulfilled-orders-over-time",
        "isHidden": false,
        "hideComparison": false,
        "metricDomain": "ORDERS",
        "metricsLibraryPreviewDescription": "了解您的商店在一段时间内可处理的订单量。",
        "overridePrimaryMetric": false,
        "overrideVisualization": false,
        "channels": null,
        "popover": {
            "definition": "已被处理并标记为“已发货”的订单的累计数量以及与历史趋势的对比情况。",
            "formula": null,
            "__typename": "Popover"
        },
        "primaryMetricConfig": {
            "operation": "SUM",
            "operationColumn": "orders_fulfilled",
            "valueFormat": "NUMBER",
            "trendIndicator": {
                "isDownwardPositive": false,
                "isNeutral": false,
                "__typename": "TrendIndicator"
            },
            "__typename": "PrimaryMetricConfig"
        },
        "queries": [
            {
                "meta": {
                    "type": "primary",
                    "dataOnly": null,
                    "handle": "fulfilled_orders_over_time",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW orders_fulfilled\nOVER <%= overPeriod %> AS timestamp\nFROM fulfillment_facts\n<% if (channelFilter) { %> WHERE <%= channelFilter %> <% } %>\nSINCE <%= period.since %>\nUNTIL <%= period.until %>\nORDER BY timestamp ASC",
                "queryMeta": null,
                "__typename": "MetricQuery"
            }
        ],
        "report": {
            "handle": "fulfillment_over_time",
            "params": {
                "show": "orders_fulfilled"
            },
            "ignoreDatePicker": false,
            "__typename": "Report"
        },
        "requiresOnlineStore": false,
        "requiresPos": false,
        "title": "按时间段显示已发货的订单",
        "visualization": {
            "vizType": "LINE",
            "props": null,
            "options": {
                "__typename": "LineOptions",
                "valueFormat": "NUMBER"
            },
            "__typename": "Visualization"
        },
        "footer": null,
        "__typename": "V1Metric"
    },
    {
        "id": "first-time-customer-rate",
        "cardType": "full",
        "handle": "first-time-customer-rate",
        "isHidden": false,
        "hideComparison": false,
        "metricDomain": "CUSTOMERS",
        "metricsLibraryPreviewDescription": "将一段时间内的新客户和回头客数绘制图表，并与过去的客户趋势进行对比。",
        "overridePrimaryMetric": false,
        "overrideVisualization": true,
        "channels": null,
        "popover": {
            "definition": "在您在线商店购物的客户总数，按新客户和回头客进行划分。",
            "formula": null,
            "__typename": "Popover"
        },
        "primaryMetricConfig": {
            "operation": "NONE",
            "operationColumn": "customers",
            "valueFormat": "NUMBER",
            "trendIndicator": {
                "isDownwardPositive": false,
                "isNeutral": false,
                "__typename": "TrendIndicator"
            },
            "__typename": "PrimaryMetricConfig"
        },
        "queries": [
            {
                "meta": {
                    "type": "primaryMetric",
                    "dataOnly": null,
                    "handle": "first_time_customers_over_time_primary_metric",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW customers\nFROM sales\nWHERE sale_kind == \"order\" AND sale_line_type == \"product\"\n<% if (channelFilter) { %> AND <%= channelFilter %> <% } %>\n<% if (dateCondition) { %>\n  AND <%= overPeriod %> < <%= dateCondition %>\n<% } %>\nSINCE <%= period.since %>\nUNTIL <%= period.until %>",
                "queryMeta": null,
                "__typename": "MetricQuery"
            },
            {
                "meta": {
                    "type": null,
                    "dataOnly": null,
                    "handle": "first_time_customers_over_time",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW customers\nOVER <%= overPeriod %> BY customer_type\nFROM sales\nWHERE sale_kind == \"order\" AND sale_line_type == \"product\" AND customer_type == 'First-time'\n<% if (channelFilter) { %> AND <%= channelFilter %> <% } %>\nSINCE <%= period.since %>\nUNTIL <%= period.until %>\nORDER BY <%= overPeriod %> ASC",
                "queryMeta": null,
                "__typename": "MetricQuery"
            },
            {
                "meta": {
                    "type": null,
                    "dataOnly": null,
                    "handle": "returning_customers_over_time",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW customers\nOVER <%= overPeriod %> BY customer_type\nFROM sales\nWHERE sale_kind == \"order\" AND sale_line_type == \"product\" AND customer_type == 'Returning'\n<% if (channelFilter) { %> AND <%= channelFilter %> <% } %>\nSINCE <%= period.since %>\nUNTIL <%= period.until %>\nORDER BY <%= overPeriod %> ASC",
                "queryMeta": null,
                "__typename": "MetricQuery"
            }
        ],
        "report": {
            "handle": "customers_over_time",
            "params": null,
            "ignoreDatePicker": false,
            "__typename": "Report"
        },
        "requiresOnlineStore": true,
        "requiresPos": false,
        "title": "按时间段显示客户（新客户和回头客）",
        "visualization": {
            "vizType": "STACKEDAREA",
            "props": null,
            "options": null,
            "__typename": "Visualization"
        },
        "footer": null,
        "__typename": "V1Metric"
    },
    {
        "id": "products-by-sell-through-rate",
        "cardType": "full",
        "handle": "products-by-sell-through-rate",
        "isHidden": false,
        "hideComparison": true,
        "metricDomain": "INVENTORY",
        "metricsLibraryPreviewDescription": "查看已售出总库存的百分比及其随时间推移的变化。",
        "overridePrimaryMetric": false,
        "overrideVisualization": true,
        "channels": null,
        "popover": {
            "definition": "所选时间段内已售出总库存的百分比。",
            "formula": "售罄率 = 售出的总商品数 / [售出的总商品数 + 库存中的剩余总商品数]",
            "__typename": "Popover"
        },
        "primaryMetricConfig": {
            "operation": "NONE",
            "operationColumn": "sell_through_rate",
            "valueFormat": "PERCENT",
            "trendIndicator": {
                "isDownwardPositive": false,
                "isNeutral": true,
                "__typename": "TrendIndicator"
            },
            "__typename": "PrimaryMetricConfig"
        },
        "queries": [
            {
                "meta": {
                    "type": "primary",
                    "dataOnly": null,
                    "handle": "products_by_sell_through_rate",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW quantity_sold, sell_through_rate\nBY concat(product_title, \" | \", product_variant_title) AS product_title, product_id\nFROM inventory_sales\nSINCE <%= period.since %>\nUNTIL <%= period.until %>\nORDER BY \"sell_through_rate\" DESC, \"quantity_sold\" DESC\nLIMIT 5",
                "queryMeta": null,
                "__typename": "MetricQuery"
            },
            {
                "meta": {
                    "type": "primaryMetric",
                    "dataOnly": null,
                    "handle": "sell_through_rate",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW sell_through_rate\nFROM inventory_sales\nSINCE <%= period.since %>\nUNTIL <%= period.until %>",
                "queryMeta": null,
                "__typename": "MetricQuery"
            }
        ],
        "report": {
            "handle": "sell_through_rate",
            "params": null,
            "ignoreDatePicker": false,
            "__typename": "Report"
        },
        "requiresOnlineStore": false,
        "requiresPos": false,
        "title": "按售罄率显示产品",
        "visualization": {
            "vizType": "DATATABLE",
            "props": null,
            "options": {
                "__typename": "DataTableOptions",
                "valueFormat": "PERCENT",
                "getTitle": true,
                "getTitleLink": true,
                "primaryMetricColumn": "sell_through_rate",
                "titleColumn": "product_title"
            },
            "__typename": "Visualization"
        },
        "footer": null,
        "__typename": "V1Metric"
    },
    {
        "id": "total-returns-over-time",
        "cardType": "full",
        "handle": "total-returns-over-time",
        "isHidden": true,
        "hideComparison": false,
        "metricDomain": "ORDERS",
        "metricsLibraryPreviewDescription": "查看一段时间内的退货商品数量并与过去的退货量进行对比。",
        "overridePrimaryMetric": false,
        "overrideVisualization": false,
        "channels": null,
        "popover": {
            "definition": "选定时间范围内的退货商品总数，不包含已退款的运费或已支付的税费。",
            "formula": null,
            "__typename": "Popover"
        },
        "primaryMetricConfig": {
            "operation": "SUM",
            "operationColumn": "returned_item_quantity_abs",
            "valueFormat": "NUMBER",
            "trendIndicator": {
                "isDownwardPositive": true,
                "isNeutral": false,
                "__typename": "TrendIndicator"
            },
            "__typename": "PrimaryMetricConfig"
        },
        "queries": [
            {
                "meta": {
                    "type": "primary",
                    "dataOnly": null,
                    "handle": "return_quantity_over_time",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW returned_item_quantity_abs\nOVER <%= overPeriod %>(happened_at) AS timestamp\nFROM sales\n<% if (channelFilter) { %> WHERE <%= channelFilter %> <% } %>\nSINCE <%= period.since %>\nUNTIL <%= period.until %>\nORDER BY timestamp ASC",
                "queryMeta": null,
                "__typename": "MetricQuery"
            }
        ],
        "report": {
            "handle": "product_orders_and_returns",
            "params": {
                "selection": "returned_item_quantity_abs"
            },
            "ignoreDatePicker": false,
            "__typename": "Report"
        },
        "requiresOnlineStore": false,
        "requiresPos": false,
        "title": "退货",
        "visualization": {
            "vizType": "LINE",
            "props": null,
            "options": null,
            "__typename": "Visualization"
        },
        "footer": null,
        "__typename": "V1Metric"
    },
    {
        "id": "search-conversion",
        "cardType": "full",
        "handle": "search-conversion",
        "isHidden": true,
        "hideComparison": false,
        "metricDomain": "BEHAVIOR",
        "metricsLibraryPreviewDescription": "了解在线商店搜索的销售转化绩效。",
        "overridePrimaryMetric": false,
        "overrideVisualization": false,
        "channels": [
            {
                "apiClientId": 580111,
                "handle": "online_store",
                "__typename": "ApiClientChannel"
            }
        ],
        "popover": {
            "definition": "促成订单的在线商店搜索次数占在线商店总搜索次数的百分比。",
            "formula": "在线商店搜索转化率 = [转化的搜索数/总搜索数] * 100",
            "__typename": "Popover"
        },
        "primaryMetricConfig": {
            "operation": "AVERAGE",
            "operationColumn": "purchase_rate",
            "valueFormat": "PERCENT",
            "trendIndicator": {
                "isDownwardPositive": false,
                "isNeutral": false,
                "__typename": "TrendIndicator"
            },
            "__typename": "PrimaryMetricConfig"
        },
        "queries": [
            {
                "meta": {
                    "type": "primary",
                    "dataOnly": null,
                    "handle": "online_store_search_conversion",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW purchase_rate\nOVER <%= overPeriod %> AS timestamp\nFROM search_conversion_funnel\nSINCE <%= period.since %> UNTIL <%= period.until %>\nORDER BY timestamp ASC",
                "queryMeta": null,
                "__typename": "MetricQuery"
            }
        ],
        "report": {
            "handle": "search_conversion_funnel",
            "params": null,
            "ignoreDatePicker": false,
            "__typename": "Report"
        },
        "requiresOnlineStore": false,
        "requiresPos": false,
        "title": "在线商店搜索转化",
        "visualization": {
            "vizType": "LINE",
            "props": null,
            "options": null,
            "__typename": "Visualization"
        },
        "footer": null,
        "__typename": "V1Metric"
    },
    {
        "id": "top-online-store-searches",
        "cardType": "full",
        "handle": "top-online-store-searches",
        "isHidden": true,
        "hideComparison": false,
        "metricDomain": "BEHAVIOR",
        "metricsLibraryPreviewDescription": "在线商店搜索中使用的热门搜索词列表。",
        "overridePrimaryMetric": false,
        "overrideVisualization": false,
        "channels": null,
        "popover": {
            "definition": "客户搜索产品时使用的热门搜索词。",
            "formula": null,
            "__typename": "Popover"
        },
        "primaryMetricConfig": null,
        "queries": [
            {
                "meta": {
                    "type": "primary",
                    "dataOnly": null,
                    "handle": "top_online_store_searches",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW total_searches BY original_query\nFROM storefront_searches\n<% if (dateCondition) { %>\n  WHERE <%= overPeriod %> < <%= dateCondition %>\n<% } %>\nSINCE <%= period.since %> UNTIL <%= period.until %>\nORDER BY total_searches DESC\nLIMIT 5",
                "queryMeta": null,
                "__typename": "MetricQuery"
            }
        ],
        "report": {
            "handle": "top_online_store_searches",
            "params": null,
            "ignoreDatePicker": false,
            "__typename": "Report"
        },
        "requiresOnlineStore": true,
        "requiresPos": false,
        "title": "热门在线商店搜索",
        "visualization": {
            "vizType": "DYNAMICBAR",
            "props": null,
            "options": null,
            "__typename": "Visualization"
        },
        "footer": null,
        "__typename": "V1Metric"
    },
    {
        "id": "gross-sales",
        "cardType": "full",
        "handle": "gross-sales",
        "isHidden": true,
        "hideComparison": false,
        "metricDomain": "SALES",
        "metricsLibraryPreviewDescription": "将企业一段时间内的毛销售额绘制图表并与过去的毛销售额进行对比。",
        "overridePrimaryMetric": false,
        "overrideVisualization": false,
        "channels": null,
        "popover": {
            "definition": "所有已购买商品的汇总价值，未添加费用或调整金额，例如税费、运费、折扣或退货。包含所有销售渠道。",
            "formula": "毛销售额 = 售出总件数 * 原始售价",
            "__typename": "Popover"
        },
        "primaryMetricConfig": {
            "operation": "SUM",
            "operationColumn": "gross_sales",
            "valueFormat": "PRICE",
            "trendIndicator": {
                "isDownwardPositive": false,
                "isNeutral": false,
                "__typename": "TrendIndicator"
            },
            "__typename": "PrimaryMetricConfig"
        },
        "queries": [
            {
                "meta": {
                    "type": "primary",
                    "dataOnly": null,
                    "handle": "gross_sales_over_time",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW gross_sales\nOVER <%= overPeriod %> AS timestamp\nFROM sales\nWHERE sale_kind == \"order\" AND sale_line_type == \"product\" AND amount_before_discounts_before_tax != NULL\n<% if (channelFilter) { %> AND <%= channelFilter %> <% } %>\nSINCE <%= period.since %>\nUNTIL <%= period.until %>\nORDER BY timestamp ASC",
                "queryMeta": null,
                "__typename": "MetricQuery"
            }
        ],
        "report": {
            "handle": "gross_sales",
            "params": null,
            "ignoreDatePicker": false,
            "__typename": "Report"
        },
        "requiresOnlineStore": false,
        "requiresPos": false,
        "title": "毛销售额",
        "visualization": {
            "vizType": "LINE",
            "props": null,
            "options": {
                "__typename": "LineOptions",
                "valueFormat": "PRICE"
            },
            "__typename": "Visualization"
        },
        "footer": null,
        "__typename": "V1Metric"
    },
    {
        "id": "return-rate",
        "cardType": "full",
        "handle": "return-rate",
        "isHidden": true,
        "hideComparison": false,
        "metricDomain": "ORDERS",
        "metricsLibraryPreviewDescription": "查看退货商品的百分比及其随时间推移的变化。",
        "overridePrimaryMetric": false,
        "overrideVisualization": false,
        "channels": null,
        "popover": {
            "definition": "选定日期范围内退回您商店的商品占已订购的所有商品的百分比。",
            "formula": "退货率 = [总退货件数/总售出件数] * 100",
            "__typename": "Popover"
        },
        "primaryMetricConfig": {
            "operation": "NONE",
            "operationColumn": "returned_item_rate",
            "valueFormat": "PERCENT",
            "trendIndicator": {
                "isDownwardPositive": true,
                "isNeutral": false,
                "__typename": "TrendIndicator"
            },
            "__typename": "PrimaryMetricConfig"
        },
        "queries": [
            {
                "meta": {
                    "type": "primary",
                    "dataOnly": null,
                    "handle": "return_rate_over_time",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW returned_item_rate\nOVER <%= overPeriod %> AS timestamp\nFROM sales\n<% if (channelFilter) { %> WHERE <%= channelFilter %> <% } %>\nSINCE <%= period.since %>\nUNTIL <%= period.until %>\nORDER BY timestamp ASC",
                "queryMeta": null,
                "__typename": "MetricQuery"
            },
            {
                "meta": {
                    "type": "primaryMetric",
                    "dataOnly": null,
                    "handle": "primary_metric_return_rate",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW returned_item_rate\nFROM sales\n<% if (channelFilter) { %> WHERE <%= channelFilter %> <% } %>\n<% if (dateCondition) { %>\n  <%= channelFilter ? 'AND' : 'WHERE' %> <%= overPeriod %> < <%= dateCondition %>\n<% } %>\nSINCE <%= period.since %>\nUNTIL <%= period.until %>",
                "queryMeta": null,
                "__typename": "MetricQuery"
            }
        ],
        "report": {
            "handle": "product_orders_and_returns",
            "params": {
                "selection": "returned_item_rate"
            },
            "ignoreDatePicker": false,
            "__typename": "Report"
        },
        "requiresOnlineStore": false,
        "requiresPos": false,
        "title": "退货率",
        "visualization": {
            "vizType": "LINE",
            "props": null,
            "options": {
                "__typename": "LineOptions",
                "valueFormat": "PERCENT"
            },
            "__typename": "Visualization"
        },
        "footer": null,
        "__typename": "V1Metric"
    },
    {
        "id": "top-returned-products",
        "cardType": "full",
        "handle": "top-returned-products",
        "isHidden": true,
        "hideComparison": false,
        "metricDomain": "ORDERS",
        "metricsLibraryPreviewDescription": "查看退货最多的产品。",
        "overridePrimaryMetric": false,
        "overrideVisualization": false,
        "channels": null,
        "popover": {
            "definition": "退货件数最多的产品。",
            "formula": null,
            "__typename": "Popover"
        },
        "primaryMetricConfig": null,
        "queries": [
            {
                "meta": {
                    "type": "primary",
                    "dataOnly": null,
                    "handle": "top_returned_products",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW returned_item_quantity_abs\nBY product_title\nFROM sales\n<% if (channelFilter) { %> WHERE <%= channelFilter %> <% } %>\n<% if (dateCondition) { %>\n  <%= channelFilter ? 'AND' : 'WHERE' %> <%= overPeriod %> < <%= dateCondition %>\n<% } %>\nSINCE <%= period.since %>\nUNTIL <%= period.until %>\nORDER BY returned_item_quantity_abs\nDESC LIMIT 5",
                "queryMeta": null,
                "__typename": "MetricQuery"
            }
        ],
        "report": {
            "handle": "product_orders_and_returns",
            "params": {
                "selection": "returned_item_quantity_abs"
            },
            "ignoreDatePicker": false,
            "__typename": "Report"
        },
        "requiresOnlineStore": false,
        "requiresPos": false,
        "title": "最高退货量产品",
        "visualization": {
            "vizType": "DYNAMICBAR",
            "props": null,
            "options": null,
            "__typename": "Visualization"
        },
        "footer": null,
        "__typename": "V1Metric"
    },
    {
        "id": "return-value",
        "cardType": "full",
        "handle": "return-value",
        "isHidden": true,
        "hideComparison": false,
        "metricDomain": "FINANCES",
        "metricsLibraryPreviewDescription": "按时间段查看退货商品的价值。",
        "overridePrimaryMetric": false,
        "overrideVisualization": false,
        "channels": null,
        "popover": {
            "definition": "在选定时间段内退货的商品的总价值。",
            "formula": null,
            "__typename": "Popover"
        },
        "primaryMetricConfig": {
            "operation": "SUM",
            "operationColumn": "net_returns",
            "valueFormat": "PRICE",
            "trendIndicator": {
                "isDownwardPositive": true,
                "isNeutral": false,
                "__typename": "TrendIndicator"
            },
            "__typename": "PrimaryMetricConfig"
        },
        "queries": [
            {
                "meta": {
                    "type": "primary",
                    "dataOnly": null,
                    "handle": "return_value_over_time",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW returns AS 'net_returns'\nOVER <%= overPeriod %> AS timestamp\nFROM sales\nWHERE\n  ((sale_kind == 'return') AND\n  (sale_line_type == 'product' OR sale_line_type == 'unknown' OR sale_line_type == 'shipping'))\n<% if (channelFilter) { %> AND <%= channelFilter %> <% } %>\nSINCE <%= period.since %>\nUNTIL  <%= period.until %>\nORDER BY timestamp ASC",
                "queryMeta": null,
                "__typename": "MetricQuery"
            }
        ],
        "report": {
            "handle": "returns",
            "params": null,
            "ignoreDatePicker": false,
            "__typename": "Report"
        },
        "requiresOnlineStore": false,
        "requiresPos": false,
        "title": "净退货价值",
        "visualization": {
            "vizType": "LINE",
            "props": null,
            "options": {
                "__typename": "LineOptions",
                "valueFormat": "PRICE"
            },
            "__typename": "Visualization"
        },
        "footer": null,
        "__typename": "V1Metric"
    },
    {
        "id": "top-products-by-gross-sales",
        "cardType": "full",
        "handle": "top-products-by-gross-sales",
        "isHidden": true,
        "hideComparison": false,
        "metricDomain": "SALES",
        "metricsLibraryPreviewDescription": "了解哪些是畅销产品（基于金额）及其销售额的变化情况。",
        "overridePrimaryMetric": false,
        "overrideVisualization": false,
        "channels": null,
        "popover": {
            "definition": "按毛销售额显示订购的产品。包括所有销售渠道的订单。",
            "formula": null,
            "__typename": "Popover"
        },
        "primaryMetricConfig": null,
        "queries": [
            {
                "meta": {
                    "type": "primary",
                    "dataOnly": null,
                    "handle": "top_product_variants_by_gross_sales",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW gross_sales BY concat(product_title, \" | \", variant_title)\nFROM sales\nWHERE sale_line_type == 'product'\n<% if (dateCondition) { %>\n  AND <%= overPeriod %> < <%= dateCondition %>\n<% } %>\n<% if (channelFilter) { %> AND <%= channelFilter %> <% } %>\nSINCE <%= period.since %>\nUNTIL <%= period.until %>\nORDER BY gross_sales DESC\nLIMIT 5",
                "queryMeta": null,
                "__typename": "MetricQuery"
            }
        ],
        "report": {
            "handle": "sales_by_variant_sku",
            "params": null,
            "ignoreDatePicker": false,
            "__typename": "Report"
        },
        "requiresOnlineStore": false,
        "requiresPos": false,
        "title": "按毛销售额显示产品多属性",
        "visualization": {
            "vizType": "DYNAMICBAR",
            "props": null,
            "options": {
                "__typename": "DynamicBarOptions",
                "valueFormat": "PRICE"
            },
            "__typename": "Visualization"
        },
        "footer": null,
        "__typename": "V1Metric"
    },
    {
        "id": "sessions-attributed-to-marketing",
        "cardType": "full",
        "handle": "sessions-attributed-to-marketing",
        "isHidden": true,
        "hideComparison": false,
        "metricDomain": "MARKETING",
        "metricsLibraryPreviewDescription": "按时间段对比不同营销工作带来的总访问次数。",
        "overridePrimaryMetric": false,
        "overrideVisualization": false,
        "channels": null,
        "popover": {
            "definition": "由可跟踪的营销工作为在线商店带来的流量而产生的总访问次数。",
            "formula": null,
            "__typename": "Popover"
        },
        "primaryMetricConfig": null,
        "queries": [
            {
                "meta": {
                    "type": "primary",
                    "dataOnly": null,
                    "handle": "sessions_attributed_to_marketing_campaign",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW total_sessions\nBY utm_campaign_name\nFROM visits\nWHERE utm_campaign_name != '' <% if (dateCondition) { %>\n  AND <%= overPeriod %> < <%= dateCondition %>\n<% } %>\nSINCE <%= period.since %>\nUNTIL <%= period.until %>\nORDER BY total_sessions DESC\nLIMIT 5",
                "queryMeta": null,
                "__typename": "MetricQuery"
            }
        ],
        "report": {
            "handle": "sessions_attributed_to_marketing",
            "params": {
                "filter": "utm_campaign_name!=NULL",
                "by": [
                    "referring_channel",
                    "referring_category",
                    "utm_campaign_name"
                ]
            },
            "ignoreDatePicker": false,
            "__typename": "Report"
        },
        "requiresOnlineStore": false,
        "requiresPos": false,
        "title": "营销宣传活动带来的访问次数",
        "visualization": {
            "vizType": "DYNAMICBAR",
            "props": null,
            "options": {
                "__typename": "DynamicBarOptions",
                "valueFormat": "NUMBER"
            },
            "__typename": "Visualization"
        },
        "footer": null,
        "__typename": "V1Metric"
    },
    {
        "id": "top-staff",
        "cardType": "full",
        "handle": "top-staff",
        "isHidden": true,
        "hideComparison": true,
        "metricDomain": "SALES",
        "metricsLibraryPreviewDescription": "与各位员工相关联的总订单数。",
        "overridePrimaryMetric": false,
        "overrideVisualization": false,
        "channels": null,
        "popover": {
            "definition": "与达成销售的每位员工相关联的总订单数。",
            "formula": null,
            "__typename": "Popover"
        },
        "primaryMetricConfig": null,
        "queries": [
            {
                "meta": {
                    "type": "primary",
                    "dataOnly": null,
                    "handle": "orders_by_staff",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW total_orders\nBY employee_name\nFROM sales\nWHERE employee_name != ''\nAND api_client_title == 'Point of Sale'\n<% if (dateCondition) { %>\n  AND <%= overPeriod %> < <%= dateCondition %>\n<% } %>\n<% if (channelFilter) { %> AND <%= channelFilter %> <% } %>\nSINCE <%= period.since %>\nUNTIL <%= period.until %>\nORDER BY total_orders DESC\nLIMIT 5",
                "queryMeta": null,
                "__typename": "MetricQuery"
            }
        ],
        "report": {
            "handle": "sales_by_employee",
            "params": null,
            "ignoreDatePicker": false,
            "__typename": "Report"
        },
        "requiresOnlineStore": false,
        "requiresPos": true,
        "title": "排名靠前的员工",
        "visualization": {
            "vizType": "DYNAMICBAR",
            "props": null,
            "options": {
                "__typename": "DynamicBarOptions",
                "valueFormat": "NUMBER"
            },
            "__typename": "Visualization"
        },
        "footer": null,
        "__typename": "V1Metric"
    },
    {
        "id": "sales-by-billing-location",
        "cardType": "full",
        "handle": "sales-by-billing-location",
        "isHidden": true,
        "hideComparison": false,
        "metricDomain": "SALES",
        "metricsLibraryPreviewDescription": "通过比较客户账单地址的地理位置来了解您的销售额来源。",
        "overridePrimaryMetric": false,
        "overrideVisualization": false,
        "channels": null,
        "popover": {
            "definition": "与您在线商店中最高销售额相关的客户账单地点。",
            "formula": null,
            "__typename": "Popover"
        },
        "primaryMetricConfig": null,
        "queries": [
            {
                "meta": {
                    "type": "primary",
                    "dataOnly": null,
                    "handle": "sales_by_billing_location",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW total_sales\nBY billing_country\nFROM sales\nWHERE billing_country != \"\"\n<% if (dateCondition) { %>\n  AND <%= overPeriod %> < <%= dateCondition %>\n<% } %>\n<% if (channelFilter) { %> AND <%= channelFilter %> <% } %>\nSINCE <%= period.since %>\nUNTIL <%= period.until %>\nORDER BY \"total_sales\"\nDESC LIMIT 5",
                "queryMeta": null,
                "__typename": "MetricQuery"
            }
        ],
        "report": {
            "handle": "sales_by_billing_location",
            "params": null,
            "ignoreDatePicker": false,
            "__typename": "Report"
        },
        "requiresOnlineStore": false,
        "requiresPos": false,
        "title": "按账单地点显示销售额",
        "visualization": {
            "vizType": "DYNAMICBAR",
            "props": null,
            "options": {
                "__typename": "DynamicBarOptions",
                "valueFormat": "PRICE"
            },
            "__typename": "Visualization"
        },
        "footer": null,
        "__typename": "V1Metric"
    },
    {
        "id": "average-units-ordered",
        "cardType": "full",
        "handle": "average-units-ordered",
        "isHidden": true,
        "hideComparison": false,
        "metricDomain": "SALES",
        "metricsLibraryPreviewDescription": "了解客户的购买模式以制定更好的库存和销售决策。",
        "overridePrimaryMetric": false,
        "overrideVisualization": false,
        "channels": null,
        "popover": {
            "definition": "客户通常在一个订单中购买的平均商品件数。",
            "formula": null,
            "__typename": "Popover"
        },
        "primaryMetricConfig": {
            "operation": "NONE",
            "operationColumn": "average_units_ordered",
            "valueFormat": "NUMBER",
            "trendIndicator": {
                "isDownwardPositive": false,
                "isNeutral": false,
                "__typename": "TrendIndicator"
            },
            "__typename": "PrimaryMetricConfig"
        },
        "queries": [
            {
                "meta": {
                    "type": "primary",
                    "dataOnly": null,
                    "handle": "average_units_ordered",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW average_units_ordered\nOVER <%= overPeriod %>(happened_at) AS timestamp\nFROM sales\n<% if (channelFilter) { %> WHERE <%= channelFilter %> <% } %>\nSINCE <%= period.since %>\nUNTIL <%= period.until %>\nORDER BY timestamp ASC",
                "queryMeta": null,
                "__typename": "MetricQuery"
            },
            {
                "meta": {
                    "type": "primaryMetric",
                    "dataOnly": null,
                    "handle": "average_units_ordered_primary_metric",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW average_units_ordered\nFROM sales\n<% if (channelFilter) { %> WHERE <%= channelFilter %> <% } %>\n<% if (dateCondition) { %>\n  <%= channelFilter ? 'AND' : 'WHERE' %> <%= overPeriod %> < <%= dateCondition %>\n<% } %>\nSINCE <%= period.since %>\nUNTIL <%= period.until %>",
                "queryMeta": null,
                "__typename": "MetricQuery"
            }
        ],
        "report": {
            "handle": "sales_over_time",
            "params": {
                "show": "average_units_ordered"
            },
            "ignoreDatePicker": false,
            "__typename": "Report"
        },
        "requiresOnlineStore": false,
        "requiresPos": false,
        "title": "订购的平均件数",
        "visualization": {
            "vizType": "LINE",
            "props": null,
            "options": {
                "__typename": "LineOptions",
                "valueFormat": "NUMBER"
            },
            "__typename": "Visualization"
        },
        "footer": null,
        "__typename": "V1Metric"
    },
    {
        "id": "sales-by-variant-sku",
        "cardType": "full",
        "handle": "sales-by-variant-sku",
        "isHidden": true,
        "hideComparison": false,
        "metricDomain": "SALES",
        "metricsLibraryPreviewDescription": "查看哪些产品多属性最畅销。",
        "overridePrimaryMetric": false,
        "overrideVisualization": false,
        "channels": null,
        "popover": {
            "definition": "基于产品多属性 SKU 的净销售额。",
            "formula": null,
            "__typename": "Popover"
        },
        "primaryMetricConfig": null,
        "queries": [
            {
                "meta": {
                    "type": "primary",
                    "dataOnly": null,
                    "handle": "sales_by_variant_sku",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW net_sales BY concat(product_title, \" | \", IF (variant_sku != \"\") THEN variant_sku ELSE \"N/A\") AS title\nFROM sales\nWHERE ((sale_line_type == \"product\"))\n<% if (dateCondition) { %>\n  AND <%= overPeriod %> < <%= dateCondition %>\n<% } %>\n<% if (channelFilter) { %> AND <%= channelFilter %> <% } %>\nSINCE <%= period.since %>\nUNTIL <%= period.until %>\nORDER BY net_sales DESC\nLIMIT 5",
                "queryMeta": null,
                "__typename": "MetricQuery"
            }
        ],
        "report": {
            "handle": "sales_by_variant_sku",
            "params": null,
            "ignoreDatePicker": false,
            "__typename": "Report"
        },
        "requiresOnlineStore": false,
        "requiresPos": false,
        "title": "按多属性 SKU 显示销售额",
        "visualization": {
            "vizType": "DYNAMICBAR",
            "props": null,
            "options": {
                "__typename": "DynamicBarOptions",
                "valueFormat": "PRICE"
            },
            "__typename": "Visualization"
        },
        "footer": null,
        "__typename": "V1Metric"
    },
    {
        "id": "total-sales-breakdown",
        "cardType": "full",
        "handle": "total-sales-breakdown",
        "isHidden": true,
        "hideComparison": false,
        "metricDomain": "SALES",
        "metricsLibraryPreviewDescription": "了解退货和折扣等因素对总销售额的影响。",
        "overridePrimaryMetric": true,
        "overrideVisualization": true,
        "channels": null,
        "popover": {
            "definition": "总销售额等于毛销售额加上运费、税费、关税及其他费用，然后减去任何折扣和退款。包含所有销售渠道。",
            "formula": "总销售额 = 毛销售额 - 折扣 - 退款 + 运费 + 税费 + 关税 + 其他费用",
            "__typename": "Popover"
        },
        "primaryMetricConfig": null,
        "queries": [
            {
                "meta": {
                    "type": null,
                    "dataOnly": null,
                    "handle": "sales_breakdown",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW gross_sales, discounts, returns, tax + duties + shipping AS 'taxes_duties_shipping', total_sales\nFROM sales\n<% if (channelFilter) { %> WHERE <%= channelFilter %> <% } %>\n<% if (dateCondition) { %>\n  <%= channelFilter ? 'AND' : 'WHERE' %> <%= overPeriod %> < <%= dateCondition %>\n<% } %>\nSINCE <%= period.since %>\nUNTIL <%= period.until %>",
                "queryMeta": null,
                "__typename": "MetricQuery"
            }
        ],
        "report": {
            "handle": "sales_over_time",
            "params": null,
            "ignoreDatePicker": false,
            "__typename": "Report"
        },
        "requiresOnlineStore": false,
        "requiresPos": false,
        "title": "总销售额明细",
        "visualization": {
            "vizType": "DATATABLE",
            "props": null,
            "options": null,
            "__typename": "Visualization"
        },
        "footer": null,
        "__typename": "V1Metric"
    },
    {
        "id": "total-visitors",
        "cardType": "full",
        "handle": "total-visitors",
        "isHidden": true,
        "hideComparison": false,
        "metricDomain": "ACQUISITION",
        "metricsLibraryPreviewDescription": "查看一段时间内的在线商店流量并与过去的时间段进行对比。",
        "overridePrimaryMetric": false,
        "overrideVisualization": false,
        "channels": null,
        "popover": {
            "definition": "在线商店基于供应商 Cookie 的流量。",
            "formula": null,
            "__typename": "Popover"
        },
        "primaryMetricConfig": {
            "operation": "SUM",
            "operationColumn": "total_visitors",
            "valueFormat": "NUMBER",
            "trendIndicator": {
                "isDownwardPositive": false,
                "isNeutral": false,
                "__typename": "TrendIndicator"
            },
            "__typename": "PrimaryMetricConfig"
        },
        "queries": [
            {
                "meta": {
                    "type": "primary",
                    "dataOnly": null,
                    "handle": "visitors_over_time",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW total_visitors\nOVER <%= overPeriod %> AS timestamp\nFROM visits\nSINCE <%= period.since %>\nUNTIL  <%= period.until %>\nORDER BY timestamp ASC",
                "queryMeta": null,
                "__typename": "MetricQuery"
            }
        ],
        "report": {
            "handle": "sessions_over_time",
            "params": null,
            "ignoreDatePicker": false,
            "__typename": "Report"
        },
        "requiresOnlineStore": false,
        "requiresPos": false,
        "title": "访客",
        "visualization": {
            "vizType": "LINE",
            "props": null,
            "options": null,
            "__typename": "Visualization"
        },
        "footer": null,
        "__typename": "V1Metric"
    },
    {
        "id": "top-products-variants-by-units-sold",
        "cardType": "full",
        "handle": "top-products-variants-by-units-sold",
        "isHidden": true,
        "hideComparison": false,
        "metricDomain": "SALES",
        "metricsLibraryPreviewDescription": "了解哪些产品多属性 SKU 的订购数量最多。",
        "overridePrimaryMetric": false,
        "overrideVisualization": false,
        "channels": null,
        "popover": {
            "definition": "销售量最大的产品多属性 SKU。包括所有销售渠道的订单。",
            "formula": null,
            "__typename": "Popover"
        },
        "primaryMetricConfig": null,
        "queries": [
            {
                "meta": {
                    "type": "primary",
                    "dataOnly": null,
                    "handle": "top_product_variants_by_units_sold",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW net_quantity BY concat(product_title, \" | \", variant_sku) AS title\nFROM sales\nWHERE ((sale_line_type == \"product\"))\n<% if (dateCondition) { %>\n  AND <%= overPeriod %> < <%= dateCondition %>\n<% } %>\n<% if (channelFilter) { %> AND <%= channelFilter %> <% } %>\nSINCE <%= period.since %>\nUNTIL <%= period.until %>\nORDER BY \"net_quantity\" DESC\nLIMIT 5",
                "queryMeta": null,
                "__typename": "MetricQuery"
            }
        ],
        "report": {
            "handle": "sales_by_variant_sku",
            "params": null,
            "ignoreDatePicker": false,
            "__typename": "Report"
        },
        "requiresOnlineStore": false,
        "requiresPos": false,
        "title": "热销产品多属性（按售出单位数）",
        "visualization": {
            "vizType": "DYNAMICBAR",
            "props": null,
            "options": {
                "__typename": "DynamicBarOptions",
                "valueFormat": "NUMBER"
            },
            "__typename": "Visualization"
        },
        "footer": null,
        "__typename": "V1Metric"
    },
    {
        "id": "delivered-orders-over-time",
        "cardType": "full",
        "handle": "delivered-orders-over-time",
        "isHidden": true,
        "hideComparison": false,
        "metricDomain": "ORDERS",
        "metricsLibraryPreviewDescription": "了解订单的整体配送趋势。",
        "overridePrimaryMetric": false,
        "overrideVisualization": false,
        "channels": null,
        "popover": {
            "definition": "已成功配送的订单的累计数量以及与历史趋势的对比情况。",
            "formula": null,
            "__typename": "Popover"
        },
        "primaryMetricConfig": {
            "operation": "SUM",
            "operationColumn": "orders_delivered",
            "valueFormat": "NUMBER",
            "trendIndicator": {
                "isDownwardPositive": false,
                "isNeutral": false,
                "__typename": "TrendIndicator"
            },
            "__typename": "PrimaryMetricConfig"
        },
        "queries": [
            {
                "meta": {
                    "type": "primary",
                    "dataOnly": null,
                    "handle": "delivered_orders_over_time",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW orders_delivered\nOVER <%= overPeriod %> AS timestamp\nFROM fulfillment_facts\n<% if (channelFilter) { %> WHERE <%= channelFilter %> <% } %>\nSINCE <%= period.since %>\nUNTIL <%= period.until %>\nORDER BY timestamp ASC",
                "queryMeta": null,
                "__typename": "MetricQuery"
            }
        ],
        "report": {
            "handle": "fulfillment_over_time",
            "params": {
                "show": "orders_delivered"
            },
            "ignoreDatePicker": false,
            "__typename": "Report"
        },
        "requiresOnlineStore": false,
        "requiresPos": false,
        "title": "按时间段显示已配送的订单",
        "visualization": {
            "vizType": "LINE",
            "props": null,
            "options": {
                "__typename": "LineOptions",
                "valueFormat": "NUMBER"
            },
            "__typename": "Visualization"
        },
        "footer": null,
        "__typename": "V1Metric"
    },
    {
        "id": "time-to-fulfill",
        "cardType": "full",
        "handle": "time-to-fulfill",
        "isHidden": true,
        "hideComparison": false,
        "metricDomain": "ORDERS",
        "metricsLibraryPreviewDescription": "了解处理订单的平均所需时间。",
        "overridePrimaryMetric": false,
        "overrideVisualization": false,
        "channels": null,
        "popover": {
            "definition": "从创建订单到订单被标记为“已发货”之间的平均时长，以及与历史趋势的对比情况。",
            "formula": null,
            "__typename": "Popover"
        },
        "primaryMetricConfig": {
            "operation": "NONE",
            "operationColumn": "median_fulfillment_time_in_hours",
            "valueFormat": "TIME",
            "trendIndicator": {
                "isDownwardPositive": true,
                "isNeutral": false,
                "__typename": "TrendIndicator"
            },
            "__typename": "PrimaryMetricConfig"
        },
        "queries": [
            {
                "meta": {
                    "type": "primary",
                    "dataOnly": null,
                    "handle": "time_to_fulfill",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW median_fulfillment_time_in_hours\nOVER <%= overPeriod %> AS timestamp\nFROM fulfillment_facts\n<% if (channelFilter) { %> WHERE <%= channelFilter %> <% } %>\nSINCE <%= period.since %>\nUNTIL <%= period.until %>\nORDER BY timestamp ASC",
                "queryMeta": null,
                "__typename": "MetricQuery"
            },
            {
                "meta": {
                    "type": "primaryMetric",
                    "dataOnly": null,
                    "handle": "time_to_fulfill_primary_metric",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW median_fulfillment_time_in_hours\nFROM fulfillment_facts\n<% if (channelFilter) { %> WHERE <%= channelFilter %> <% } %>\n<% if (dateCondition) { %>\n  <%= channelFilter ? 'AND' : 'WHERE' %> <%= overPeriod %> < <%= dateCondition %>\n<% } %>\nSINCE <%= period.since %>\nUNTIL <%= period.until %>",
                "queryMeta": null,
                "__typename": "MetricQuery"
            }
        ],
        "report": {
            "handle": "fulfillment_shipping_and_delivery_times",
            "params": null,
            "ignoreDatePicker": false,
            "__typename": "Report"
        },
        "requiresOnlineStore": false,
        "requiresPos": false,
        "title": "发货时间",
        "visualization": {
            "vizType": "LINE",
            "props": null,
            "options": {
                "__typename": "LineOptions",
                "valueFormat": "TIME"
            },
            "__typename": "Visualization"
        },
        "footer": null,
        "__typename": "V1Metric"
    },
    {
        "id": "bounce-rate",
        "cardType": "full",
        "handle": "bounce-rate",
        "isHidden": true,
        "hideComparison": false,
        "metricDomain": "BEHAVIOR",
        "metricsLibraryPreviewDescription": "请查看您在线商店中离开商店的访问数的百分比及其随时间推移的变化。",
        "overridePrimaryMetric": false,
        "overrideVisualization": false,
        "channels": null,
        "popover": {
            "definition": "在线商店中未执行任何操作便离开商店的访问数的百分比。跳出率较高表示您的网站给人的第一印象不好。",
            "formula": "跳出率 = [总访问数/已转化的总访问数] * 100",
            "__typename": "Popover"
        },
        "primaryMetricConfig": {
            "operation": "NONE",
            "operationColumn": "total_bounce_rate",
            "valueFormat": "PERCENT",
            "trendIndicator": {
                "isDownwardPositive": true,
                "isNeutral": false,
                "__typename": "TrendIndicator"
            },
            "__typename": "PrimaryMetricConfig"
        },
        "queries": [
            {
                "meta": {
                    "type": "primary",
                    "dataOnly": null,
                    "handle": "bounce_rate",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW total_bounce_rate\nOVER <%= overPeriod %> AS over\nFROM visits\nSINCE <%= period.since %>\nUNTIL <%= period.until %>\nORDER BY over ASC",
                "queryMeta": null,
                "__typename": "MetricQuery"
            },
            {
                "meta": {
                    "type": "primaryMetric",
                    "dataOnly": null,
                    "handle": "bounce_rate_primary_metric",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW total_bounce_rate\nFROM visits\n<% if (dateCondition) { %>\n  WHERE <%= overPeriod %> < <%= dateCondition %>\n<% } %>\nSINCE <%= period.since %>\nUNTIL <%= period.until %>",
                "queryMeta": null,
                "__typename": "MetricQuery"
            }
        ],
        "report": {
            "handle": "online_store_conversion",
            "params": {
                "show": "total_bounce_rate"
            },
            "ignoreDatePicker": false,
            "__typename": "Report"
        },
        "requiresOnlineStore": false,
        "requiresPos": false,
        "title": "跳出率",
        "visualization": {
            "vizType": "LINE",
            "props": null,
            "options": {
                "__typename": "LineOptions",
                "valueFormat": "PERCENT"
            },
            "__typename": "Visualization"
        },
        "footer": null,
        "__typename": "V1Metric"
    },
    {
        "id": "abc-analysis",
        "cardType": "full",
        "handle": "abc-analysis",
        "isHidden": true,
        "hideComparison": true,
        "metricDomain": "INVENTORY",
        "metricsLibraryPreviewDescription": "查看根据过去 28 天内每种多属性所占的销售额百分比得出的每种产品评级。",
        "overridePrimaryMetric": false,
        "overrideVisualization": false,
        "channels": null,
        "popover": {
            "definition": "根据过去 28 天内每种产品多属性所占的销售额百分比对产品评级。",
            "formula": null,
            "__typename": "Popover"
        },
        "primaryMetricConfig": null,
        "queries": [
            {
                "meta": {
                    "type": "primary",
                    "dataOnly": null,
                    "handle": "inventory_value_by_grade",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW total_retail_value\nBY concat(product_grade, \"-grade\") AS product_grade\nFROM inventory_abc_analysis\nWHERE ending_quantity >= 0\nORDER BY product_grade ASC",
                "queryMeta": null,
                "__typename": "MetricQuery"
            },
            {
                "meta": {
                    "type": null,
                    "dataOnly": null,
                    "handle": "inventory_value_by_grade_recency",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW latest_analysis_made_at FROM inventory_abc_analysis",
                "queryMeta": null,
                "__typename": "MetricQuery"
            }
        ],
        "report": {
            "handle": "abc_analysis_by_product",
            "params": null,
            "ignoreDatePicker": true,
            "__typename": "Report"
        },
        "requiresOnlineStore": false,
        "requiresPos": false,
        "title": "ABC 产品分析",
        "visualization": {
            "vizType": "SIMPLENORMALIZED",
            "props": null,
            "options": {
                "__typename": "SimpleNormalizedOptions",
                "valueFormat": "PRICE"
            },
            "__typename": "Visualization"
        },
        "footer": {
            "title": "过去 28 天",
            "popover": {
                "definition": "更改时间范围不会影响此图表。ABC 分析基于您过去 28 天的销售历史记录。",
                "formula": null,
                "__typename": "Popover"
            },
            "getText": true,
            "__typename": "Footer"
        },
        "__typename": "V1Metric"
    },
    {
        "id": "checkout-conversion-rate",
        "cardType": "full",
        "handle": "checkout-conversion-rate",
        "isHidden": true,
        "hideComparison": false,
        "metricDomain": "BEHAVIOR",
        "metricsLibraryPreviewDescription": "了解在线商店购物者成为客户的频率，将达成结账的总访问数与达成订单的总访问数进行对比。",
        "overridePrimaryMetric": false,
        "overrideVisualization": true,
        "channels": null,
        "popover": {
            "definition": "达成结账的访问次数占总访问次数的百分比。",
            "formula": null,
            "__typename": "Popover"
        },
        "primaryMetricConfig": {
            "operation": "NONE",
            "operationColumn": "checkout_conversion_rate",
            "valueFormat": "PERCENT",
            "trendIndicator": {
                "isDownwardPositive": false,
                "isNeutral": false,
                "__typename": "TrendIndicator"
            },
            "__typename": "PrimaryMetricConfig"
        },
        "queries": [
            {
                "meta": {
                    "type": "primary",
                    "dataOnly": null,
                    "handle": "checkout_conversion_rate",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW to_percent(total_orders_placed / (IF total_reached_checkouts <= 0 THEN 1 ELSE total_reached_checkouts)) AS checkout_conversion_rate\nOVER <%= overPeriod %> AS over\nFROM visits\nSINCE <%= period.since %>\nUNTIL <%= period.until %>\nORDER BY over ASC",
                "queryMeta": null,
                "__typename": "MetricQuery"
            },
            {
                "meta": {
                    "type": "primaryMetric",
                    "dataOnly": null,
                    "handle": "checkout_conversion_rate_primary_metric",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW to_percent(total_orders_placed / (IF total_reached_checkouts <= 0 THEN 1 ELSE total_reached_checkouts)) AS checkout_conversion_rate\nFROM visits\n<% if (dateCondition) { %>\n  WHERE <%= overPeriod %> < <%= dateCondition %>\n<% } %>\nSINCE <%= period.since %>\nUNTIL <%= period.until %>",
                "queryMeta": null,
                "__typename": "MetricQuery"
            }
        ],
        "report": {
            "handle": "online_store_conversion",
            "params": null,
            "ignoreDatePicker": false,
            "__typename": "Report"
        },
        "requiresOnlineStore": true,
        "requiresPos": false,
        "title": "结账转化率",
        "visualization": {
            "vizType": "LINE",
            "props": null,
            "options": {
                "__typename": "LineOptions",
                "valueFormat": "PERCENT"
            },
            "__typename": "Visualization"
        },
        "footer": null,
        "__typename": "V1Metric"
    },
    {
        "id": "first-time-customer-sales",
        "cardType": "full",
        "handle": "first-time-customer-sales",
        "isHidden": true,
        "hideComparison": false,
        "metricDomain": "CUSTOMERS",
        "metricsLibraryPreviewDescription": "将一段时间内的新客户和回头客销售额绘制图表，并与过去的销售额趋势进行对比。",
        "overridePrimaryMetric": false,
        "overrideVisualization": true,
        "channels": null,
        "popover": {
            "definition": "在线商店总销售额的细分，按新客户和回头客进行划分。",
            "formula": null,
            "__typename": "Popover"
        },
        "primaryMetricConfig": {
            "operation": "NONE",
            "operationColumn": "total_sales",
            "valueFormat": "PRICE",
            "trendIndicator": {
                "isDownwardPositive": false,
                "isNeutral": false,
                "__typename": "TrendIndicator"
            },
            "__typename": "PrimaryMetricConfig"
        },
        "queries": [
            {
                "meta": {
                    "type": "primaryMetric",
                    "dataOnly": null,
                    "handle": "customers_sales_primary_metric",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW total_sales\nFROM sales\nWHERE ((sale_kind == \"order\" AND sale_line_type == \"product\" AND customer_type != NULL))\n<% if (dateCondition) { %>\n  AND <%= overPeriod %> < <%= dateCondition %>\n<% } %>\nSINCE <%= period.since %>\nUNTIL <%= period.until %>",
                "queryMeta": null,
                "__typename": "MetricQuery"
            },
            {
                "meta": {
                    "type": null,
                    "dataOnly": null,
                    "handle": "total_first_time_sales_over_time",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW total_sales\nOVER <%=overPeriod %>\nBY customer_type\nFROM sales\nWHERE ((sale_kind == \"order\" AND sale_line_type == \"product\" AND customer_type == \"First-time\"))\nSINCE <%= period.since %>\nUNTIL <%= period.until %>\nORDER BY <%=overPeriod %> ASC",
                "queryMeta": null,
                "__typename": "MetricQuery"
            },
            {
                "meta": {
                    "type": null,
                    "dataOnly": null,
                    "handle": "total_returning_sales_over_time",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW total_sales\nOVER <%=overPeriod %>\nBY customer_type\nFROM sales\nWHERE ((sale_kind == \"order\" AND sale_line_type == \"product\" AND customer_type == \"Returning\"))\nSINCE <%= period.since %>\nUNTIL <%= period.until %>\nORDER BY <%=overPeriod %> ASC",
                "queryMeta": null,
                "__typename": "MetricQuery"
            }
        ],
        "report": {
            "handle": "customers_first_return",
            "params": null,
            "ignoreDatePicker": false,
            "__typename": "Report"
        },
        "requiresOnlineStore": false,
        "requiresPos": false,
        "title": "按时间段显示客户销售额",
        "visualization": {
            "vizType": "STACKEDAREA",
            "props": null,
            "options": {
                "__typename": "StackedAreaOptions",
                "valueFormat": "PRICE"
            },
            "__typename": "Visualization"
        },
        "footer": null,
        "__typename": "V1Metric"
    },
    {
        "id": "days-inventory-remaining",
        "cardType": "full",
        "handle": "days-inventory-remaining",
        "isHidden": true,
        "hideComparison": true,
        "metricDomain": "INVENTORY",
        "metricsLibraryPreviewDescription": "基于商店的销售速率了解库存的预计持续天数。",
        "overridePrimaryMetric": false,
        "overrideVisualization": false,
        "channels": null,
        "popover": {
            "definition": "基于商店的销售速率，当前库存的预计持续天数。",
            "formula": null,
            "__typename": "Popover"
        },
        "primaryMetricConfig": null,
        "queries": [
            {
                "meta": {
                    "type": "primary",
                    "dataOnly": null,
                    "handle": "days_inventory_remaining",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW count(variant_id) AS \"number_of_variants\"\nBY days_of_inventory_remaining_binned_report_viz\nFROM inventory_abc_analysis\nWHERE ((inventory_tracked == \"Yes\" AND quantity_sold_per_day != 0)) AND (days_of_inventory_remaining_binned_report_viz != NULL)\nORDER BY \"days_of_inventory_remaining_binned_report_viz\" ASC",
                "queryMeta": null,
                "__typename": "MetricQuery"
            },
            {
                "meta": {
                    "type": null,
                    "dataOnly": null,
                    "handle": "inventory_value_by_grade_recency",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW latest_analysis_made_at FROM inventory_abc_analysis",
                "queryMeta": null,
                "__typename": "MetricQuery"
            }
        ],
        "report": {
            "handle": "days_of_inventory_remaining",
            "params": null,
            "ignoreDatePicker": true,
            "__typename": "Report"
        },
        "requiresOnlineStore": true,
        "requiresPos": false,
        "title": "按剩余库存天数显示产品",
        "visualization": {
            "vizType": "BAR",
            "props": null,
            "options": {
                "__typename": "BarOptions",
                "valueFormat": "NUMBER",
                "headings": []
            },
            "__typename": "Visualization"
        },
        "footer": {
            "title": "过去 28 天",
            "popover": {
                "definition": "更改时间范围不会影响此图表。剩余库存天数基于过去 28 天的可用销售历史记录。",
                "formula": null,
                "__typename": "Popover"
            },
            "getText": true,
            "__typename": "Footer"
        },
        "__typename": "V1Metric"
    },
    {
        "id": "ordered-items",
        "cardType": "full",
        "handle": "ordered-items",
        "isHidden": true,
        "hideComparison": false,
        "metricDomain": "ORDERS",
        "metricsLibraryPreviewDescription": "查看在选定时间段内订购的商品总数。",
        "overridePrimaryMetric": false,
        "overrideVisualization": false,
        "channels": null,
        "popover": {
            "definition": "在选定时间段内订购的商品总数。",
            "formula": null,
            "__typename": "Popover"
        },
        "primaryMetricConfig": {
            "operation": "NONE",
            "operationColumn": "ordered_item_quantity",
            "valueFormat": "NUMBER",
            "trendIndicator": {
                "isDownwardPositive": false,
                "isNeutral": false,
                "__typename": "TrendIndicator"
            },
            "__typename": "PrimaryMetricConfig"
        },
        "queries": [
            {
                "meta": {
                    "type": "primary",
                    "dataOnly": null,
                    "handle": "ordered_items_over_time",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW ordered_item_quantity\nOVER <%=overPeriod %>\nFROM sales\nSINCE <%= period.since %>\nUNTIL <%= period.until %>\nORDER BY <%=overPeriod %> ASC",
                "queryMeta": null,
                "__typename": "MetricQuery"
            },
            {
                "meta": {
                    "type": "primaryMetric",
                    "dataOnly": null,
                    "handle": "ordered_items",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW ordered_item_quantity\nFROM sales\n<% if (dateCondition) { %>\n  WHERE <%= overPeriod %> < <%= dateCondition %>\n<% } %>\nSINCE <%= period.since %>\nUNTIL <%= period.until %>",
                "queryMeta": null,
                "__typename": "MetricQuery"
            }
        ],
        "report": {
            "handle": "product_orders_and_returns",
            "params": {
                "selection": "ordered_item_quantity"
            },
            "ignoreDatePicker": false,
            "__typename": "Report"
        },
        "requiresOnlineStore": false,
        "requiresPos": false,
        "title": "按时间段显示订购商品数",
        "visualization": {
            "vizType": "LINE",
            "props": null,
            "options": null,
            "__typename": "Visualization"
        },
        "footer": null,
        "__typename": "V1Metric"
    },
    {
        "id": "total-returns",
        "cardType": "full",
        "handle": "total-returns",
        "isHidden": true,
        "hideComparison": false,
        "metricDomain": "FINANCES",
        "metricsLibraryPreviewDescription": "按时间段查看退货商品的成本。",
        "overridePrimaryMetric": false,
        "overrideVisualization": false,
        "channels": null,
        "popover": {
            "definition": "在选定时间段内退货的成本的总价值。",
            "formula": null,
            "__typename": "Popover"
        },
        "primaryMetricConfig": {
            "operation": "SUM",
            "operationColumn": "total_returns",
            "valueFormat": "PRICE",
            "trendIndicator": {
                "isDownwardPositive": true,
                "isNeutral": false,
                "__typename": "TrendIndicator"
            },
            "__typename": "PrimaryMetricConfig"
        },
        "queries": [
            {
                "meta": {
                    "type": "primary",
                    "dataOnly": null,
                    "handle": "total_returns_over_time",
                    "source": null,
                    "__typename": "MetricQueryMetadata"
                },
                "query": "SHOW\ntotal_sales AS 'total_returns'\nOVER <%= overPeriod %> AS over\nFROM sales\nWHERE \n  ((sale_kind == 'return') AND \n  (sale_line_type == 'product' OR sale_line_type == 'unknown' OR sale_line_type == 'shipping'))\n<% if (channelFilter) { %> AND <%= channelFilter %> <% } %>\nSINCE <%= period.since %>\nUNTIL <%= period.until %>\nORDER BY over ASC",
                "queryMeta": null,
                "__typename": "MetricQuery"
            }
        ],
        "report": {
            "handle": "returns",
            "params": null,
            "ignoreDatePicker": false,
            "__typename": "Report"
        },
        "requiresOnlineStore": false,
        "requiresPos": false,
        "title": "退款值总计",
        "visualization": {
            "vizType": "LINE",
            "props": null,
            "options": {
                "__typename": "LineOptions",
                "valueFormat": "PRICE"
            },
            "__typename": "Visualization"
        },
        "footer": null,
        "__typename": "V1Metric"
    }
];

const i18n = ref(new I18n(i18nContent.zh));

export const shopTimeZoneKey = Symbol("ShopTimeZoneKey");
export const localeKey = Symbol("LocaleKey");


export const useCommon = () => {
    return {
        i18n: i18n,
        shopTimeZone: inject<Ref<string>>(shopTimeZoneKey, ref("Asia/Shanghai")),
        browserTimeZone,
        locale: inject<Ref<string>>(localeKey, ref("zh-CN")),
        metrics
    }
}



