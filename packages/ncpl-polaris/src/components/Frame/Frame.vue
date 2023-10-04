<template>
  <div :class="classNames(
    styles.Frame,
    $slots.navigation && styles.hasNav,
    $slots.topBar && styles.hasTopBar,
    $slots.sidebar && styles.hasSidebar,
  )">
    <div :class="skipClassName">
      <a :href="`#${skipUrl}`" @click="handleClick" @blur="skipFocused = false" @focus="skipFocused = true">{{
        i18n.translate('Polaris.Frame.skipToContent') }}</a>
    </div>
    <div v-if="$slots.topBar" id="AppFrameTopBar" :class="styles.TopBar"
      :="{ ...dataPolarisTopBar.props, ...layer.props }">
      <slot name="topBar"></slot>
    </div>
    <TrapFocus v-if="$slots.navigation" :trapping="mobileNavShowing">
      <CSSTransition :in="showMobileNavigation" :node-ref="navigationNode" :classNames="navTransitionClasses"
        :timeout="parseInt(motion['motion-duration-300'], 10)">
        <div id="AppFrameNav" ref="navigationNode" :class="navClassName" v-bind="mobileNavAttributes"
          @keydown.escape="e => $emit('update:showMobileNavigation', false)">
          <slot name="navigation"></slot>
          <button type="button" :class="styles.NavigationDismiss"
            :aria-hidden="mobileNavHidden || (!mediaQuery.isNavigationCollapsed && !showMobileNavigation)"
            :aria-label="i18n.translate('Polaris.Frame.Navigation.closeMobileNavigationLabel')" :tabIndex="tabIndex"
            @click="e => $emit('update:showMobileNavigation', false)">
            <Icon :source="MobileCancelMajor"></Icon>
          </button>
        </div>
      </CSSTransition>
    </TrapFocus>
    <CSSAnimation :in="showContextualSaveBar" :class="styles.ContextualSaveBar" type="fade">
      <ContextualSaveBar v-bind="contextualSaveBarProps"></ContextualSaveBar>
    </CSSAnimation>
    <div v-if="loadingStack > 0" :class="styles['LoadingBar']" id="AppFrameLoadingBar">
      <LoadingBar></LoadingBar>
    </div>
    <Backdrop v-if="showMobileNavigation && mediaQuery.isNavigationCollapsed" below-navigation
      @click="e => $emit('update:showMobileNavigation', false)"></Backdrop>
    <main :class="styles['Main']" id="AppFrameMain" :data-has-global-ribbon="globalRibbon">
      <div :class="styles['Content']">
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
  onUpdated
} from "vue";
import { useI18n, useMediaQuery, frameContext } from "../context"
import { classNames, setRootProperty } from "@ncpl-polaris/utils"
import type { AttrsType } from "@ncpl-polaris/components/types"
import { dataPolarisTopBar, layer } from "@ncpl-polaris/components/shared"
import { frameProps } from "./Frame"
import CSSAnimation from "./CSSAnimation/CSSAnimation.vue"
import { motion } from '@shopify/polaris-tokens';
import { MobileCancelMajor } from "@ncpl/ncpl-icons";
import Icon from "@ncpl-polaris/components/Icon";
import TrapFocus from "@ncpl-polaris/components/TrapFocus";
import Backdrop from "@ncpl-polaris/components/Backdrop";
import CSSTransition from "@ncpl-polaris/components/CSSTransition";
import ContextualSaveBar from "./ContextualSaveBar/ContextualSaveBar.vue";
import LoadingBar from "./Loading/Loading.vue";
import ToastManager from "./ToastManager/ToastManager.vue";
import styles from "./Frame.module.scss";
import type { ToastMessage } from "./ToastManager/ToastManager"
import { useEventListener } from '@vueuse/core'

defineOptions({
  name: "NpFrame",
});

const props = defineProps(frameProps);
const slots = defineSlots();
defineEmits(["update:showMobileNavigation"]);



const showContextualSaveBar = ref(false);
const contextualSaveBarProps = ref<AttrsType>({})
const skipFocused = ref(false);
const i18n = useI18n();
const mediaQuery = useMediaQuery();

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
  skipFocused.value && styles.focused,
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

const loadingStack = ref(0);
const toastMessages = ref<ToastMessage[]>([]);
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

const setOffset = () => {
  const { offset = '0px' } = props;
  setRootProperty('--pc-frame-offset', offset);
};

const setGlobalRibbonRootProperty = () => {
  if (globalRibbonContainer.value) {
    setRootProperty(
      '--pc-frame-global-ribbon-height',
      `${globalRibbonContainer.value.offsetHeight}px`,
    );
  }
};

const handleResize = () => {
  if (slots.globalRibbonn) {
    setGlobalRibbonRootProperty();
  }
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
  showToast: (e: ToastMessage) => {
    toastMessages.value = toastMessages.value.find((i) => {
      return i.id == e.id || i.id == e.id;
    })
      ? [...toastMessages.value]
      : [...toastMessages.value, e];
  },
  hideToast: (e: ToastMessage) => {
    toastMessages.value = toastMessages.value.filter((i) => {
      return i.id != e.id;
    });
  },
  startLoading: () => {
    loadingStack.value += 1;
  },
  stopLoading: () => {
    loadingStack.value = Math.max(0, loadingStack.value - 1);
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
  setGlobalRibbonRootProperty();
  setOffset();
})
</script>
