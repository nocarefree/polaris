<template>
  <div :class="classNames($style.metricsButton, $style.metricsButtonWidth, active && $style.metricButtonSelected)">
    <NpBox background="t ? 'bg' : 'bg-surface'" padding="300" padding-block-start="150" padding-block-end="150"
      border-radius="200">
      <Metric title="Order">
        <template #action>
          <div :class="$style.pencilContainer">
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
      </Metric>
    </NpBox>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

import { NpBox, NpPopover, NpButton, NpTextField, classNames, NpActionList } from "@ncpl/ncpl-polaris";
import Metric from "../Metric";
import { SearchIcon, EditIcon } from "@ncpl/ncpl-icons";

defineProps<{
  items: any[];
}>()

const active = ref(false);
const searchValue = ref('');


</script>
<style module></style>