<template>
    <div :class="className">
        <Item v-for="(node, index) in nodes" :key="index">
            <component :is="node"></component>
        </Item>
    </div>
</template>
<script setup lang="ts">

import { computed, useSlots } from "vue";
import { classNames, elementChildren, variationName } from "../../utils"
import type { LegacyStackProps } from "./LegacyStack"
import Item from "./Item/Item.vue";
import styles from "./LegacyStack.module.scss";


defineOptions({
    name: 'NpLegacyStack',
})

const props = defineProps<LegacyStackProps>();
const slots = useSlots();

const nodes = computed(() => {
    return elementChildren(slots.default?.());
});

const className = computed(() => {
    const { wrap, spacing, distribution, alignment, vertical } = props;
    return classNames(
        styles.LegacyStack,
        vertical && styles.vertical,
        spacing && styles[variationName("spacing", spacing)],
        distribution && styles[variationName("distribution", distribution)],
        alignment && styles[variationName("alignment", alignment)],
        wrap === false && styles.noWrap
    );
});
</script>