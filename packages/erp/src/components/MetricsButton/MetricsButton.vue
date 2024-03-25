<template>
    <div :class="classNames($style.metricsButton, $style.metricsButtonWidth, active && $style.metricButtonSelected)">
        <NpBox background="t ? 'bg' : 'bg-surface'" padding="300" padding-block-start="150" padding-block-end="150"
            border-radius="200">
            <Metric></Metric>
        </NpBox>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

import { NpBox, classNames } from "@ncpl/ncpl-polaris";
import Metric from "../Metric";


const active = ref(false);


</script>
<style module></style>