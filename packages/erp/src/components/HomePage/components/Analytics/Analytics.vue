<template>
  <div :class="styles.analyticsContainer">
    <NpBlockStack gap="400">
      <AnalyticsConstroller></AnalyticsConstroller>
      <Metrics></Metrics>
    </NpBlockStack>
  </div>
</template>
<script setup lang="ts">
import { NpBlockStack } from "@ncpl/ncpl-polaris";
import { AnalyticsConstroller } from "../AnalyticsConstroller";
import { Metrics } from "../Metrics";
import styles from "../../HomePage.module.scss";
</script>
