<template>
    <span :class="className">
        <Text as="span" visually-hidden :accessibility-label="accessibilityLabel"></Text>
        <div v-if="source === 'placeholder'" :class="styles.Placeholder"></div>
        <img v-if="typeof source === 'string'" :class="styles.Img" :src="`data:image/svg+xml;utf8,${source}`" alt=""
            aria-hidden="true" />
        <component v-else :is="source" :class="styles.Svg" focusable="false" aria-hidden="true"></component>
    </span>
</template>
<script setup lang="ts">

import { computed } from "vue";
import type { IconProps } from "./Icon";

import Text from "@ncpl-polaris/components/Text";
import { classNames, variationName } from "@ncpl-polaris/utils";
import styles from "./Icon.module.scss"

const props = defineProps<IconProps>();

const className = computed(() => {
    const { color, backdrop } = props;
    return classNames(
        styles.Icon,
        color && styles[variationName("color", color)],
        color && styles.applyColor,
        backdrop && styles.hasBackdrop
    );
});
</script>