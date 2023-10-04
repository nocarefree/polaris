<template>
  <div :class="className" :tabIndex="0" ref="wrapperRef" :role="icon.ariaRoleType"
    :aria-live="stopAnnouncements ? 'off' : 'polite'">
    <div :class="styles.Dismiss">
      <Button plain :icon="CancelSmallMinor" @click="$emit('dismiss')"
        :accessibilityLabel="i18n.translate('Polaris.Banner.dismissButton')" />
    </div>
    <Box paddingInlineEnd="4">
      <Icon :source="iconName" :color="icon.iconColor" />
    </Box>

    <div :class="styles.ContentWrapper">
      <Text v-if="title">{{ title }}</Text>
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { provide, computed, ref } from 'vue';
import Text from '@ncpl-polaris/components/Text';
import Icon from '@ncpl-polaris/components/Icon';
import { classNames, variationName } from '@ncpl-polaris/utils';
import { useI18n, bannerContextKey } from "../context"
import type { BannerProps, BannerAttributes } from "./Banner";
import {
  CancelSmallMinor,
  CircleTickMajor,
  CircleInformationMajor,
  CircleAlertMajor,
  DiamondAlertMajor,
} from "@ncpl/ncpl-icons";

import styles from "./Banner.module.scss";

defineOptions({
  name: "NpBanner",
});
const props = defineProps<BannerProps>()
const i18n = useI18n();

provide(bannerContextKey, true);

const useBannerAttributes = (
  status: BannerProps["status"]
): BannerAttributes => {
  switch (status) {
    case "success":
      return {
        defaultIcon: CircleTickMajor,
        iconColor: "success",
        ariaRoleType: "status",
      };

    case "info":
      return {
        defaultIcon: CircleInformationMajor,
        iconColor: "highlight",
        ariaRoleType: "status",
      };

    case "warning":
      return {
        defaultIcon: CircleAlertMajor,
        iconColor: "warning",
        ariaRoleType: "alert",
      };

    case "critical":
      return {
        defaultIcon: DiamondAlertMajor,
        iconColor: "critical",
        ariaRoleType: "alert",
      };

    default:
      return {
        defaultIcon: CircleInformationMajor,
        iconColor: "base",
        ariaRoleType: "status",
      };
  }
}

defineEmits(['dismiss']);
const wrapperRef = ref(null);
const icon = computed(() => {
  return useBannerAttributes(props.status);
})

const iconName = computed(() => {
  return props.icon || icon.value;
});

const className = computed(() =>
  classNames(
    styles.Banner,
    status &&
    styles[variationName('status', status)],
    //   dismiss && styles.hasDismiss,
    // shouldShowFocus && styles.keyFocused,
    // withinContentContainer ? styles.withinContentContainer : styles.withinPage,
  )
)
</script>
