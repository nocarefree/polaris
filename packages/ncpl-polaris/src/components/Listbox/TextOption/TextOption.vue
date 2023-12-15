<template>
  <div :class="classNames(
    styles.TextOption,
    selected && !allowMultiple && styles.selected,
    disabled && styles.disabled,
    allowMultiple && styles.allowMultiple,
    isAction && styles.isAction,
  )">
    <div :class="styles.Content">
      <div v-if="allowMultiple && !isAction" :className="styles.Checkbox">
        <Checkbox :disabled="disabled" :checked="selected" :label="$slots.default?.()" />
      </div>
      <ConditionalWrapper v-else :condition="selected">
        <template #wrapper="{ children }">
          <Box width="100%">
            <InlineStack :wrap="false" align="space-between" gap="200">
              <component :is="children"></component>
              <InlineStack align="end">
                <Icon :source="TickMinor" />
              </InlineStack>
            </InlineStack>
          </Box>
        </template>
        <slot></slot>
      </ConditionalWrapper>

    </div>
  </div>
</template>
<script setup lang="ts">
import type { ListboxTextOptionProps } from './TextOption'
import styles from './TextOption.module.scss'
import ConditionalWrapper from '../../ConditionalWrapper';
import Box from '../../Box';
import InlineStack from '../../InlineStack';
import Icon from '../../Icon';
import Checkbox from '../../Checkbox';
import { TickMinor } from "@ncpl/ncpl-icons";
import { useComboboxListboxOption } from "../../Combobox"
import { actionContext } from "../Listbox"
import { classNames } from "@ncpl-polaris/utils"

defineOptions({
  name: 'NpListboxTextOption',
})
defineProps<ListboxTextOptionProps>()


const { allowMultiple } = useComboboxListboxOption();
const isAction = actionContext.inject();
</script>
