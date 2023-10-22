<template>
  <UnstyledButton :class="classNames(styles.DirectionButton, active && styles['DirectionButton-active'])">
    <Icon :source="direction === 'asc' ? ArrowUpMinor : ArrowDownMinor" tone="base" />
    <span :class="styles.Label">
      <slot></slot>
    </span>
  </UnstyledButton>
</template>
<script setup lang="ts">
import styles from './DirectionButton.module.scss'
import UnstyledButton from "../../../UnstyledButton"
import Icon from "../../../Icon"
import { classNames } from '@ncpl-polaris/utils'
import { ArrowUpMinor, ArrowDownMinor } from "@ncpl/ncpl-icons"

type DirectionButtonDirection = 'asc' | 'desc';

defineProps<{
  active: boolean;
  direction: DirectionButtonDirection;
}>()

</script>
