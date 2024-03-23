<template>
  <td v-if="!day" :class="styles.EmptyDayCell" @mouseover="onHover" />
  <td v-else :class="classNames(
    styles.DayCell,
    selected && styles['DayCell-selected'],
    (inRange || inHoveringRange) && !disabled && styles['DayCell-inRange'],
    isLastSelectedDay && styles['DayCell-lastInRange'],
    isFirstSelectedDay && styles['DayCell-firstInRange'],
    isHoveringRight && styles['DayCell-hoverRight'],
    rangeIsDifferent && styles['DayCell-hasRange'],
  )">
    <button @focus="onFocus" type="button" ref="dayNode" :tabindex="tabindex" :class="classNames(
      styles.Day,
      selected && styles['Day-selected'],
      disabled && styles['Day-disabled'],
      today && styles['Day-today'],
      (inRange || inHoveringRange) && !disabled && styles['Day-inRange'],
      isLastSelectedDay && styles['Day-lastInRange'],
      isFirstSelectedDay && styles['Day-firstInRange'],
      isHoveringRight && styles['Day-hoverRight'],
      rangeIsDifferent && styles['Day-hasRange'],
    )" @mouseover="onHover" @click="handleClick" :aria-label="ariaLabel" :aria-disabled="disabled"
      :aria-pressed="selected">
      {{ date }}
    </button>
  </td>
</template>
<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import type { DatePickerDayProps } from './Day'
import styles from '../DatePicker.module.scss'
import { useI18n } from "../../context"
import { classNames } from "@ncpl-polaris/utils"
import { isSameDay } from "@ncpl-polaris/utils/dates"
import { monthName } from "../utils"

defineOptions({
  name: 'NpDatePickerDay',
})
const emit = defineEmits(['click', 'hover', 'focus']);
const props = defineProps<DatePickerDayProps>()
const i18n = useI18n();
const dayNode = ref<HTMLButtonElement>();

watchEffect(() => {
  if (props.focused && dayNode.value) {
    dayNode.value.focus();
  }
}, { flush: 'post' });


const onHover = () => {
  emit('hover', props.lastDayOfMonth || props.day)
}
const onFocus = () => {
  emit('focus', props.day);
}

const handleClick = () => {
  !props.disabled ? emit('click', props.day) : undefined;
}
const today = computed(() => props.day ? isSameDay(new Date(), props.day) : false);


const date = computed(() => props.day ? props.day.getDate() : null);
const tabindex = computed(() => (props.focused || props.selected || today.value || date.value === 1) && !props.disabled ? 0 : -1);

const ariaLabel = computed(() => {
  const { day } = props;
  return day ? [
    props.selected && props.selectedAccessibilityLabelPrefix
      ? `${props.selectedAccessibilityLabelPrefix} `
      : '',
    `${today.value ? i18n.value.translate('Polaris.DatePicker.today') : ''}`,
    `${props.weekday ? props.weekday : ''} `,
    `${i18n.value.translate(
      `Polaris.DatePicker.months.${monthName(day.getMonth())}`,
    )} `,
    `${date.value} `,
    `${day.getFullYear()}`,
  ].join('') : ''
});

</script>
