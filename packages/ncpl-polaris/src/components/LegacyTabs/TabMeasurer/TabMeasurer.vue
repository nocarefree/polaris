<template>
    <div :class="classNames(styles.LegacyTabs, styles.TabMeasurer)" ref="containerNode">
      <EventListener event="resize" :handler="handleMeasurement" />
      <Tab
        v-for="(tab, index) in tabs"
        measuring
        :key="`${index}${tab.id}Hidden`"
        :id="`${tab.id}Measurer`"
        :siblingTabHasFocus="siblingTabHasFocus"
        :focused="index === tabToFocus"
        :selected="index === selected"
        :url="tab.url"
      >
        {tab.content}
      </Tab>
      <slot name="activator"></slot>
    </div>
</template>
<script setup lang="ts">
import { classNames } from "../../../utils"
</script>