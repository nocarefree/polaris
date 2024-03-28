<template>
  <td :class="classNames(
    styles.TableCell,
    flush && styles['TableCell-flush'],
  )">
    <slot></slot>
  </td>
</template>
<script setup lang="ts">
import type { IndexTableCellProps } from './Cell'
import styles from '../IndexTable.module.scss'
import { classNames } from '../../../utils';

defineOptions({
  name: 'NpIndexTableCell',
})
defineProps<IndexTableCellProps>()
</script>
