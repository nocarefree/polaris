<template>
  <div :class="styles.FlexWrapper">
    {{ value }}
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

import styles from "../../MetricCard.module.scss";

defineProps<{
  value: string;
  type: any;
  tooltip?: any;
}>()


import {
  e as O,
  d as u,
  f as T,
  u as x
}
  from './character-width-offsets.json-DrLiYQCbih3m.js';
import {
  J as o
}
  from './common-DZyZgCHBih-c.js';
const i = 11,
  v = 2,
  b = 4,
  g = 5.5,
  p = 11,
  w = 450,
  f = 16,
  m = 3;
function G(r, l, a) {
  var e,
    t;
  const c = O(r, T),
    n = (e = u.fontSize[l]) !== null &&
      e !== void 0 ? e : 1,
    d = (t = u.fontWeight[a]) !== null &&
      t !== void 0 ? t : 100,
    s = c * n * d;
  return Math.round((s + Number.EPSILON) * 100) / 100
}
function B(r) {
  const l = r ? G(r, p, w) : i;
  return {
    totalWidth: Math.round(g + b + l),
    textWidth: l
  }
}
var M = {
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
  colorYellow160: '#111200',
  SVG: '_SVG_1ou8g_150'
};
function h({
  accessibilityLabel: r,
  children: l,
  height: a,
  width: e,
  tabIndex: t = 0
}) {
  const c = r != null;
  return o.jsxs(
    'svg',
    {
      viewBox: `0 0 ${e} ${a}`,
      height: a,
      width: e,
      role: c ? 'img' : void 0,
      className: M.SVG,
      tabIndex: t,
      children: [
        c &&
        o.jsx('title', {
          children: r
        }),
        l
      ]
    }
  )
}
function P() {
  return o.jsx(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '6',
      height: '6',
      fill: 'none',
      viewBox: '0 0 6 6',
      children: o.jsx(
        'path',
        {
          fill: 'currentColor',
          fillRule: 'evenodd',
          d: 'M1 .25a.75.75 0 1 0 0 1.5h2.19L.594 4.345a.75.75 0 0 0 1.06 1.06L4.25 2.811V5a.75.75 0 0 0 1.5 0V1A.748.748 0 0 0 5 .25H1Z',
          clipRule: 'evenodd'
        }
      )
    }
  )
}
function y() {
  return o.jsx(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '6',
      height: '6',
      fill: 'none',
      viewBox: '0 0 6 6',
      children: o.jsx(
        'path',
        {
          fill: 'currentColor',
          fillRule: 'evenodd',
          d: 'M5.75 1a.75.75 0 0 0-1.5 0v2.19L1.655.594a.75.75 0 1 0-1.06 1.06L3.189 4.25H1a.75.75 0 0 0 0 1.5h4a.748.748 0 0 0 .529-.218l.001-.002.002-.001A.748.748 0 0 0 5.75 5V1Z',
          clipRule: 'evenodd'
        }
      )
    }
  )
}
function S({
  accessibilityLabel: r,
  direction: l = 'upward',
  tabIndex: a = - 1,
  theme: e = 'Light',
  trend: t = 'neutral',
  value: c
}) {
  const n = x(e),
    d = {
      accessibilityLabel: r,
      height: f,
      tabIndex: a
    };
  if (c == null) return o.jsx(
    h,
    {
      ...d,
      width: i,
      children: o.jsx(
        'path',
        {
          d: 'M0.519531 1.79395H12.0039V0.249023H0.519531V1.79395Z',
          fill: n.trendIndicator.neutral,
          transform: `translate(${(i - i) / 2}, ${(f - v) / 2})`
        }
      )
    }
  );
  const {
    textWidth: s,
    totalWidth: I
  }
    = B(c);
  return o.jsx(
    h,
    {
      ...d,
      width: I,
      children: o.jsxs(
        'g',
        {
          color: n.trendIndicator[t],
          children: [
            o.jsx(
              'g',
              {
                transform: `translate(0, ${(f - g) / 2})`,
                children: l === 'upward' ? o.jsx(P, {
                }) : o.jsx(y, {
                })
              }
            ),
            o.jsx(
              'text',
              {
                x: g + b,
                y: (f + m) / 2,
                fontSize: p,
                fill: 'currentColor',
                fontWeight: w,
                dominantBaseline: 'middle',
                fontFamily: '-apple-system, BlinkMacSystemFont, \'San Francisco\', \'Segoe UI\', Roboto, \'Helvetica Neue\', sans-serif',
                textRendering: 'geometricPrecision',
                width: s,
                children: c
              }
            )
          ]
        }
      )
    }
  )
}
export {
  f as H,
  S as T,
  B as e
};
//# sourceMappingURL=https://web-sourcemaps.shopify.io/v1/zh-CN/TrendIndicator-HiAqWWQyk4MA.js.map

</script>
