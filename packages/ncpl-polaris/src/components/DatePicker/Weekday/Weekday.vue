<template>
  <th :aria-label="label" scope="col" :class="classNames(
    styles.Weekday,
    current && styles['Weekday-current'],
  )">
    {{ title }}
  </th>
</template>
<script setup lang="ts">
import type { DatePickerWeekdayProps } from './Weekday'
import styles from '../DatePicker.module.scss'
import { classNames } from "../../../utils"

defineOptions({
  name: 'NpDatePickerWeekday',
})
defineProps<DatePickerWeekdayProps>()
</script>
