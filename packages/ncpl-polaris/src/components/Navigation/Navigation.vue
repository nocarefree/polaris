<template>
  <nav :class="styles.Navigation" :aria-labelledby="ariaLabelledBy">
    <div v-if="$slots.contextControl" :class="styles.ContextControl">
      <slot name="contextControl"></slot>
    </div>
    <div v-else-if="logo && 'url' in logo"
      :class="classNames(styles.LogoContainer, $slots.logoSuffix && styles.hasLogoSuffix,)">
      <UnstyledLink :url="logo.url || ''" :class="styles.LogoLink" :style="{ width }">
        <Image :source="logo.topBarSource || ''" :alt="logo.accessibilityLabel || ''" :class="styles.Logo"
          :style="{ width }" />
      </UnstyledLink>
      <slot name="logoSuffix"></slot>
    </div>
    <Scrollable :class="styles.PrimaryNavigation">
      <slot></slot>
    </Scrollable>
  </nav>
</template>
<script setup lang="ts">
import { reactive, toRef } from "vue";
import Scrollable from "@ncpl-polaris/components/Scrollable"
import UnstyledLink from "@ncpl-polaris/components/UnstyledLink"
import Image from "@ncpl-polaris/components/Image"
import type { NavigationProps } from './Navigation'
import styles from './Navigation.module.scss'

import { navigationContext, withinContentContext, useFrame } from "../context";
import { getWidth, classNames } from "@ncpl-polaris/utils"

defineOptions({
  name: 'NpNavigation',
})

defineEmits(['dismiss'])
const props = defineProps<NavigationProps>();


const { logo } = useFrame();
const width = getWidth(logo, 104);

const navigationProvide = reactive({
  location: toRef(props, 'location'),
  onDismiss: toRef(props, 'onDismiss'),
});

navigationContext.provide(navigationProvide);
withinContentContext.provide();
</script>
