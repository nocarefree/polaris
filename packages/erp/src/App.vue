<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

import { NpActionList, NpTopBarSearchField, NpFrame, NpNavigation, NpNavigationSection, NpAppProvider, NpTopBar, NpTopBarUserMenu } from "@ncpl/ncpl-polaris";
import { HomeIcon, ThemeTemplateIcon, OrderFilledIcon } from "@ncpl/ncpl-icons"
import zhCn from "@ncpl/ncpl-polaris/locales/zh-CN.json"

import LogoColor from './assets/jaded-pixel-logo-color.svg';
import LogoGray from './assets/jaded-pixel-logo-gray.svg';
import { provide } from 'vue'
import { ApolloClients } from '@vue/apollo-composable';
import { apolloClient } from "./apollo";
import { NotificationMenu } from "./components/NotificationMenu"


const route = useRoute();

const logo = {
  width: 124,
  topBarSource: LogoColor,
  contextualSaveBarSource: LogoGray,
  url: '/',
  accessibilityLabel: 'Jaded Pixel',
};

const navItems = [
  {
    url: '/',
    label: '主页',
    icon: HomeIcon,
    exactMatch: true,
  },
  {
    url: '/orders',
    label: '订单',
    icon: OrderFilledIcon,
  },
  {
    url: '#templates',
    excludePaths: ['#'],
    label: '模板',
    icon: ThemeTemplateIcon,
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


provide(ApolloClients, {
  default: apolloClient,
})

</script>

<template>
  <div :class="$style.OuterContainer">
    <NpAppProvider :i18n="zhCn" router>
      <div id="AppFrame" :class="$style.AppFrame">
        <NpFrame :logo="logo" v-model:showMobileNavigation="showMobileNavigation">
          <template #topBar>
            <NpTopBar show-navigation-toggle v-model:searchResultsVisible="searchActive"
              @searchResultsDismiss="searchValue = ''" @navigationToggle="showMobileNavigation = !showMobileNavigation">
              <template #userMenu>
                <NpTopBarUserMenu :actions="userMenuActions" name="Dharma" :detail="storeName" initials="D"
                  v-model:open="userMenuActive" />
              </template>
              <template #secondaryMenu>
                <NotificationMenu />
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
            <NpNavigation :location="route.path">
              <NpNavigationSection fill :items="navItems" />
            </NpNavigation>
          </template>
          <router-view></router-view>
        </NpFrame>
      </div>
    </NpAppProvider>
  </div>
</template>

<style lang="scss">
@import "./styles/globals.scss";
</style>

<style module>
.OuterContainer {
  transition: height var(--p-motion-duration-200) var(--p-motion-ease);
  height: 100vh;
}

.AppFrame {
  scrollbar-color: auto;
}
</style>