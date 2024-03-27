<template>
  <div :class="classNames(styles.metricsButton, styles.metricsButtonWidth, selected && styles.metricButtonSelected)"
    role="button" tabindex="0" @click="emit('click')">
    <NpBox :background="selected ? 'bg' : 'bg-surface'" padding="300" padding-block-start="150" padding-block-end="150"
      border-radius="200">
      <CompactPrimaryMetricSkeleton v-if="loading" :has-title="Boolean(card.card.title)" :type="card.card.type"
        :wrapper="card.card.wrapper" />
      <MetricCard v-else-if="card.data" v-bind="card" empty-state-text="—">
        <template #action>
          <div :class="styles.pencilContainer">
            <NpPopover>
              <template #activator>
                <NpButton size="slim" @click="active = !active" :icon="EditIcon" :disabled="false"
                  :show-notification-dot="false"></NpButton>
              </template>
              <div class="metricEditButtonPopOverContainer">
                <NpBox>
                  <NpTextField :icon="SearchIcon" v-model="searchValue"></NpTextField>
                </NpBox>
                <NpBox>
                  <NpActionList :items="items"></NpActionList>
                </NpBox>
              </div>
            </NpPopover>
          </div>
        </template>
      </MetricCard>
    </NpBox>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

import { NpBox, NpPopover, NpButton, NpTextField, classNames, NpActionList } from "@ncpl/ncpl-polaris";
import MetricCard from "../../../MetricCard";
import { SearchIcon, EditIcon } from "@ncpl/ncpl-icons";
import styles from "../../HomePage.module.scss";

defineProps<{
  selected?: boolean;
  metricsLoading?: boolean;
  card: {
    data: any[];
    card: any
  };
}>()

const active = ref(false);
const searchValue = ref('');


</script>
<style module></style>