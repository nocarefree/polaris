<template>
  <div :class="styles.Outer">
    <Box :padding="{ md: '200' }">
      <TabMeasurer :tab-to-focus="state.tabToFocus" :selected="selected" :tabs="tabs"
        :sibling-tab-has-focus="state.tabToFocus > -1" @handleMeasurement="handleMeasurement">
        <template name="activator">
          <UnstyledButton type="button" :class="classNames(styles.DisclosureActivator)"
            @click="handleDisclosureActivatorClick"
            :aria-label="disclosureText ?? i18n.translate('Polaris.Tabs.toggleTabsLabel')" :disabled="disabled">
            <Text as="span" variant="bodySm" fontWeight="medium">
              {{ disclosureText ?? i18n.translate('Polaris.Tabs.toggleTabsLabel') }}
            </Text>
            <div :class="classNames(
              styles.IconWrap,
              disclosureActivatorVisible &&
              state.showDisclosure &&
              styles['IconWrap-open'],
            )">
              <Icon :source="ChevronDownIcon" tone="subdued" />
            </div>
          </UnstyledButton>
        </template>
      </TabMeasurer>
      <div :class="classNames(styles.Wrapper, canCreateNewView && styles.WrapperWithNewButton)" ref="scrollRef">
        <div :class="styles.ButtonWrapper" ref="wrapRef">
          <ul :role="computedTabs.length > 0 ? 'tablist' : undefined"
            :class="classNames(styles.Tabs, fitted && styles.fitted, disclosureActivatorVisible && styles.fillSpace)"
            @focus="handleFocus" @blur="handleBlur" @keydown="handleKeyDown" @keyup="handleKeyPress"
            data-tabs-focus-catchment>
            <Tab v-for="(tab, index) in computedTabs" v-bind="tab" :key="`${index}-${tab.id}`" :id="`tab_${tab.id}`"
              :panel-id="$slots.children ? (tab.panelId || `${tab.id}-panel`) : undefined"
              :disabled="disabled || tab.disabled" :sibling-tab-has-focus="state.tabToFocus > -1"
              :focused="index === state.tabToFocus" :selected="index === selected" @action="() => {
                handleTabClick(tab.id);
                tab.onAction?.();
              }" :accessibility-label="tab.accessibilityLabel" :url="tab.url" :content="tab.content"
              @toggleModal="(isOpen: boolean) => state.isTabModalOpen = isOpen"
              @togglePopover="(isOpen: boolean) => state.isTabPopoverOpen = isOpen"
              :view-names="tabs.map(({ content }) => content)"
              :ref="e => selectedTabRef = index === selected ? e : null" />
            <li v-if="!(mdDown || tabsToShow.length === 0)"
              :class="classNames(styles.DisclosureTab, disclosureActivatorVisible && styles['DisclosureTab-visible'])"
              role="presentation">
              <Popover preferred-position="below" preferred-alignment="left"
                :active="disclosureActivatorVisible && state.showDisclosure" @close="state.showDisclosure = false"
                autofocus-target="first-node">
                <template #activator>
                  <UnstyledButton type="button" :class="classNames(styles.DisclosureActivator)"
                    @click="handleDisclosureActivatorClick"
                    :aria-label="disclosureText ?? i18n.translate('Polaris.Tabs.toggleTabsLabel')" :disabled="disabled">
                    <Text as="span" variant="bodySm" font-weight="medium">
                      {{ disclosureText ?? i18n.translate('Polaris.Tabs.toggleTabsLabel') }}
                    </Text>
                    <div :class="classNames(
                      styles.IconWrap,
                      disclosureActivatorVisible &&
                      state.showDisclosure &&
                      styles['IconWrap-open'],
                    )">
                      <Icon :source="ChevronDownIcon" tone="subdued" />
                    </div>
                  </UnstyledButton>
                </template>
                <List :focus-index="state.hiddenTabs.indexOf(state.tabToFocus)" :disclosure-tabs="disclosureTabs"
                  @click="handleListTabClick" @keypress="handleKeyPress" />
              </Popover>
            </li>
          </ul>
          <div v-if="canCreateNewView && tabsToShow.length > 0" :class="styles.NewTab">
            <ConditionalWrapper :condition="!disabled" ref="createViewModalActivator">
              <template #wrapper="{ children }">
                <Tooltip :content="i18n.translate('Polaris.Tabs.newViewTooltip')" preferred-position="above"
                  :hover-delay="400">
                  <component :is="children"></component>
                </Tooltip>
              </template>
              <Tab :id="CREATE_NEW_VIEW_ID" :content="createViewA11yLabel" :actions="[]"
                @action="state.isNewViewModalActive = true" @focus="() => {
                  if (state.modalSubmitted) {
                    state.tabToFocus = props.selected;
                    state.modalSubmitted = false;

                  }
                }" :icon="() => h(Icon, { source: PlusIcon, accessibilityLabel: createViewA11yLabel })"
                :disabled="disabled" @togglePopover="(isOpen: boolean) => state.isTabPopoverOpen = isOpen"
                @toggleModal="(isOpen: boolean) => state.isTabModalOpen = isOpen" :tab-index-override="0"></Tab>
            </ConditionalWrapper>

            <CreateViewModal v-model:open="state.isNewViewModalActive" @clickPrimaryAction="handleSaveNewViewModal"
              :view-names="tabs.map(({ content }) => content)">
            </CreateViewModal>
          </div>
        </div>
      </div>
    </Box>

    <template v-for="(_tab, index) in tabs">
      <Panel v-if="selected === index" :id="_tab.panelId || `${_tab.id}-panel`" :tab-id="_tab.id">
        <slot></slot>
      </Panel>
      <Panel v-else :id="_tab.panelId || `${_tab.id}-panel`" :tab-id="_tab.id" hidden></Panel>
    </template>


  </div>
</template>
<script setup lang="ts">
import { ref, reactive, computed, h } from 'vue'
import { getVisibleAndHiddenTabIndices, type TabsProps } from './Tabs'
import type { TabMeasurements } from "./TabMeasurer"
import styles from './Tabs.module.scss'
import { useI18n, useBreakpoints } from '../context';
import Tab from './Tab';
import TabMeasurer from './TabMeasurer';
import List from './List';
import Panel from './Panel';
import CreateViewModal from './CreateViewModal';
import Icon from '../Icon';
import UnstyledButton from '../UnstyledButton';
import Text from '../Text';
import Box from '../Box';
import Popover from '../Popover';
import Tooltip from '../Tooltip';
import ConditionalWrapper from '../ConditionalWrapper';
import { ChevronDownIcon, PlusIcon } from "@ncpl/ncpl-icons"
import { classNames } from "@ncpl-polaris/utils"

const CREATE_NEW_VIEW_ID = 'create-new-view';

interface TabsState {
  disclosureWidth: number;
  tabWidths: number[];
  visibleTabs: number[];
  hiddenTabs: number[];
  containerWidth: number;
  showDisclosure: boolean;
  tabToFocus: number;
  isTabPopoverOpen: boolean;
  isTabModalOpen: boolean;
  isNewViewModalActive: boolean;
  modalSubmitted: boolean;
  isTabsFocused: boolean;
}

defineOptions({
  name: 'NpTabs',
})
const emit = defineEmits(['update:selected', 'createNewView'])
const props = defineProps<TabsProps>()
const i18n = useI18n();
const { mdDown } = useBreakpoints();
const selectedTabRef = ref();
const createViewModalActivator = ref();
const state = reactive<TabsState>({
  disclosureWidth: 0,
  containerWidth: Infinity,
  tabWidths: [],
  visibleTabs: [],
  hiddenTabs: [],
  showDisclosure: false,
  tabToFocus: -1,
  isNewViewModalActive: false,
  modalSubmitted: false,
  isTabsFocused: false,
  isTabPopoverOpen: false,
  isTabModalOpen: false,
})

const createViewA11yLabel = computed(() => props.newViewAccessibilityLabel || i18n.value.translate('Polaris.Tabs.newViewAccessibilityLabel'));

const tabsToShow = computed(() => mdDown.value ? [...state.visibleTabs, ...state.hiddenTabs] : state.visibleTabs);
const computedTabs = computed(() => tabsToShow.value.sort((tabA, tabB) => tabA - tabB).filter((tabIndex) => props.tabs[tabIndex]).map((tabIndex) => props.tabs[tabIndex]));
const disclosureActivatorVisible = computed(() => state.visibleTabs.length < props.tabs.length && !mdDown.value);
const disclosureTabs = computed(() => state.hiddenTabs.map((tabIndex) => props.tabs[tabIndex]));


const handleSaveNewViewModal = (value: string, done: () => {}) => {
  emit('createNewView', value, () => {
    done();
    state.modalSubmitted = true;
  })
};

const handleMeasurement = (measurements: TabMeasurements) => {
  const {
    hiddenTabWidths: tabWidths,
    containerWidth,
    disclosureWidth,
  } = measurements;

  const { visibleTabs, hiddenTabs } = getVisibleAndHiddenTabIndices(
    props.tabs,
    props.selected,
    disclosureWidth,
    tabWidths,
    containerWidth,
  );

  state.visibleTabs = visibleTabs;
  state.hiddenTabs = hiddenTabs;
  state.disclosureWidth = disclosureWidth;
  state.containerWidth = containerWidth;
  state.tabWidths = tabWidths;
}

const handleDisclosureActivatorClick = () => {
  state.showDisclosure = !state.showDisclosure;
  state.tabToFocus = state.hiddenTabs[0];
};
const handleTabClick = (id: string) => {
  const tab = props.tabs.find((aTab) => aTab.id === id);
  if (tab == null) {
    return null;
  }
  const selectedIndex = props.tabs.indexOf(tab);
  emit('update:selected', selectedIndex);
};

const handleFocus = (event: FocusEvent) => {
  const target = event.target as HTMLUListElement;
  const isItem = target.classList.contains(styles.Item);
  const isInNaturalDOMOrder = target.closest(`[data-tabs-focus-catchment]`) || isItem;

  const isDisclosureActivator = target.classList.contains(
    styles.DisclosureActivator,
  );

  if (isDisclosureActivator || !isInNaturalDOMOrder) {
    return;
  }

  state.isTabsFocused = true;
};

const handleBlur = (event: FocusEvent) => {
  const target = event.target as HTMLUListElement;
  const relatedTarget = event.relatedTarget as HTMLElement;
  const isInNaturalDOMOrder = relatedTarget?.closest?.(`.${styles.Tabs}`);
  const targetIsATab = target?.classList?.contains?.(styles.Tab);
  const focusReceiverIsAnItem = relatedTarget?.classList.contains(
    styles.Item,
  );

  if (
    !relatedTarget &&
    !state.isTabModalOpen &&
    !targetIsATab &&
    !focusReceiverIsAnItem
  ) {
    return state.tabToFocus = -1;
  }

  if (
    !isInNaturalDOMOrder &&
    !state.isTabModalOpen &&
    !targetIsATab &&
    !focusReceiverIsAnItem
  ) {
    return state.tabToFocus = -1;
  }

  state.isTabsFocused = false;
};

const handleKeyDown = (event: KeyboardEvent) => {
  if (state.isTabPopoverOpen || state.isTabModalOpen || state.isNewViewModalActive) {
    return;
  }
  const { key } = event;

  if (key === 'ArrowLeft' || key === 'ArrowRight') {
    event.preventDefault();
    event.stopPropagation();
  }
};


const handleKeyPress = (event: KeyboardEvent) => {
  const {
    showDisclosure,
    visibleTabs,
    hiddenTabs,
    tabToFocus,
    isNewViewModalActive,
    isTabModalOpen,
    isTabPopoverOpen
  } = state;
  if (isTabModalOpen || isTabPopoverOpen || isNewViewModalActive) {
    return;
  }
  const key = event.key;
  const tabsArrayInOrder =
    showDisclosure || mdDown
      ? visibleTabs.concat(hiddenTabs)
      : [...visibleTabs];

  let newFocus = tabsArrayInOrder.indexOf(tabToFocus);

  if (key === 'ArrowRight') {
    newFocus += 1;

    if (newFocus === tabsArrayInOrder.length) {
      newFocus = 0;
    }
  }

  if (key === 'ArrowLeft') {
    if (newFocus === -1 || newFocus === 0) {
      newFocus = tabsArrayInOrder.length - 1;
    } else {
      newFocus -= 1;
    }
  }

  const buttonToFocus = tabsArrayInOrder[newFocus];

  if (buttonToFocus != null) {
    state.tabToFocus = buttonToFocus
  }
};

const handleListTabClick = (id: string) => {
  handleTabClick(id);
  state.showDisclosure = false;
  state.isTabsFocused = true;
};

</script>
