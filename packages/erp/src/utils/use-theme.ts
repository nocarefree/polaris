import { computed, unref, type MaybeRef } from "vue";

var o = {
  colorWhite: 'white',
  colorBlack: 'black',
  colorDarkComparison: 'rgba(144, 176, 223, 0.8)',
  colorLightComparison: '#6793cc',
  colorLightPositive: 'var(--p-icon-success, #007f5f)',
  colorLightNegative: 'var(--p-icon-critical, #d72c0d)',
  colorLightNeutral: 'var(--p-icon-subdued, #8c9196)',
  colorDarkPositive: 'var(--p-icon-success, #039c86)',
  colorDarkNegative: 'var(--p-icon-critical, #f24f62)',
  colorDarkNeutral: 'var(--p-icon-subdued, #8c9196)',
  colorGray00: '#ffffff',
  colorGray10: '#f6f6f7',
  colorGray20: '#eeeeef',
  colorGray30: '#dadadd',
  colorGray40: '#cbcbcf',
  colorGray50: '#bdbdc2',
  colorGray60: '#b0b0b6',
  colorGray70: '#9d9da5',
  colorGray80: '#909099',
  colorGray90: '#82828c',
  colorGray100: '#70707b',
  colorGray110: '#5e5e69',
  colorGray120: '#545460',
  colorGray130: '#4b4b57',
  colorGray140: '#43434e',
  colorGray150: '#2e2e36',
  colorGray160: '#1f1f25',
  colorIndigo00: '#f7f5ff',
  colorIndigo10: '#efecff',
  colorIndigo20: '#e4deff',
  colorIndigo30: '#d4cbff',
  colorIndigo40: '#c5b7fe',
  colorIndigo50: '#b6a3fe',
  colorIndigo60: '#a78ffd',
  colorIndigo70: '#997afc',
  colorIndigo80: '#8c63fb',
  colorIndigo90: '#7f4afa',
  colorIndigo100: '#7329f9',
  colorIndigo110: '#6511e2',
  colorIndigo120: '#540dbf',
  colorIndigo130: '#44089e',
  colorIndigo140: '#34057d',
  colorIndigo150: '#25035e',
  colorIndigo160: '#16013e',
  colorBlue00: '#f3f7ff',
  colorBlue10: '#e6eefe',
  colorBlue20: '#d6e3fd',
  colorBlue30: '#bdd2fb',
  colorBlue40: '#a3c2f7',
  colorBlue50: '#88b1f2',
  colorBlue60: '#6ba2ec',
  colorBlue70: '#4b92e5',
  colorBlue80: '#4282cd',
  colorBlue90: '#3672bb',
  colorBlue100: '#2b62a9',
  colorBlue110: '#215297',
  colorBlue120: '#174385',
  colorBlue130: '#0e3572',
  colorBlue140: '#06275f',
  colorBlue150: '#021a4c',
  colorBlue160: '#000d36',
  colorTeal00: '#f0f8fb',
  colorTeal10: '#e0f1f8',
  colorTeal20: '#c8e7f4',
  colorTeal30: '#9edaef',
  colorTeal40: '#79cce5',
  colorTeal50: '#69bbd3',
  colorTeal60: '#5baac1',
  colorTeal70: '#4c9aaf',
  colorTeal80: '#3f899e',
  colorTeal90: '#33798c',
  colorTeal100: '#286a7b',
  colorTeal110: '#1d5a69',
  colorTeal120: '#144b59',
  colorTeal130: '#0b3d48',
  colorTeal140: '#042f38',
  colorTeal150: '#012129',
  colorTeal160: '#001419',
  colorMagenta00: '#fcf4fa',
  colorMagenta10: '#f9e9f5',
  colorMagenta20: '#f5dbef',
  colorMagenta30: '#f0c4e6',
  colorMagenta40: '#eaaedd',
  colorMagenta50: '#e596d4',
  colorMagenta60: '#e07dcc',
  colorMagenta70: '#da62c4',
  colorMagenta80: '#c654b1',
  colorMagenta90: '#b1489e',
  colorMagenta100: '#9c3c8b',
  colorMagenta110: '#873178',
  colorMagenta120: '#722665',
  colorMagenta130: '#5e1c53',
  colorMagenta140: '#4a1341',
  colorMagenta150: '#370b30',
  colorMagenta160: '#23041e',
  colorPurple00: '#f9f5ff',
  colorPurple10: '#f3eafe',
  colorPurple20: '#ebdcfd',
  colorPurple30: '#e0c8fa',
  colorPurple40: '#d4b3f6',
  colorPurple50: '#c89ef1',
  colorPurple60: '#bd8aea',
  colorPurple70: '#b176e2',
  colorPurple80: '#a85de0',
  colorPurple90: '#9f41dc',
  colorPurple100: '#8c35c4',
  colorPurple110: '#7a29ab',
  colorPurple120: '#671e93',
  colorPurple130: '#55147a',
  colorPurple140: '#430b62',
  colorPurple150: '#32054a',
  colorPurple160: '#200132',
  colorOrange00: '#fcf5f3',
  colorOrange10: '#f9ebe6',
  colorOrange20: '#f5ddd4',
  colorOrange30: '#f1c9b8',
  colorOrange40: '#eeb498',
  colorOrange50: '#ec9d71',
  colorOrange60: '#df8b55',
  colorOrange70: '#ca7d4a',
  colorOrange80: '#b66e3f',
  colorOrange90: '#a26134',
  colorOrange100: '#8e532a',
  colorOrange110: '#7a4621',
  colorOrange120: '#673a17',
  colorOrange130: '#552d0d',
  colorOrange140: '#432205',
  colorOrange150: '#311701',
  colorOrange160: '#1f0c00',
  colorYellow00: '#fff6df',
  colorYellow10: '#fcedc2',
  colorYellow20: '#fae275',
  colorYellow30: '#e6d25f',
  colorYellow40: '#d1c256',
  colorYellow50: '#bdb24e',
  colorYellow60: '#aaa246',
  colorYellow70: '#97933e',
  colorYellow80: '#858337',
  colorYellow90: '#74742c',
  colorYellow100: '#636522',
  colorYellow110: '#535718',
  colorYellow120: '#444810',
  colorYellow130: '#363a08',
  colorYellow140: '#2a2d03',
  colorYellow150: '#1d1f01',
  colorYellow160: '#111200'
};

const d2 = {
  0: 0,
  1: 0.09,
  2: 0.18,
  3: 0.27,
  4: 0.36,
  5: 0.44,
  6: 0.53,
  7: 0.61,
  8: 0.69,
  9: 0.77,
  10: 0.85,
  11: 0.92,
  12: 1,
  13: 1.08,
  14: 1.15,
  15: 1.23,
  16: 1.3,
  17: 1.37,
  18: 1.45,
  19: 1.52,
  20: 1.59,
  21: 1.66,
  22: 1.73,
  23: 1.81,
  24: 1.88,
  25: 1.96,
  26: 2.04,
  27: 2.12,
  28: 2.2,
  29: 2.28,
  30: 2.35,
  31: 2.43,
  32: 2.51,
  33: 2.58,
  34: 2.66,
  35: 2.73,
  36: 2.81,
  37: 2.89,
  38: 2.96,
  39: 3.04,
  40: 3.12
},
u2 = {
  100: 0.96,
  200: 0.97,
  300: 0.99,
  400: 1,
  450: 1.04,
  500: 1.04,
  600: 1.06,
  700: 1.09,
  800: 1.14,
  900: 1.19
},
B7 = {
  fontSize: d2,
  fontWeight: u2
};

const themes: any = {
  "Default": {
    "seriesColors": {
      "empty": "#43434e",
      "comparison": "rgba(144, 176, 223, 0.8)",
      "single": [
        {
          "offset": 0,
          "color": "#7f4afa"
        },
        {
          "offset": 85,
          "color": "#3672bb"
        },
        {
          "offset": 100,
          "color": "#4b92e5"
        }
      ],
      "upToEight": [
        [
          {
            "offset": 0,
            "color": "#7f4afa"
          },
          {
            "offset": 100,
            "color": "#997afc"
          }
        ],
        [
          {
            "offset": 0,
            "color": "#3672bb"
          },
          {
            "offset": 100,
            "color": "#4b92e5"
          }
        ],
        [
          {
            "offset": 0,
            "color": "#b1489e"
          },
          {
            "offset": 100,
            "color": "#da62c4"
          }
        ],
        [
          {
            "offset": 0,
            "color": "#33798c"
          },
          {
            "offset": 100,
            "color": "#4c9aaf"
          }
        ],
        [
          {
            "offset": 0,
            "color": "#b176e2"
          },
          {
            "offset": 100,
            "color": "#c89ef1"
          }
        ],
        [
          {
            "offset": 0,
            "color": "#b66e3f"
          },
          {
            "offset": 100,
            "color": "#df8b55"
          }
        ],
        [
          {
            "offset": 0,
            "color": "#d1c256"
          },
          {
            "offset": 100,
            "color": "#fae275"
          }
        ]
      ],
      "all": [
        "#33798c",
        "#88b1f2",
        "#7f4afa",
        "#b176e2",
        "#b1489e",
        "#ec9d71",
        "#97933e",
        "#79cce5",
        "#4282cd",
        "#c5b7fe",
        "#9f41dc",
        "#da62c4",
        "#b66e3f",
        "#fae275"
      ]
    },
    "tooltip": {
      "backgroundColor": "#2e2e36",
      "textColor": "white",
      "titleColor": "#bdbdc2"
    },
    "chartContainer": {
      "backgroundColor": "#1f1f25",
      "borderRadius": "0px",
      "minHeight": 200,
      "padding": "0px",
      "sparkChartMinHeight": 40
    },
    "line": {
      "hasArea": true,
      "hasSpline": true,
      "width": 2,
      "pointStroke": "#1f1f25"
    },
    "arc": {
      "cornerRadius": 2,
      "thickness": 36
    },
    "bar": {
      "zeroValueColor": "#909099",
      "borderRadius": 3
    },
    "grid": {
      "showHorizontalLines": true,
      "color": "#43434e",
      "horizontalOverflow": true,
      "horizontalMargin": 16,
      "verticalOverflow": true
    },
    "xAxis": {
      "labelColor": "#dadadd",
      "hide": false
    },
    "yAxis": {
      "backgroundColor": "#1f1f25",
      "labelColor": "#dadadd"
    },
    "groupLabel": {
      "hide": false
    },
    "crossHair": {
      "color": "#9d9da5",
      "width": 1
    },
    "legend": {
      "valueColor": "#9d9da5",
      "labelColor": "#dadadd",
      "backgroundColor": "#2e2e36",
      "trendIndicator": {
        "positive": "var(--p-icon-success, #039c86)",
        "negative": "var(--p-icon-critical, #f24f62)",
        "neutral": "var(--p-icon-subdued, #8c9196)"
      }
    },
    "annotations": {
      "backgroundColor": "#43434e",
      "textColor": "#dadadd",
      "titleColor": "white",
      "linkColor": "#a3c2f7",
      "axisLabelColor": "#909099",
      "lineColor": "#909099",
      "pillOpacity": 0.6
    },
    "trendIndicator": {
      "positive": "var(--p-icon-success, #039c86)",
      "negative": "var(--p-icon-critical, #f24f62)",
      "neutral": "var(--p-icon-subdued, #8c9196)"
    },
    "missingData": {
      "lineColor": "#4b4b57"
    }
  },
  "Light": {
    "seriesColors": {
      "empty": "#eeeeef",
      "comparison": "#6793cc",
      "single": [
        {
          "offset": 0,
          "color": "#7f4afa"
        },
        {
          "offset": 85,
          "color": "#3672bb"
        },
        {
          "offset": 100,
          "color": "#4b92e5"
        }
      ],
      "upToEight": [
        [
          {
            "offset": 0,
            "color": "#7f4afa"
          },
          {
            "offset": 100,
            "color": "#997afc"
          }
        ],
        [
          {
            "offset": 0,
            "color": "#3672bb"
          },
          {
            "offset": 100,
            "color": "#4b92e5"
          }
        ],
        [
          {
            "offset": 0,
            "color": "#b1489e"
          },
          {
            "offset": 100,
            "color": "#da62c4"
          }
        ],
        [
          {
            "offset": 0,
            "color": "#33798c"
          },
          {
            "offset": 100,
            "color": "#4c9aaf"
          }
        ],
        [
          {
            "offset": 0,
            "color": "#9f41dc"
          },
          {
            "offset": 100,
            "color": "#b176e2"
          }
        ],
        [
          {
            "offset": 0,
            "color": "#a26134"
          },
          {
            "offset": 100,
            "color": "#ca7d4a"
          }
        ],
        [
          {
            "offset": 0,
            "color": "#74742c"
          },
          {
            "offset": 100,
            "color": "#97933e"
          }
        ]
      ],
      "all": [
        "#33798c",
        "#4b92e5",
        "#7f4afa",
        "#b176e2",
        "#b1489e",
        "#b66e3f",
        "#bdb24e",
        "#4c9aaf",
        "#4282cd",
        "#997afc",
        "#9f41dc",
        "#da62c4",
        "#7a4621",
        "#97933e"
      ]
    },
    "tooltip": {
      "backgroundColor": "#ffffff",
      "textColor": "#1f1f25",
      "titleColor": "#70707b"
    },
    "chartContainer": {
      "backgroundColor": "#ffffff",
      "borderRadius": "0px",
      "minHeight": 200,
      "padding": "0px",
      "sparkChartMinHeight": 40
    },
    "line": {
      "hasArea": true,
      "hasSpline": true,
      "width": 2,
      "pointStroke": "#ffffff"
    },
    "arc": {
      "cornerRadius": 2,
      "thickness": 36
    },
    "bar": {
      "zeroValueColor": "#9d9da5",
      "borderRadius": 3
    },
    "grid": {
      "showHorizontalLines": true,
      "color": "#eeeeef",
      "horizontalOverflow": true,
      "horizontalMargin": 16,
      "verticalOverflow": true
    },
    "xAxis": {
      "labelColor": "#70707b",
      "hide": false
    },
    "yAxis": {
      "backgroundColor": "#ffffff",
      "labelColor": "#70707b"
    },
    "groupLabel": {
      "hide": false
    },
    "crossHair": {
      "color": "#cbcbcf",
      "width": 1
    },
    "legend": {
      "valueColor": "#1f1f25",
      "labelColor": "#70707b",
      "backgroundColor": "#f6f6f7",
      "trendIndicator": {
        "positive": "var(--p-icon-success, #007f5f)",
        "negative": "var(--p-icon-critical, #d72c0d)",
        "neutral": "var(--p-icon-subdued, #8c9196)"
      }
    },
    "annotations": {
      "backgroundColor": "#70707b",
      "textColor": "white",
      "titleColor": "white",
      "linkColor": "#a3c2f7",
      "axisLabelColor": "#9d9da5",
      "lineColor": "#9d9da5",
      "pillOpacity": 1
    },
    "trendIndicator": {
      "positive": "var(--p-icon-success, #007f5f)",
      "negative": "var(--p-icon-critical, #d72c0d)",
      "neutral": "var(--p-icon-subdued, #8c9196)"
    },
    "missingData": {
      "lineColor": "#cbcbcf"
    }
  },
  "Uplift": {
    "seriesColors": {
      "empty": "#eeeeef",
      "comparison": "#0A97D5",
      "single": [
        {
          "offset": 0,
          "color": "#0A97D5"
        },
        {
          "offset": 100,
          "color": "#50C3F7"
        }
      ],
      "upToEight": [
        [
          {
            "offset": 0,
            "color": "#079EE1"
          },
          {
            "offset": 100,
            "color": "#2EB9F5"
          }
        ],
        [
          {
            "offset": 0,
            "color": "#6A42E9"
          },
          {
            "offset": 100,
            "color": "#8F71EF"
          }
        ],
        [
          {
            "offset": 0,
            "color": "#3E69EA"
          },
          {
            "offset": 100,
            "color": "#7594F0"
          }
        ],
        [
          {
            "offset": 0,
            "color": "#D147AC"
          },
          {
            "offset": 100,
            "color": "#DD76C1"
          }
        ],
        [
          {
            "offset": 0,
            "color": "#1D9595"
          },
          {
            "offset": 100,
            "color": "#2CD2D2"
          }
        ],
        [
          {
            "offset": 0,
            "color": "#A249DF"
          },
          {
            "offset": 100,
            "color": "#BD7DE8"
          }
        ],
        [
          {
            "offset": 0,
            "color": "#6F8405"
          },
          {
            "offset": 100,
            "color": "#9DBB08"
          }
        ],
        [
          {
            "offset": 0,
            "color": "#D77114"
          },
          {
            "offset": 100,
            "color": "#EC882D"
          }
        ]
      ],
      "all": [
        "rgba(19, 172, 240, 1)",
        "rgba(86, 42, 228, 1)",
        "rgba(89, 126, 237, 1)",
        "rgba(155, 39, 124, 1)",
        "rgba(35, 186, 186, 1)",
        "rgba(126, 33, 190, 1)",
        "rgba(134, 159, 7, 1)",
        "rgba(139, 68, 3, 1)",
        "rgba(158, 132, 242, 1)",
        "rgba(18, 138, 192, 1)",
        "rgba(215, 94, 183, 1)",
        "rgba(16, 50, 149, 1)",
        "rgba(175, 99, 228, 1)",
        "rgba(21, 117, 117, 1)",
        "rgba(228, 124, 29, 1)",
        "rgba(64, 76, 3, 1)"
      ]
    },
    "tooltip": {
      "backgroundColor": "#ffffff",
      "textColor": "#1f1f25",
      "titleColor": "#70707b"
    },
    "chartContainer": {
      "backgroundColor": "#ffffff",
      "borderRadius": "0px",
      "minHeight": 200,
      "padding": "0px",
      "sparkChartMinHeight": 40
    },
    "line": {
      "hasArea": true,
      "hasSpline": true,
      "width": 2,
      "pointStroke": "#ffffff"
    },
    "arc": {
      "cornerRadius": 2,
      "thickness": 36
    },
    "bar": {
      "zeroValueColor": "#9d9da5",
      "borderRadius": 3
    },
    "grid": {
      "showHorizontalLines": true,
      "color": "#eeeeef",
      "horizontalOverflow": true,
      "horizontalMargin": 16,
      "verticalOverflow": true
    },
    "xAxis": {
      "labelColor": "#70707b",
      "hide": false
    },
    "yAxis": {
      "backgroundColor": "#ffffff",
      "labelColor": "#70707b"
    },
    "groupLabel": {
      "hide": false
    },
    "crossHair": {
      "color": "#cbcbcf",
      "width": 1
    },
    "legend": {
      "valueColor": "#1f1f25",
      "labelColor": "#70707b",
      "backgroundColor": "#f6f6f7",
      "trendIndicator": {
        "positive": "#29845A",
        "negative": "#E51C00",
        "neutral": "#8A8A8A"
      }
    },
    "annotations": {
      "backgroundColor": "#70707b",
      "textColor": "white",
      "titleColor": "white",
      "linkColor": "#a3c2f7",
      "axisLabelColor": "#9d9da5",
      "lineColor": "#9d9da5",
      "pillOpacity": 1
    },
    "trendIndicator": {
      "positive": "#29845A",
      "negative": "#E51C00",
      "neutral": "#8A8A8A"
    },
    "missingData": {
      "lineColor": "#cbcbcf"
    }
  }
}


export const useTheme = (name: MaybeRef<'Default' | 'Light' | 'Uplift'> = 'Default') => {
  const theme = computed(() => {
    const _name = unref(name);
    return themes[_name];
  })

  return {
    theme
  }
}