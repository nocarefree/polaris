<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

import { NpActionList, NpTopBarSearchField, NpFrame, NpNavigation, NpNavigationSection, NpAppProvider, NpTopBar, NpTopBarUserMenu } from "@ncpl/ncpl-polaris"
import { HomeMinor } from "@ncpl/ncpl-icons"
import en from "@ncpl/ncpl-polaris/locales/en.json"
import { components } from "./routes/components";
import { kebabCase, upperFirst, lowerCase } from "lodash";

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
    url: '#',
    excludePaths: ['#'],
    label: 'Home',
    icon: HomeMinor,
  },
  ...components.map((item) => {
    const { title, icon, items } = item;
    let utitle = kebabCase(title), label = upperFirst(lowerCase(title));

    return {
      url: `/components/${utitle}`,
      label,
      icon,
      subNavigationItems: items.map((sub) => {
        return {
          url: `/components/${utitle}/${kebabCase(sub.title)}`,
          label: upperFirst(lowerCase(sub.title)),
        }
      })
    }

  })
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
      <router-view></router-view>
    </NpFrame>
  </NpAppProvider>
</template>

<style lang="scss">
@import "./styles/globals.scss";

#AppFrameMain {
  background-color: #fff;
}

.light-mode {
  --text: #434e4e;
  --text-strong: #1c1e1e;
  --text-subdued: #767676;
  --text-link: #4e52b8;
  --surface: #fff;
  --surface-attention: #ffffe1;
  --surface-code-inline: #f1f1f1;
  --surface-information: #dcf5f0;
  --surface-subdued: #f9f9f9;
  --surface-warning: #ffeceb;
  --surface-active: #f1f1f1;
  --fill-success: #29845a;
  --fill-caution: #ffe600;
  --fill-critical: #e51c00;
  --fill-info: #91d0ff;
  --text-success-onfill: #ffffff;
  --text-caution-onfill: #332e00;
  --text-critical-onfill: #ffffff;
  --text-info-onfill: #002133;
  --primary: #008060;
  --border-color: #e9e9e9;
  --border: 1px solid var(--border-color);
  --card-shadow: 0 0 0 1px rgb(0 0 0 / 5%), 0 2px 2px rgb(0 0 0 / 4%);
  --card-shadow-hover: 0 4px 7px rgba(0, 0, 0, 0.1),
    0 0 0 0.5px var(--border-color);
  --decorative-1: #dfefd2;
  --decorative-2: #fae8d4;
  --decorative-3: #f8dff1;
  --decorative-4: #dce0f5;
  --backdrop: rgba(0, 0, 0, 0.5);
  --code-keyword: #017b33;
  --code-function: var(--code-keyword);
  --code-string: #6a00df;
  --code-boolean: #d6004b;
  --code-number: #c55100;
  --code-operator: var(--text);
  --code-punctuation: var(--text-subdued);
  --code-property: var(--code-keyword);
  --code-selector: var(--code-keyword);
  --code-comment: #3d2fe8;
  --code-inserted: var(--code-keyword);
  --code-deleted: var(--code-boolean);
  --code-inserted-highlight: #e5ffef;
  --code-deleted-highlight: #fff3f8;
  --code-quantifier: #5588ff;
  --code-escape: #cc00cc;
  --code-charset-punctuation: #dd7700;
  --code-anchor: #884400;
  --code-group: #ccaa00;
  --code-alternation: #00aa00;
}
</style>