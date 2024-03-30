<template>
  <div :class="styles.TopBar">
    <div :class="styles.Container">
      <div :class="styles.LeftContent">
        <button v-if="showNavigationToggle" type="button" :class="classNames(
    styles.NavigationIcon,
    focused && styles.focused,
  )" ref="toggleButton" @click="$emit('navigationToggle')"
          :aria-label="i18n.translate('Polaris.TopBar.toggleMenuLabel')">
          <div :class="styles.IconWrapper">
            <Icon :source="MenuIcon" />
          </div>
        </button>
        <div v-if="$slots.ContextControl" :class="styles.ContextControl">
          <slot name="contextControl"></slot>
        </div>
        <div v-else-if="logo" :class="classNames(
    styles.LogoContainer,
    showNavigationToggle || $slots.searchField
      ? styles.LogoDisplayControl
      : styles.LogoDisplayContainer,
    $slots.logoSuffix && styles.hasLogoSuffix,
  )">
          <UnstyledLink :url="logo.url || ''" :class="styles.LogoLink" :style="{ width }">
            <Image :source="logo.topBarSource || ''" :alt="logo.accessibilityLabel || ''" :class="styles.Logo"
              :style="{ width }" />
          </UnstyledLink>
          <slot name="logoSuffix"></slot>
        </div>
      </div>
      <div :class="styles.Search">
        <template v-if="$slots.searchField">
          <slot name="searchField"></slot>
          <Search :visible="searchResultsVisible" @dismiss="$emit('searchResultsDismiss')"
            :overlay-visible="searchResultsOverlayVisible">
            <slot name="searchResults"></slot>
          </Search>
        </template>
      </div>
      <div :class="styles.RightContent">
        <div :class="styles.SecondaryMenu">
          <slot name="secondaryMenu"></slot>
        </div>
        <slot name="userMenu"></slot>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { TopBarProps } from './TopBar'
import Search from "./Search"
import Icon from "../Icon"
import UnstyledLink from "../UnstyledLink"
import Image from "../Image"
import { MenuIcon } from "@ncpl/ncpl-icons"
import styles from './TopBar.module.css'
import { useFocus } from "@vueuse/core"
import { useI18n, useFrame } from "../context"
import { classNames, getWidth } from "../../utils"

defineOptions({
  name: 'NpTopBar',
})
defineProps<TopBarProps>()

defineEmits(['searchResultsDismiss', 'navigationToggle'])

const toggleButton = ref();
const i18n = useI18n();
const { logo } = useFrame();
const { focused } = useFocus(toggleButton);

const width = getWidth(logo, 104);

</script>
