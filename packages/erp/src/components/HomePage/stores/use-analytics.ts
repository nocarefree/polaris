import { rangeDate } from "../../AnalyticsDateControls/utils/analytics-date-range"

export const useAnalytics = () => {

  return {
    dateControls: {
      primaryRange: rangeDate({
        since: 'today',
        until: 'today',
        alias: 'today',
        timeZone: 'UTC'
      }),
      comparisonRange: rangeDate({
        since: 'yesterday',
        until: 'yesterday',
        alias: 'yesterday',
        timeZone: 'UTC'
      }),
      handleChange: () => {
      },
      selectedRangePreset: 'today'
    },
    channelsData: {
      channels: [],
      channelsLoading: !1,
      activeChannel: {
        title: '',
        apiClientId: ''
      },
      setActiveChannel: () => {
      }
    },
    metricCardResponses: {
      liveVisitorsQueryData: [],
      visibleMetricsQueryData: {},
      bfcmQueryData: {
        totalSalesByDateQueryData: [],
        totalOrdersByDateQueryData: [],
        topProductsBySalesQueryData: [],
        totalVisitorsByDateQueryData: []
      }
    },
    metricsLoading: !1,
    onlyMetricErrors: !1,
    visibleMetrics: [
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
        "id": "return-value",
        "cardType": "full",
        "handle": "return-value",
        "isHidden": false,
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
        "id": "online-store-total-conversion-over-time",
        "cardType": "full",
        "handle": "online-store-total-conversion-over-time",
        "isHidden": false,
        "hideComparison": false,
        "metricDomain": "BEHAVIOR",
        "metricsLibraryPreviewDescription": "达成在线商店订单的访问数占总访问数的百分比。",
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
          "definition": "达成在线商店订单的访问数占总访问数的百分比。",
          "formula": "在线商店转化率 = [转化的访问数/所有访问数] * 100",
          "__typename": "Popover"
        },
        "primaryMetricConfig": {
          "operation": "NONE",
          "operationColumn": "total_conversion",
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
              "handle": "online_store_total_conversion_over_time",
              "source": null,
              "__typename": "MetricQueryMetadata"
            },
            "query": "SHOW total_conversion\nOVER <%= overPeriod %>\nFROM visits\nSINCE <%= period.since %>\nUNTIL <%= period.until %>\nORDER BY <%= overPeriod %> ASC",
            "queryMeta": null,
            "__typename": "MetricQuery"
          },
          {
            "meta": {
              "type": "primaryMetric",
              "dataOnly": null,
              "handle": "online_store_total_conversion_primary_metric",
              "source": null,
              "__typename": "MetricQueryMetadata"
            },
            "query": "SHOW total_conversion\nFROM visits\n<% if (dateCondition) { %>\n  WHERE <%= overPeriod %> < <%= dateCondition %>\n<% } %>\nSINCE <%= period.since %>\nUNTIL <%= period.until %>",
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
        "title": "转化率",
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
        "id": "sessions",
        "cardType": "full",
        "handle": "sessions",
        "isHidden": true,
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
        "id": "total-sales",
        "cardType": "full",
        "handle": "total-sales",
        "isHidden": true,
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
        "id": "returning-customer-rate",
        "cardType": "full",
        "handle": "returning-customer-rate",
        "isHidden": true,
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
        "id": "top-products-by-units-sold-home",
        "cardType": "full",
        "handle": "top-products-by-units-sold-home",
        "isHidden": true,
        "hideComparison": false,
        "metricDomain": "SALES",
        "metricsLibraryPreviewDescription": "了解哪些是畅销产品及其销售额的变化情况。",
        "overridePrimaryMetric": true,
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
          "vizType": "BAR",
          "props": null,
          "options": {
            "__typename": "BarOptions",
            "valueFormat": null,
            "headings": []
          },
          "__typename": "Visualization"
        },
        "footer": null,
        "__typename": "V1Metric"
      },
      {
        "id": "sales-channels-home",
        "cardType": "full",
        "handle": "sales-channels-home",
        "isHidden": true,
        "hideComparison": false,
        "metricDomain": "SALES",
        "metricsLibraryPreviewDescription": "对比热门销售渠道的总销售额。",
        "overridePrimaryMetric": false,
        "overrideVisualization": true,
        "channels": null,
        "popover": {
          "definition": "每个活跃销售渠道的总销售额。",
          "formula": null,
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
              "handle": "total_sales_by_channel_home",
              "source": null,
              "__typename": "MetricQueryMetadata"
            },
            "query": "SHOW total_sales\nBY api_client_title\nFROM sales\n<% if (channelFilter) { %> WHERE <%= channelFilter %> <% } %>\n<% if (dateCondition) { %>\n  <%= channelFilter ? 'AND' : 'WHERE' %> <%= overPeriod %> < <%= dateCondition %>\n<% } %>\nSINCE <%= period.since %>\nUNTIL <%= period.until %>\nORDER BY total_sales DESC",
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
          "vizType": "BAR",
          "props": null,
          "options": {
            "__typename": "BarOptions",
            "valueFormat": "PRICE",
            "headings": []
          },
          "__typename": "Visualization"
        },
        "footer": null,
        "__typename": "V1Metric"
      },
      {
        "id": "retail-sales-by-staff-at-register-home",
        "cardType": "full",
        "handle": "retail-sales-by-staff-at-register-home",
        "isHidden": true,
        "hideComparison": false,
        "metricDomain": "SALES",
        "metricsLibraryPreviewDescription": "查看实体零售地点的每位员工获得的销售额明细。",
        "overridePrimaryMetric": false,
        "overrideVisualization": true,
        "channels": [
          {
            "apiClientId": 6517121,
            "handle": "point-of-sale-channel",
            "__typename": "ApiClientChannel"
          },
          {
            "apiClientId": 129785,
            "handle": "pos",
            "__typename": "ApiClientChannel"
          },
          {
            "apiClientId": 757165,
            "handle": "shopify-pos-for-android",
            "__typename": "ApiClientChannel"
          }
        ],
        "popover": {
          "definition": "每位员工通过零售 POS 获得的总销售额。",
          "formula": null,
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
        "id": "sales-by-pos-location-home",
        "cardType": "full",
        "handle": "sales-by-pos-location-home",
        "isHidden": true,
        "hideComparison": false,
        "metricDomain": "SALES",
        "metricsLibraryPreviewDescription": "对比每个实体零售地点的总销售额。",
        "overridePrimaryMetric": false,
        "overrideVisualization": true,
        "channels": [
          {
            "apiClientId": 6517121,
            "handle": "point-of-sale-channel",
            "__typename": "ApiClientChannel"
          },
          {
            "apiClientId": 129785,
            "handle": "pos",
            "__typename": "ApiClientChannel"
          },
          {
            "apiClientId": 757165,
            "handle": "shopify-pos-for-android",
            "__typename": "ApiClientChannel"
          }
        ],
        "popover": {
          "definition": "每个实体零售 POS 地点的总销售额。",
          "formula": null,
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
      }
    ],
    metricsLibrary: [

    ]
  }
}