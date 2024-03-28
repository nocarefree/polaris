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
import { AnalyticsConstroller, Metrics } from "../";
import styles from "../../HomePage.module.scss";
</script>
