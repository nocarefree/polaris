<template>
  <div :class="classNames(
    styles.Banner,
    shouldShowFocus && styles.keyFocused,
    withinContentContainer ? styles.withinContentContainer : styles.withinPage,
  )" :tabindex="0" ref="wrapperRef" :role="tone === 'warning' || tone === 'critical' ? 'alert' : 'status'"
    :aria-live="stopAnnouncements ? 'off' : 'polite'" @mouseup="handleMouseUp" @keyup="handleKeyUp" @blur="handleBlur">

    <component :is="layoutComponent" :background-color="bannerColors.background" :text-color="bannerColors.text">
      <slot></slot>
      <template v-if="!hideIcon" #bannerIcon>
        <span :class="styles[bannerColors.icon]">
          <Icon :source="icon ?? bannerAttributes[bannerTone].icon" />
        </span>
      </template>
      <template v-if="title" #bannerTitle>
        <Text as="h2" variant="headingSm" break-word>
          {{ title }}
        </Text>
      </template>
      <template v-if="action || secondaryAction" #actionButtons>
        <ButtonGroup>
          <Button v-if="action" @click="action.onAction" v-bind="action">
            {{ action.content }}
          </Button>
          <Button v-if="secondaryAction" @click="secondaryAction.onAction" v-bind="secondaryAction">
            {{ secondaryAction.content }}
          </Button>
        </ButtonGroup>
      </template>
      <template v-if="dismissable">
        <Button variant="tertiary" @click="$emit('dismiss')"
          :accessibility-label="i18n.translate('Polaris.Banner.dismissButton')">
          <template #icon>
            <span :class="styles[isInlineIconBanner ? 'icon-secondary' : bannerColors.icon]">
              <Icon :source="CancelMinor" />
            </span>
          </template>
        </Button>
      </template>
    </component>
  </div>
</template>
<script setup lang="ts">
import { provide, computed, unref } from 'vue';
import Text from '../Text';
import Icon from '../Icon';
import Button from "../Button";
import ButtonGroup from "../ButtonGroup";
import WithinContentContainerBanner from "./WithinContentContainerBanner.vue";
import InlineIconBanner from "./InlineIconBanner.vue";
import DefaultBanner from "./DefaultBanner.vue";
import { classNames } from '@ncpl-polaris/utils';
import { useI18n, bannerContextKey, withinContentContext } from "../context"
import type { BannerProps } from "./Banner";
import { useBannerFocus, bannerAttributes } from "./utils";
import {
  CancelMinor,
} from "@ncpl/ncpl-icons";

import styles from "./Banner.module.scss";

defineOptions({
  name: "NpBanner",
});
defineEmits(['dismiss']);
const props = withDefaults(defineProps<BannerProps>(), { tone: 'info' })
const i18n = useI18n();
const { wrapperRef, handleKeyUp, handleBlur, handleMouseUp, shouldShowFocus } = useBannerFocus();
const _withinContentContext = withinContentContext.inject()
const withinContentContainer = computed(() => unref(_withinContentContext))

const bannerTone = computed(() => Object.keys(bannerAttributes).includes(props.tone) ? props.tone : 'info');

const bannerColors = computed(() => bannerAttributes[bannerTone.value][withinContentContainer.value ? 'withinContentContainer' : 'withinPage']);

const isInlineIconBanner = computed(() => !props.title && !withinContentContainer.value);

const layoutComponent = computed(() => {
  if (withinContentContainer.value) {
    return WithinContentContainerBanner;
  }
  if (isInlineIconBanner.value) {
    return InlineIconBanner;
  }

  return DefaultBanner;
})

provide(bannerContextKey, true);


defineExpose({
  focus: () => {
    wrapperRef.value?.focus();
    shouldShowFocus.value = false;
  }
});

</script>
