<template>
  <Option v-bind="props">
    <div :class="classNames(styles.Action, divider && styles.ActionDivider)">
      <TextOption :selected="selected" :disabled="disabled">
        <div v-if="icon" :class="styles.Icon">
          <Icon tone="subdued" :source="icon" />
        </div>
        <slot></slot>
      </TextOption>
    </div>
  </Option>
</template>
<script setup lang="ts">
import styles from './Action.module.scss'
import { actionContext } from '../Listbox';
import Option, { ListboxOptionProps } from "../Option"
import TextOption from "../TextOption"
import Icon, { type IconProps } from '../../Icon';
import { classNames } from "@ncpl-polaris/utils"

interface ActionProps extends ListboxOptionProps {
  icon?: IconProps['source'];
}

defineOptions({
  name: 'NpListboxAction',
})
const props = defineProps<ActionProps>()
actionContext.provide(true);

</script>
