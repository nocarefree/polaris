<script setup lang="ts">
import { reactive, onMounted, computed, nextTick } from "vue";
import type { AppProviderProps } from "./AppProvider"
import { routerContext, i18nContext, mediaQueryContext, stickyManagerContext, scrollLockManagerContext, featuresContext, themeContext } from "../context";
import FocusManager from "@ncpl-polaris/components/FocusManager";
import PortalsManager from "@ncpl-polaris/components/PortalsManager";
import { I18n, StickyManager, ScrollLockManager } from "@ncpl-polaris/utils";
import { useMediaQuery } from "@vueuse/core";
import {
  createThemeClassName,
  themeNameDefault,
  themeNames,
} from '@shopify/polaris-tokens';

defineOptions({
  name: 'NpAppProvider',
})

const props = defineProps<AppProviderProps>();


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
const theme = computed(() => {
  return props.theme || themeNameDefault;
})

if (props.router) {
  routerContext.provide();
}

themeContext.provide(theme);
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

const setBodyStyles = () => {
  document.body.style.backgroundColor = 'var(--p-color-bg-app)';
  document.body.style.color = 'var(--p-color-text)';
};

const setRootAttributes = () => {
  const activeThemeName = theme.value;

  themeNames.forEach((themeName: any) => {
    document.documentElement.classList.toggle(
      createThemeClassName(themeName),
      themeName === activeThemeName,
    );
  });

  //document.documentElement.classList.add(classNamePolarisSummerEditions2023);
};


const MAX_SCROLLBAR_WIDTH = 20;
const SCROLLBAR_TEST_ELEMENT_PARENT_SIZE = 30;
const SCROLLBAR_TEST_ELEMENT_CHILD_SIZE =
  SCROLLBAR_TEST_ELEMENT_PARENT_SIZE + 10;

function measureScrollbars() {
  const parentEl = document.createElement('div');
  parentEl.setAttribute(
    'style',
    `position: absolute; opacity: 0; transform: translate3d(-9999px, -9999px, 0); pointer-events: none; width:${SCROLLBAR_TEST_ELEMENT_PARENT_SIZE}px; height:${SCROLLBAR_TEST_ELEMENT_PARENT_SIZE}px;`,
  );

  const child = document.createElement('div');
  child.setAttribute(
    'style',
    `width:100%; height: ${SCROLLBAR_TEST_ELEMENT_CHILD_SIZE}; overflow:scroll; scrollbar-width: thin;`,
  );
  parentEl.appendChild(child);
  document.body.appendChild(parentEl);

  const scrollbarWidth =
    SCROLLBAR_TEST_ELEMENT_PARENT_SIZE -
    (parentEl.firstElementChild?.clientWidth ?? 0);

  const scrollbarWidthWithSafetyHatch = Math.min(
    scrollbarWidth,
    MAX_SCROLLBAR_WIDTH,
  );

  document.documentElement.style.setProperty(
    '--pc-app-provider-scrollbar-width',
    `${scrollbarWidthWithSafetyHatch}px`,
  );

  document.body.removeChild(parentEl);
}


onMounted(() => {
  if (document) {
    stickyManager.setContainer(document);
    setBodyStyles();
    setRootAttributes();

    const isSafari16 =
      navigator.userAgent.includes('Safari') &&
      !navigator.userAgent.includes('Chrome') &&
      (navigator.userAgent.includes('Version/16.1') ||
        navigator.userAgent.includes('Version/16.2') ||
        navigator.userAgent.includes('Version/16.3'));

    if (isSafari16) {
      document.documentElement.classList.add(
        'Polaris-Safari-16-Font-Optical-Sizing-Patch',
      );
    }
  }

  nextTick(measureScrollbars)
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
