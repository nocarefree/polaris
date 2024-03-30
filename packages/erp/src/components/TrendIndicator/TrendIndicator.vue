<template>
  <Icon v-if="!value" :accessibility-label="accessibilityLabel" :height="f" :tab-index="tabIndex" :width="i">
    <path d="M0.519531 1.79395H12.0039V0.249023H0.519531V1.79395Z" :fill="n.trendIndicator[trend]"
      :transform="`translate(${(i - i) / 2}, ${(f - v) / 2})`"></path>
  </Icon>
  <Icon v-if="value" :accessibility-label="accessibilityLabel" :height="f" :tab-index="tabIndex"
    :width="svg.totalWidth">
    <g :color="n.trendIndicator[trend]">
      <g :transform="`translate(0, ${(f - g) / 2})`">
        <UpwardIcon v-if="direction == 'upward'" />
        <DownwardIcon v-else />
      </g>
      <text :x="g + b" :y="(f + m) / 2" :font-size="p" fill="currentColor" :font-weight="w" dominant-baseline="middle"
        font-family="-apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif"
        text-rendering="geometricPrecision" :width="svg.textWidth">{{ value }}</text>
    </g>

  </Icon>
</template>
<script setup lang="ts">
import { computed } from "vue";
import Icon from "./components/Icon";
import { useTheme } from "../../utils/use-theme";
import UpwardIcon from './components/UpwardIcon';
import DownwardIcon from './components/DownwardIcon';
import { characterScale, getCharsWidth } from "../../utils/character-width-offsets";

const props = withDefaults(defineProps<{
  accessibilityLabel?: string;
  direction?: 'upward' | 'downward';
  tabIndex?: number;
  theme?: 'Light' | 'Default';
  trend: string;
  value?: string;
}>(), {
  direction: 'upward',
  tabIndex: -1,
  theme: 'Light',
  trend: 'neutral',
})

const { theme: n } = useTheme(props.theme);
const svg = computed(() => B(props.value));



const i = 11,
  v = 2,
  b = 4,
  g = 5.5,
  p = 11,
  w = 450,
  f = 16,
  m = 3;


function G(r: string, l: number, a: number) {
  var e,
    t;
  const c = getCharsWidth(r),
    n = (e = characterScale.fontSize[l]) !== null &&
      e !== void 0 ? e : 1,
    d = (t = characterScale.fontWeight[a]) !== null &&
      t !== void 0 ? t : 100,
    s = c * n * d;
  return Math.round((s + Number.EPSILON) * 100) / 100
}
function B(r?: string) {
  const l = r ? G(r, p, w) : i;
  return {
    totalWidth: Math.round(g + b + l),
    textWidth: l
  }
}




</script>
