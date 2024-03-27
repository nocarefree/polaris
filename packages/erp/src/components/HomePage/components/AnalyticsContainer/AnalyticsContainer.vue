<template>
  <div :class="styles.analyticsContainer">
    <NpBlockStack gap="400">
      <AnalyticsConstroller></AnalyticsConstroller>
      <AnalyticsCard></AnalyticsCard>
    </NpBlockStack>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { NpBlockStack } from "@ncpl/ncpl-polaris";
import AnalyticsConstroller from "../components/AnalyticsConstroller";
import AnalyticsCard from "../components/AnalyticsCard";
import styles from "../../HomePage.module.scss";
</script>
