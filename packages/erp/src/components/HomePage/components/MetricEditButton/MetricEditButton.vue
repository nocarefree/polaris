<template>
  <div :class="classNames(styles.pencilContainer, opened && styles.listOpen)">
    <NpPopover v-model:active="opened">
      <template #activator>
        <NpButton size="slim" variant="tertiary" :icon="EditIcon" @click="opened = !opened"
          :accessibility-label="i18n.translate('MetricsSection.editMetric')" />
      </template>

      <div :class="styles.metricEditButtonPopOverContainer">
        <NpActionList :items=""></NpActionList>
      </div>
    </NpPopover>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { NpPopover, NpButton } from "@ncpl/ncpl-polaris";
import styles from "../../HomePage.module.scss";
import { useCommon } from "../../../context";
import { EditIcon } from "@ncpl/ncpl-icons";

const opened = ref(false)
const { i18n } = useCommon();
</script>
