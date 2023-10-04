<script setup lang="ts">
import { reactive, onMounted, computed } from "vue";
import type { AppProviderProps } from "./AppProvider"
import { i18nContext, mediaQueryContext, stickyManagerContext, scrollLockManagerContext, featuresContext } from "../context";
import FocusManager from "@ncpl-polaris/components/FocusManager";
import PortalsManager from "@ncpl-polaris/components/PortalsManager";
import { I18n, StickyManager, ScrollLockManager } from "@ncpl-polaris/utils";
import { useMediaQuery } from "@vueuse/core";

defineOptions({
  name: 'NpAppProvider',
})

const props = defineProps<AppProviderProps>();


const setBodyStyles = () => {
  document.body.style.backgroundColor = 'var(--p-color-bg-app)';
  document.body.style.color = 'var(--p-color-text)';
};

const setRootAttributes = () => {

};

const breakpoints = {
  // TODO: Update to smDown
  navigationBarCollapsed: "767.95px",
  // TODO: Update to lgDown
  stackedContent: "1039.95px",
};

const isNavigationCollapsed = useMediaQuery(
  `(max-width: ${breakpoints.navigationBarCollapsed})`
);

const i18n = computed(() => {
  return new I18n(props.i18n || []);
})


const stickyManager = new StickyManager();
const scrollLockManager = new ScrollLockManager();


i18nContext.provide(i18n);
featuresContext.provide({
  ...props.features,
  polarisSummerEditions2023: props.features?.polarisSummerEditions2023 ?? false,
  polarisSummerEditions2023ShadowBevelOptOut:
    props.features?.polarisSummerEditions2023ShadowBevelOptOut ?? false,
})
mediaQueryContext.provide(
  reactive({
    isNavigationCollapsed,
  })
);

stickyManagerContext.provide(stickyManager);
scrollLockManagerContext.provide(scrollLockManager);

onMounted(() => {
  stickyManager.setContainer(document);
  setBodyStyles();
  setRootAttributes();
});
</script>
<template>
  <PortalsManager>
    <FocusManager>
      <slot></slot>
    </FocusManager>
  </PortalsManager>
</template>
<style lang="scss">
@import "./AppProvide.scss";
@import "./global.scss";
</style>
