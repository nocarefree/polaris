import type {
  ColorBackgroundAlias,
  ColorIconAlias,
  ColorTextAlias,
} from '@shopify/polaris-tokens';
import {
  AlertDiamondIcon,
  InfoIcon,
  AlertTriangleIcon,
  CheckIcon,
} from '@ncpl/ncpl-icons';
import { ref } from 'vue';

import type { IconSource } from '../types';

import type { BannerTone } from './Banner';

interface BannerColorAliases {
  background: ColorBackgroundAlias;
  text: ColorTextAlias;
  icon: ColorIconAlias | ColorTextAlias;
}

interface BannerAttributes {
  withinPage: BannerColorAliases;
  withinContentContainer: BannerColorAliases;
  icon: IconSource;
}

export const bannerAttributes: { [key in BannerTone]: BannerAttributes } = {
  success: {
    withinPage: {
      background: 'bg-fill-success',
      text: 'text-success-on-bg-fill',
      icon: 'text-success-on-bg-fill',
    },
    withinContentContainer: {
      background: 'bg-surface-success',
      text: 'text-success',
      icon: 'text-success',
    },
    icon: CheckIcon,
  },
  warning: {
    withinPage: {
      background: 'bg-fill-warning',
      text: 'text-warning-on-bg-fill',
      icon: 'text-warning-on-bg-fill',
    },
    withinContentContainer: {
      background: 'bg-surface-warning',
      text: 'text-warning',
      icon: 'text-warning',
    },
    icon: AlertTriangleIcon,
  },
  critical: {
    withinPage: {
      background: 'bg-fill-critical',
      text: 'text-critical-on-bg-fill',
      icon: 'text-critical-on-bg-fill',
    },
    withinContentContainer: {
      background: 'bg-surface-critical',
      text: 'text-critical',
      icon: 'text-critical',
    },
    icon: AlertDiamondIcon,
  },
  info: {
    withinPage: {
      background: 'bg-fill-info',
      text: 'text-info-on-bg-fill',
      icon: 'text-info-on-bg-fill',
    },
    withinContentContainer: {
      background: 'bg-surface-info',
      text: 'text-info',
      icon: 'text-info',
    },
    icon: InfoIcon,
  },
};



export function useBannerFocus() {
  const wrapperRef = ref<HTMLDivElement>();
  const shouldShowFocus = ref(false);

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.target === wrapperRef.value) {
      shouldShowFocus.value = true;
    }
  };

  const handleBlur = () => shouldShowFocus.value = false;
  const handleMouseUp = (event: MouseEvent) => {
    (event.currentTarget as HTMLDivElement).blur();
    shouldShowFocus.value = false;
  };

  return {
    wrapperRef,
    handleKeyUp,
    handleBlur,
    handleMouseUp,
    shouldShowFocus,
  };
}
