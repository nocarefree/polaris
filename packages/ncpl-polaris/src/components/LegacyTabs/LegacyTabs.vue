<template>
  <div>
    <Box border-block-end-width="025" border-color="border-secondary" padding-inline-start="200" padding-inline-end="200">
      <TabMeasurer :tabToFocus="tabToFocus" :activator="activator" :selected="selected" :tabs="tabs"
        :siblingTabHasFocus="tabToFocus > -1" :handleMeasurement="this.handleMeasurement" />
      <ul role="tablist" :className="classname" :onFocus="this.handleFocus" :onBlur="this.handleBlur"
        :onKeyDown="handleKeyDown" :onKeyUp="this.handleKeyPress">
        {tabsMarkup}
        <li :className="disclosureTabClassName" role="presentation">
          <Popover preferredPosition="below" :activator="activator" :active="disclosureActivatorVisible && showDisclosure"
            :onClose="this.handleClose" autofocusTarget="first-node">
            <List :focusIndex="hiddenTabs.indexOf(tabToFocus)" :disclosureTabs="disclosureTabs"
              :onClick="this.handleTabClick" :onKeyPress="this.handleKeyPress" />
          </Popover>
        </li>
      </ul>
    </Box>
    {panelMarkup}
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { LegacyTabsProps } from './LegacyTabs'
import styles from './LegacyTabs.module.scss'
import Box from "../Box"

defineOptions({
  name: 'NpLegacyTabs',
})
defineProps<LegacyTabsProps>()
</script>
