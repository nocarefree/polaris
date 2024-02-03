<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

import { NpActionList, NpTopBarSearchField, NpFrame, NpNavigation, NpNavigationSection, NpAppProvider, NpTopBar, NpTopBarUserMenu } from "@ncpl/ncpl-polaris"
import { TemplateMinor, OrdersFilledMinor } from "@ncpl/ncpl-icons"
import en from "@ncpl/ncpl-polaris/locales/zh-CN.json"

const route = useRoute();

const logo = {
  width: 124,
  topBarSource:
    'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-color.svg?6215648040070010999',
  contextualSaveBarSource:
    'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-gray.svg?6215648040070010999',
  url: '#',
  accessibilityLabel: 'Jaded Pixel',
};

const navItems = [
  {
    url: '/tasks',
    label: '任务',
    icon: OrdersFilledMinor,
    subNavigationItems: [
      { url: '/export_logs', label: '导出日志' },
    ]
  },
  {
    url: '#templates',
    excludePaths: ['#'],
    label: '模板',
    icon: TemplateMinor,
  },
];


const userMenuActions = [
  {
    items: [{ content: 'Community forums' }],
  },
];

const storeName = ref("storeName");
const userMenuActive = ref(false);
const searchValue = ref("");
const showMobileNavigation = ref(false);
const searchResult = [{ content: 'Shopify help center' }, { content: 'Community forums' }];
const searchActive = computed(() => {
  return searchValue.value.length > 0
})

</script>

<template>
  <NpAppProvider :i18n="en" router>
    <NpFrame :logo="logo" v-model:showMobileNavigation="showMobileNavigation">
      <template #topBar>
        <NpTopBar show-navigation-toggle v-model:searchResultsVisible="searchActive"
          @searchResultsDismiss="searchValue = ''" @navigationToggle="showMobileNavigation = !showMobileNavigation">
          <template #userMenu>
            <NpTopBarUserMenu :actions="userMenuActions" name="Dharma" :detail="storeName" initials="D"
              v-model:open="userMenuActive" />
          </template>
          <template #searchField>
            <NpTopBarSearchField v-model="searchValue" placeholder="Search" />
          </template>
          <template #searchResults>
            <NpActionList :items="searchResult" />
          </template>
        </NpTopBar>
      </template>
      <template #navigation>
        <NpNavigation :location="String(route.path)">
          <NpNavigationSection fill :items="navItems" />
        </NpNavigation>
      </template>
      <div><router-view></router-view></div>
    </NpFrame>
  </NpAppProvider>
</template>

<style lang="scss">
@import "./styles/globals.scss";
</style>