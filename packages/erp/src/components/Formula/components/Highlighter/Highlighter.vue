<template>
    <p :class="styles.Formula">
        <span :class="styles.FormulaResult">{{ result }}</span>
        <span :class="styles.FormulaBracketOrEquals">=</span>
        <span v-for="variable in variables" :class="getClassnames(variable)">{{ variable }}</span>
    </p>
</template>
<script setup lang="ts">
import { result } from "lodash";
import styles from "../../MetricLayout.module.scss";

defineProps<{
    result: string;
    variables: string[];
}>()

function $t(e: string) {
    return /^-?\d+$/.test(e)
}

const ht: string[] = [
    '+',
    '-',
    '*',
    '/',
    '='
], Rt: string[] = [
    '[',
    ']'
];

const getClassnames = (l: string) => {
    return ht.includes(l) || $t(l) ? styles.FormulaOperatorOrNumber : Rt.includes(l) ? styles.FormulaBracketOrEquals : styles.FormulaVariable;
}

</script>