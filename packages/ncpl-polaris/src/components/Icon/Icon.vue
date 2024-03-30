<template>
    <span :class="className">
        <Text v-if="accessibilityLabel" as="span" visually-hidden>{{ accessibilityLabel }}</Text>
        <div v-if="source === 'placeholder'" :class="styles.Placeholder"></div>
        <img v-if="typeof source === 'string'" :class="styles.Img" :src="`data:image/svg+xml;utf8,${source}`" alt=""
            aria-hidden="true" />
        <component v-else-if="source" :is="source" :class="styles.Svg" :viewBox="mdDown ? '1 1 18 18' : void 0"
            focusable="false" aria-hidden="true">
        </component>
    </span>
</template>
<script setup lang="ts">

import { computed } from "vue";
import type { IconProps } from "./Icon";

import Text from "../Text";
import { classNames, variationName } from "../../utils";
import styles from "./Icon.module.css";
import { useBreakpoints } from "../context";

const props = defineProps<IconProps>();
const { mdDown } = useBreakpoints();
const className = computed(() => {
    const { tone } = props;
    return classNames(
        styles.Icon,
        tone && styles[variationName("tone", tone)]
    );
});
</script>