import { inject, provide, computed, unref, watch, onBeforeUnmount } from "vue";
import type {
  InjectionKey,
  Ref,
  UnwrapNestedRefs,
  Component,
  MaybeRef,
  ComputedRef,
} from "vue";

import type { StickyManager, ScrollLockManager, I18n } from "../utils"
import { scrollable } from "./shared";

export const routerContextKey: InjectionKey<boolean> = Symbol(
  "routerContextKey"
);
export const routerContext = {
  inject: () => {
    return inject(routerContextKey, false);
  },
  provide: (value: boolean = true) => {
    provide(routerContextKey, value);
  },
}

//theme
import type { ThemeName, Theme } from '@shopify/polaris-tokens';
import { themes } from '@shopify/polaris-tokens';

export function getTheme(themeName: ThemeName): Theme {
  return themes[themeName];
}

export const themeContextKey: InjectionKey<ComputedRef<Theme>> = Symbol(
  "themeContextKey"
);

export const themeContext = {
  inject: () => {
    return inject(themeContextKey);
  },
  provide: (themeName: ComputedRef<ThemeName>) => {
    provide(themeContextKey, computed(() => {
      return getTheme(themeName.value)
    }));
  },
};

export function useTheme() {
  const theme = themeContext.inject();

  if (!theme || !theme.value) {
    throw new Error(
      'No theme was provided. Your application must be wrapped in an <AppProvider> component. See https://polaris.shopify.com/components/app-provider for implementation instructions.',
    );
  }

  return theme;
}


//i18
export const i18nContextKey: InjectionKey<Ref<I18n>> =
  Symbol("i18nContextKey");

export const i18nContext = {
  inject: () => {
    return inject(i18nContextKey)
  },
  provide: (i18n: Ref<I18n>) => {
    provide(i18nContextKey, i18n);
  },
};

export function useI18n() {
  const i18n = i18nContext.inject();
  if (!i18n) {
    throw new Error('No i18n was provided.');
  }

  return i18n
}

//media
export type MediaQueryContext = UnwrapNestedRefs<{
  isNavigationCollapsed?: boolean;
}>;

export const mediaQueryContextKey: InjectionKey<MediaQueryContext> = Symbol(
  "mediaQueryContextKey"
);

export const mediaQueryContext = {
  inject: () => {
    return inject(mediaQueryContextKey);
  },
  provide: (value: MediaQueryContext) => {
    provide(mediaQueryContextKey, value);
  },
};

export function useMediaQuery() {
  const mediaQuery = mediaQueryContext.inject();
  if (!mediaQuery) {
    throw new Error('No MediaQuery was provided.');
  }

  return mediaQuery
}


//bannerContextKey
export type BannerContext = boolean;

export const bannerContextKey: InjectionKey<BannerContext> = Symbol(
  "bannerContextKey"
);

export const bannerContext = {
  inject: () => {
    return inject(bannerContextKey, false);
  },
  provide: (value: BannerContext) => {
    provide(bannerContextKey, value);
  },
};

//LinkContext
export type LinkContext = Component | undefined;

export const linkContextKey: InjectionKey<LinkContext> =
  Symbol("linkContextKey");

export const linkContext = {
  inject: () => {
    return inject(linkContextKey, undefined);
  },
  provide: (value: LinkContext) => {
    provide(linkContextKey, value);
  },
};

//FrameContext
import type { FrameLogo, ToastPropsWithID, ToastID } from "./Frame/Frame";

export type FrameContext = {
  logo: Ref<FrameLogo | undefined>;
  showToast: (e: ToastPropsWithID) => void;
  hideToast: (e: ToastID) => void;
  startLoading: () => void;
  stopLoading: () => void;
  setContextualSaveBar: (e: any) => void;
  removeContextualSaveBar: () => void;
};

export const frameContextKey: InjectionKey<FrameContext> =
  Symbol("frameContextKey");

export const frameContext = {
  inject: () => {
    return inject(frameContextKey);
  },
  provide: (value: FrameContext) => {
    provide(frameContextKey, value);
  },
};

export function useFrame() {
  const frame = frameContext.inject();
  if (!frame) {
    throw new Error('No FrameContext was provided.');
  }

  return frame
}

//NavigationContext
export type NavigationContext = UnwrapNestedRefs<{
  location: MaybeRef<string>;
  onDismiss?: () => void;
}>;

export const navigationContextKey: InjectionKey<NavigationContext> = Symbol(
  "navigationContextKey"
);

export const navigationContext = {
  inject: () => {
    return inject(navigationContextKey);
  },
  provide: (value: NavigationContext) => {
    provide(navigationContextKey, value);
  },
};

export function useNavigation() {
  const navigation = navigationContext.inject();

  if (!navigation) {
    throw new Error('No navigationContext was provided.');
  }
  return navigation;
}

//WithinContentContext
export const withinContentContextKey: InjectionKey<MaybeRef<boolean>> = Symbol("withinContentContextKey");

export const withinContentContext = {
  inject: () => {
    return inject(withinContentContextKey, false);
  },
  provide: (value = true) => {
    provide(withinContentContextKey, computed(() => {
      return unref(value);
    }));
  },
};

//ScrollableContext
export const scrollableContextKey: InjectionKey<() => void> = Symbol(
  "scrollableContextKey"
);
export const scrollableContext = {
  inject: () => {
    return inject(scrollableContextKey, () => { });
  },
  provide: (v: any) => {
    provide(scrollableContextKey, v);
  },
};

export function useScrollable() {
  return {
    scrollTo: () => {
      const _scrollTo = scrollableContext.inject();
      if (!_scrollTo) {
        throw new Error('No ScrollableContext was provided.');
      }
      return _scrollTo
    },
    forNode: (node: HTMLElement): HTMLElement | Document => {
      const closestElement = node.closest(scrollable.selector);
      return closestElement instanceof HTMLElement ? closestElement : document;
    }
  }
}

//ScrollLockManagerContext
export const scrollLockManagerContextKey: InjectionKey<ScrollLockManager> =
  Symbol("scrollLockManagerContextKey");
export const scrollLockManagerContext = {
  inject: () => {
    return inject(scrollLockManagerContextKey);
  },
  provide: (scrollLockManager: ScrollLockManager) => {
    provide(scrollLockManagerContextKey, scrollLockManager);
  },
};

export function useScrollLockManager() {
  const scrollLockManager = scrollLockManagerContext.inject();

  if (!scrollLockManager) {
    throw new Error('No ScrollLockManager was provided.');
  }
  return scrollLockManager;
}



//StickyManagerContext
export const stickyManagerContextKey: InjectionKey<StickyManager> = Symbol(
  "stickyManagerContextKey"
);
export const stickyManagerContext = {
  inject: () => {
    return inject(stickyManagerContextKey);
  },
  provide: (stickyManager: StickyManager) => {
    provide(stickyManagerContextKey, stickyManager);
  },
};

export const useStickyManager = () => {
  const stickManager = stickyManagerContext.inject();

  if (!stickManager) {
    throw new Error('No StickManager was provided.');
  }
  return stickManager;
};


//FeaturesContext
import type { FeaturesConfig } from "./AppProvider"

export type FeaturesContext = FeaturesConfig;

export const featuresContextKey: InjectionKey<FeaturesContext> = Symbol(
  "featuresContextKey"
);

export const featuresContext = {
  inject: () => {
    return inject(featuresContextKey);
  },
  provide: (value: FeaturesContext) => {
    provide(featuresContextKey, value);
  },
};
export function useFeatures() {
  const features = featuresContext.inject();

  if (!features) {
    throw new Error('No Features were provided.');
  }

  return features;
}

//PortalsManagerContext
export interface PortalsManagerContextType {
  container: Ref<HTMLElement | undefined>;
}

export const portalsManagerContextKey: InjectionKey<PortalsManagerContextType> = Symbol(
  "portalsManagerContextKey"
);

export const portalsManagerContext = {
  inject: () => {
    return inject(portalsManagerContextKey, null);
  },
  provide: (value: PortalsManagerContextType) => {
    provide(portalsManagerContextKey, value);
  },
};
export function usePortalsManager() {
  const portalsManager = portalsManagerContext.inject();

  if (!portalsManager) {
    throw new Error(
      'No portals manager was provided. Your application must be wrapped in an <AppProvider> component.',
    );
  }
  return portalsManager;
}

//WithinFilterContext
export const withinFilterContextKey: InjectionKey<Ref<boolean> | boolean> = Symbol(
  "withinFilterContextKey"
);;
export const WithinFilterContext = {
  inject: () => {
    return inject(withinFilterContextKey, false);
  },
  provide: (value: Ref<boolean> | boolean) => {
    provide(withinFilterContextKey, value);
  },
}
export function useWithinFilter() {
  const portal = WithinFilterContext.inject();
  return portal || false;
}

//IdContext
let idInjection = 0;
export const useId = (deterministicId?: MaybeRef<string | undefined>, prefix: string = 'ncpl'): Ref<string> => {
  const idRef = computed(
    () => {
      return unref(deterministicId) || `${prefix}-${idInjection++}`;
    }
  )
  return idRef
}


//FocusManagerContext
export interface FocusManagerContext {
  trapFocusList: Ref<string[]>;
  add: (id: string) => void;
  remove: (id: string) => boolean;
}

export const focusManagerContextKey: InjectionKey<FocusManagerContext> = Symbol(
  "focusManagerContextKey"
);
export const focusManagerContext = {
  inject: () => {
    return inject(focusManagerContextKey);
  },
  provide: (value: FocusManagerContext) => {
    provide(focusManagerContextKey, value);
  },
}

export function useFocusManager(trapping: Ref<boolean>) {
  const focusManager = focusManagerContext.inject();
  const id = useId();

  if (!focusManager) {
    throw new Error('No FocusManager was provided.');
  }

  const {
    trapFocusList,
    add: addFocusItem,
    remove: removeFocusItem,
  } = focusManager;

  watch(trapping, () => {
    trapping.value ? addFocusItem(id.value) : removeFocusItem(id.value);
  });

  onBeforeUnmount(() => {
    removeFocusItem(id.value);
  })

  return {
    canSafelyFocus: computed(() => {
      return trapFocusList.value[0] === id.value;
    })
  };
}

export interface ScrollContextType {
  scrollableContainer: HTMLElement | null;
  canScrollLeft: boolean;
  canScrollRight: boolean;
}
export const scrollContextKey: InjectionKey<MaybeRef<ScrollContextType>> = Symbol('scrollContextKey');
export const scrollContext = {
  inject() {
    return inject(scrollContextKey)
  },
  provide(value: MaybeRef<ScrollContextType>) {
    provide(scrollContextKey, value);
  },
}

interface DropZoneContextType {
  disabled: boolean;
  focused: boolean;
  measuring: boolean;
  allowMultiple: boolean;
  size: string;
  type: string;
}

import { defaultAllowMultiple } from "./DropZone/utils"

export const dropZoneContextKey: InjectionKey<MaybeRef<DropZoneContextType>> = Symbol('dropZoneContextKey');
export const dropZoneContext = {
  inject() {
    return computed(() => {
      let context = inject(dropZoneContextKey, {
        disabled: false,
        focused: false,
        size: 'extraLarge',
        type: 'file',
        measuring: false,
        allowMultiple: defaultAllowMultiple,
      })
      return unref(context)
    })
  },
  provide(value: MaybeRef<DropZoneContextType>) {
    provide(dropZoneContextKey, value);
  },
}


//IndexTableContext
import type { IndexTableProps, Range } from "./IndexTable/types";
export interface IndexTableContext extends IndexTableProps {
  itemCount: number;
  resourceName: {
    singular: string;
    plural: string;
  };
  selectMode: boolean;
  shouldShowBulkActions: boolean;
  bulkActionsAccessibilityLabel: string;
  bulkSelectState: boolean | 'indeterminate';
  paginatedSelectAllText: string;
  selectedItemsCount: number;
  selectionChange: (type: any, checked: boolean, id?: string | Range, index?: number) => void;
  paginatedSelectAllAction: {
    content: string;
    onAction: () => {};
  }
}

export const indexTableContextKey: InjectionKey<ComputedRef<any>> = Symbol(
  "indexTableContextKey"
);
export const indexTableContext = {
  inject: () => {
    return inject(indexTableContextKey);
  },
  provide: (value: ComputedRef<any>) => {
    provide(indexTableContextKey, value);
  },
}

export function useIndexTable() {
  const indexTable = indexTableContext.inject();

  if (!indexTable || !indexTable.value) {
    throw new Error('No IndexTable was provided.');
  }

  return indexTable as ComputedRef<IndexTableContext>
}

//IndexTableRowContext
export interface IndexTableRowContext {
  itemId?: string | number;
  selected?: boolean;
  disabled?: boolean;
  position?: number;
  onInteraction?: (event: MouseEvent | KeyboardEvent) => void;
}

export const indexTableRowContextKey: InjectionKey<ComputedRef<IndexTableRowContext>> = Symbol(
  "indexTableRowContextKey"
);
export const indexTableRowContext = {
  inject: () => {
    return inject(indexTableRowContextKey);
  },
  provide: (value: ComputedRef<IndexTableRowContext>) => {
    provide(indexTableRowContextKey, value);
  },
}

//filterActionsContext
export const filterActionsContextKey: InjectionKey<Ref<boolean>> = Symbol(
  "indexTableRowContextKey"
);
export const filterActionsContext = {
  inject: () => {
    return inject(filterActionsContextKey, computed(() => false));
  },
  provide: (value: ComputedRef<Ref<boolean>>) => {
    provide(filterActionsContextKey, computed(() => true));
  },
}


export function useIndexTableRow() {
  const indexTableRow = indexTableRowContext.inject();

  if (!indexTableRow || !indexTableRow.value) {
    throw new Error('No IndexTable was provided.');
  }

  return indexTableRow
}


import { themeDefault } from '@shopify/polaris-tokens';
import { useBreakpoints as baseUseBreakpoints } from "@vueuse/core"



const breakpoints = (() => {
  const options = Object.fromEntries(Object.entries(themeDefault.breakpoints).map(([key, value]: [string, string]) => {
    return [key.replace('breakpoints-', ''), value];
  }));

  const obj = baseUseBreakpoints(options)

  return {
    xsUp: obj.greaterOrEqual('xs'),
    xsDown: obj.smaller('xs'),
    xsOnly: obj.smaller('md'),

    smUp: obj.greaterOrEqual('sm'),
    smDown: obj.smaller('sm'),
    smOnly: obj.between('sm', 'md'),

    mdUp: obj.greaterOrEqual('md'),
    mdDown: obj.smaller('md'),
    mdOnly: obj.between('md', 'lg'),

    lgUp: obj.greaterOrEqual('lg'),
    lgDown: obj.smaller('lg'),
    lgOnly: obj.between('lg', 'xl'),

    xlUp: obj.greaterOrEqual('xl'),
    xlDown: obj.smaller('xl'),
    xlOnly: obj.greaterOrEqual('xl'),
  }
})();

export const useBreakpoints = () => {
  return breakpoints;
}