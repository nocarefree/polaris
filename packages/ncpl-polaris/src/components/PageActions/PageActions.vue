<template>
  <div :class="styles.PageActions">
    <LegacyStack distribution="trailing" spacing="tight">
      <ButtonGroup v-if="secondaryActions && secondaryActions.length > 0">
        <component :is="()=>buttonsFrom(secondaryActions!, {variant: 'primary'})"></component>
      </ButtonGroup>
      <slot v-else name="secondaryActions"></slot>

      <component v-if="primaryAction" :is="buttonsFrom(primaryAction, {variant: 'primary'})"></component>
      <slot v-else name="primaryAction"></slot>
    </LegacyStack>
  </div>
</template>
<script setup lang="ts">
import type { PageActionsProps } from './PageActions'
import styles from './PageActions.module.scss'
import LegacyStack from '../LegacyStack'
import ButtonGroup from '../ButtonGroup'
import { buttonsFrom } from "../Button/utils"

defineOptions({
  name: 'NpPageActions',
})
defineProps<PageActionsProps>()
</script>
