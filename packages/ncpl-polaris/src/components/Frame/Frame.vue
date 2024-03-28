<template>
  <div :class="classNames(
    styles.Frame,
    $slots.navigation && styles.hasNav,
    $slots.topBar && styles.hasTopBar,
    $slots.sidebar && styles.hasSidebar,
  )">
    <div :class="skipClassName">
      <a :href="`#${skipUrl}`" @click="handleClick" @blur="handleBlur" @focus="handleFocus">{{
    i18n.translate('Polaris.Frame.skipToContent') }}</a>
    </div>
    <div v-if="$slots.topBar" id="AppFrameTopBar" :class="styles.TopBar"
      :="{ ...dataPolarisTopBar.props, ...layer.props }">
      <slot name="topBar"></slot>
    </div>
    <TrapFocus v-if="$slots.navigation" :trapping="mobileNavShowing">
      <CSSTransition :in="showMobileNavigation" :node-ref="navigationNode" :classNames="navTransitionClasses"
        :timeout="parseInt(theme.motion['motion-duration-300'], 10)">
        <div id="AppFrameNav" ref="navigationNode" :class="navClassName" v-bind="mobileNavAttributes"
          @keydown.escape="e => $emit('update:showMobileNavigation', false)">
          <slot name="navigation"></slot>
          <button type="button" :class="styles.NavigationDismiss"
            :aria-hidden="mobileNavHidden || (!mediaQuery.isNavigationCollapsed && !showMobileNavigation)"
            :aria-label="i18n.translate('Polaris.Frame.Navigation.closeMobileNavigationLabel')" :tabindex="tabIndex"
            @click="e => $emit('update:showMobileNavigation', false)">
            <Icon :source="XIcon"></Icon>
          </button>
        </div>
      </CSSTransition>
    </TrapFocus>
    <CSSAnimation :in="showContextualSaveBar" :class="styles.ContextualSaveBar" type="fade">
      <ContextualSaveBar v-bind="contextualSaveBarProps"></ContextualSaveBar>
    </CSSAnimation>
    <div v-if="state.loadingStack > 0" :class="styles['LoadingBar']" id="AppFrameLoadingBar">
      <LoadingBar></LoadingBar>
    </div>
    <Backdrop v-if="showMobileNavigation && mediaQuery.isNavigationCollapsed" below-navigation
      @click="e => $emit('update:showMobileNavigation', false)"></Backdrop>
    <main :class="styles.Main" id="AppFrameMain" :data-has-global-ribbon="Boolean($slots.globalRibbon)">
      <div :class="styles.Content">
        <slot></slot>
      </div>
    </main>
    <div v-if="$slots.globalRibbon" :class="styles['GlobalRibbonContainer']" ref="globalRibbonContainer">
      <slot name="globalRibbon"></slot>
    </div>
    <ToastManager :toastMessages="toastMessages" />
  </div>
</template>
<script setup lang="ts">

import {
  ref,
  toRef,
  computed,
  onMounted,
  onUpdated,
  reactive
} from "vue";
import { useI18n, useMediaQuery, frameContext, useTheme } from "../context";
import { classNames, setRootProperty } from "../../utils";
import type { AttrsType } from "../types";
import { dataPolarisTopBar, layer } from "../shared";
import type { FrameProps, ToastPropsWithID, ToastID } from "./Frame";
import CSSAnimation from "./CSSAnimation/CSSAnimation.vue";
import { XIcon } from "@ncpl/ncpl-icons";
import Icon from "../Icon";
import TrapFocus from "../TrapFocus";
import Backdrop from "../Backdrop";
import CSSTransition from "../CSSTransition";
import ContextualSaveBar from "./ContextualSaveBar/ContextualSaveBar.vue";
import LoadingBar from "./Loading/Loading.vue";
import ToastManager from "./ToastManager/ToastManager.vue";
import styles from "./Frame.module.scss";
import { useEventListener } from '@vueuse/core';

defineOptions({
  name: "NpFrame",
});

const props = defineProps<FrameProps>();
const slots = defineSlots();
defineEmits(["update:showMobileNavigation"]);

const theme = useTheme();
const showContextualSaveBar = ref(false);
const contextualSaveBarProps = ref<AttrsType>({})
const i18n = useI18n();
const mediaQuery = useMediaQuery();
const state = reactive<{
  skipFocused?: boolean;
  globalRibbonHeight: number;
  loadingStack: number;
  toastMessages: ToastPropsWithID[];
  showContextualSaveBar: boolean;
}>({
  skipFocused: false,
  globalRibbonHeight: 0,
  loadingStack: 0,
  toastMessages: [],
  showContextualSaveBar: false,
})

const navTransitionClasses = {
  enter: classNames(styles['Navigation-enter']),
  enterActive: classNames(styles['Navigation-enterActive']),
  enterDone: classNames(styles['Navigation-enterActive']),
  exit: classNames(styles['Navigation-exit']),
  exitActive: classNames(styles['Navigation-exitActive']),
};


const navClassName = computed(() => classNames(
  styles.Navigation,
  props.showMobileNavigation && styles['Navigation-visible'],
));

const skipClassName = computed(() => classNames(
  styles.Skip,
  state.skipFocused && styles.focused,
));

const mobileNavAttributes = computed(() => {
  return {
    ...(mobileNavShowing.value && {
      'aria-modal': true,
      role: 'dialog',
    }),
    ariaLabel: i18n.value.translate('Polaris.Frame.navigationLabel'),
    hidden: mobileNavHidden.value,
  }
});

const mobileNavHidden = computed(() => {
  return mediaQuery.isNavigationCollapsed && !props.showMobileNavigation
});
const mobileNavShowing = computed(() => {
  return mediaQuery.isNavigationCollapsed && props.showMobileNavigation;
});

const tabIndex = computed(() => {
  return mobileNavShowing.value ? 0 : -1;
});

const globalRibbonContainer = ref<HTMLElement>();
const toastMessages = ref<ToastPropsWithID[]>([]);
const navigationNode = ref<HTMLElement>();

const skipUrl = computed(() => {
  return props.skipToContentTarget
    ? props.skipToContentTarget.id
    : "AppFrameMain";
});


const handleClick = (e: Event) => {
  let { skipToContentTarget: t } = props;
  t && (t.focus(), null == e || e.preventDefault());
};

const setGlobalRibbonHeight = () => {
  if (globalRibbonContainer.value) {
    state.globalRibbonHeight = globalRibbonContainer.value.offsetHeight;
    setGlobalRibbonRootProperty();
  }
}

const setOffset = () => {
  const { offset = '0px' } = props;
  setRootProperty('--pc-frame-offset', offset);
};

const setGlobalRibbonRootProperty = () => {
  const globalRibbonHeight = state.globalRibbonHeight;
  setRootProperty(
    '--pc-frame-global-ribbon-height',
    `${globalRibbonHeight}px`,
  );
};

const handleResize = () => {
  if (slots.globalRibbonn) {
    setGlobalRibbonRootProperty();
  }
};

const handleFocus = () => {
  state.skipFocused = true;
};

const handleBlur = () => {
  state.skipFocused = false;
};


frameContext.provide({
  logo: toRef(props, 'logo'),
  setContextualSaveBar: (e: any) => {
    contextualSaveBarProps.value = e;
    showContextualSaveBar.value = true;
  },
  removeContextualSaveBar: () => {
    showContextualSaveBar.value = false;
  },
  showToast: (e: ToastPropsWithID) => {
    toastMessages.value = toastMessages.value.find((i) => {
      return i.id == e.id || i.id == e.id;
    })
      ? [...toastMessages.value]
      : [...toastMessages.value, e];
  },
  hideToast: (e: ToastID) => {
    toastMessages.value = toastMessages.value.filter((i) => {
      return i.id != e.id;
    });
  },
  startLoading: () => {
    state.loadingStack += 1;
  },
  stopLoading: () => {
    state.loadingStack = Math.max(0, state.loadingStack - 1);
  },
});

useEventListener(document, 'resize', handleResize)

onMounted(() => {
  handleResize();
  if (slots.globalRibbon) {
    return;
  }
  setGlobalRibbonRootProperty();
  setOffset();
})

onUpdated(() => {
  setGlobalRibbonHeight();
  setOffset();
})
</script>./ToastManager/types
