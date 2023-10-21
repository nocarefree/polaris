<template>
  <div ref="elementRef">
    <Popover :active="popoverActive && !disabled" :key="filterKey"
      @close="() => { popoverActive = !popoverActive, $emit('click', filterKey) }" preferred-alignment="left"
      :prevent-close-on-child-overlay-click="!closeOnChildOverlayClick">
      <template name="activator">
        <div :class="buttonClasses">
          <InlineStack gap="0" :wrap="false">
            <UnstyledButton @focus="focused = true" @blur="focused = false" @click="popoverActive = !popoverActive"
              :class="classNames(styles.PlainButton, styles.ToggleButton)" type="button" :disabled="disabled">
              <InlineStack :wrap="false" align="center" block-align="center" gap="0">
                <div :class="styles.Label">
                  <Text :variant="mdDown ? 'bodyLg' : 'bodySm'" as="span">
                    {{ label }}
                  </Text>
                </div>
                <div v-if="!selected" :class="styles.IconWrapper">
                  <Icon :source="ChevronDownMinor" tone="base" />
                </div>
              </InlineStack>
            </UnstyledButton>

            <UnstyledButton v-if="selected" @click="() => { $emit('remove', filterKey), popoverActive = false }"
              :class="classNames(styles.PlainButton, styles.clearButton)" type="button"
              :aria-label="i18n.translate('Polaris.FilterPill.clear')" :disabled="disabled">
              <div :class="styles.IconWrapper">
                <Icon :source="CancelSmallMinor" tone="base" />
              </div>
            </UnstyledButton>
          </InlineStack>
        </div>
      </template>
      <div :class="styles.PopoverWrapper">
        <PopoverSection>
          <BlockStack gap="100">
            <slot name="filter"></slot>
            <div v-if="!hideClearButton" :class="styles.ClearButtonWrapper">
              <Button @click="() => { $emit('remove', filterKey), popoverActive = false }" plain :disabled="!selected"
                text-align="left">
                {{ i18n.translate('Polaris.FilterPill.clear') }}
              </Button>
            </div>
          </BlockStack>
        </PopoverSection>
      </div>
    </Popover>
  </div>
</template>
<script setup lang="ts">
import { ref,computed } from 'vue'
import type { FiltersFilterPillProps } from './FilterPill'
import Popover from "../../Popover"
import PopoverSection from "../../Popover/Section"
import InlineStack from "../../InlineStack"
import UnstyledButton from "../../UnstyledButton"
import BlockStack from "../../BlockStack"
import Icon from "../../Icon"
import Text from "../../Text"
import Button from "../../Button"
import styles from './FilterPill.module.scss'
import { CancelSmallMinor, ChevronDownMinor } from "@ncpl/ncpl-icons"
import { useI18n, useBreakpoints } from '../../context'
import { classNames } from "@ncpl-polaris/utils"

defineOptions({
  name: 'NpFiltersFilterPill',
})
const props = defineProps<FiltersFilterPillProps>()


const popoverActive = ref<boolean>(false)
const focused = ref<boolean>(false);
const i18n = useI18n();
const { mdDown } = useBreakpoints();
const buttonClasses = computed(()=>classNames(
    styles.FilterButton,
    props.selected && styles.ActiveFilterButton,
    popoverActive.value && styles.FocusFilterButton,
    focused.value && styles.focusedFilterButton,
  ))

</script>
