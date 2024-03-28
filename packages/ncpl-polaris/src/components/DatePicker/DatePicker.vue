<template>
  <div :id="id" :class="classNames(styles.DatePicker)" @keydown="handleKeyDown" @keyup="handleKeyUp">
    <div :class="styles.Header">
      <Button variant="tertiary" :icon="ArrowLeftIcon"
        :accessibility-label="i18n.translate('Polaris.DatePicker.previousMonth', { previousMonthName, showPreviousYear })"
        @click="() => handleMonthChangeClick(showPreviousMonth, showPreviousYear)" />
      <Button variant="tertiary" :icon="ArrowRightIcon"
        :accessibility-label="i18n.translate('Polaris.DatePicker.nextMonth', { nextMonth, nextYear })"
        @click="() => handleMonthChangeClick(showNextMonth, showNextYear)" />
    </div>
    <div :class="styles.MonthLayout">
      <Month @focus="handleFocus" :focusedDate="focusDate" :month="calMonth" :year="calYear"
        :selected="deriveRange(modelValue)" :hover-date="hoverDate" @change="handleDateSelection" @hover="handleHover"
        :disable-dates-before="disableDatesBefore" :disable-dates-after="disableDatesAfter"
        :disable-specific-dates="disableSpecificDates" :allow-range="allowRange" :week-starts-on="weekStartsOn"
        :accessibility-label-prefixes="accessibilityLabelPrefixes" />
      <Month v-if="multiMonth" @focus="handleFocus" :focused-date="focusDate" :month="showNextMonth" :year="showNextYear"
        :selected="monthIsSelected" :hover-date="hoverDate" @change="handleDateSelection" @hover="handleHover"
        :disable-dates-before="disableDatesBefore" :disable-dates-after="disableDatesAfter"
        :disable-specific-dates="disableSpecificDates" :allow-range="allowRange" :week-starts-on="weekStartsOn"
        :accessibility-label-prefixes="accessibilityLabelPrefixes" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import type { DatePickerProps } from './DatePicker';
import Button from '../Button';
import Month from './Month';
import styles from './DatePicker.module.scss';
import { ArrowLeftIcon, ArrowRightIcon } from '@ncpl/ncpl-icons';
import { useI18n } from '../context';
import { classNames } from "../../utils"
import {
  isDateAfter,
  isDateBefore,
  getNextDisplayYear,
  getNextDisplayMonth,
  getPreviousDisplayYear,
  getPreviousDisplayMonth,
  isDateDisabled,
  type Range,
} from '../../utils/dates';
import { monthName } from "./utils"

defineOptions({
  name: 'NpDatePicker',
})
const emit = defineEmits(['monthChange', 'update:modelValue'])
const props = withDefaults(defineProps<DatePickerProps>(), { weekStartsOn: 0 });

const i18n = useI18n();
const hoverDate = ref<Date | undefined>(undefined);
const focusDate = ref<Date | undefined>(undefined);

const calMonth = ref(props.month);
const calYear = ref(props.year);


const showNextYear = computed(() => getNextDisplayYear(calMonth.value, calYear.value));
const showNextMonth = computed(() => getNextDisplayMonth(calMonth.value));

const showNextToNextYear = computed(() => getNextDisplayYear(showNextMonth.value, showNextYear.value));
const showNextToNextMonth = computed(() => getNextDisplayMonth(showNextMonth.value));

const showPreviousYear = computed(() => getPreviousDisplayYear(calMonth.value, calYear.value));
const showPreviousMonth = computed(() => getPreviousDisplayMonth(calMonth.value));

const previousMonthName = computed(() => i18n.value.translate(`Polaris.DatePicker.months.${monthName(showPreviousMonth.value)}`));
const nextMonth = computed(() => props.multiMonth ? i18n.value.translate(`Polaris.DatePicker.months.${monthName(showNextToNextMonth.value)}`) : i18n.value.translate(`Polaris.DatePicker.months.${monthName(showNextMonth.value)}`));
const nextYear = computed(() => props.multiMonth ? showNextToNextYear.value : showNextYear.value);

const monthIsSelected = computed(() => deriveRange(props.modelValue));

const firstDatePickerAccessibilityLabelPrefix = computed(() => props.allowRange ? i18n.value.translate(`Polaris.DatePicker.start`) : props.dayAccessibilityLabelPrefix);
const secondDatePickerAccessibilityLabelPrefix = computed(() => i18n.value.translate(`Polaris.DatePicker.end`));

const accessibilityLabelPrefixes = computed<[string | undefined, string]>(() => [
  firstDatePickerAccessibilityLabelPrefix.value,
  secondDatePickerAccessibilityLabelPrefix.value,
]);

const setFocusDateAndHandleMonthChange = (date: Date) => {
  calMonth.value = date.getMonth();
  calYear.value = date.getFullYear();
  emit('monthChange', calMonth.value, calYear.value);
  focusDate.value = date;
  hoverDate.value = date;
};

const handleKeyDown = (event: KeyboardEvent) => {
  const { key } = event;

  if (
    key === 'ArrowUp' ||
    key === 'ArrowDown' ||
    key === 'ArrowLeft' ||
    key === 'ArrowRight'
  ) {
    event.preventDefault();
    event.stopPropagation();
  }
}
const handleKeyUp = (event: KeyboardEvent) => {
  const { disableDatesBefore, disableDatesAfter, disableSpecificDates, modelValue: selected } = props;
  const { key } = event;

  const range = deriveRange(selected);
  const focusedDate = focusDate.value || (range && range.start);

  if (focusedDate == null) {
    return;
  }

  if (key === 'ArrowUp') {
    const previousWeek = new Date(focusedDate);
    previousWeek.setDate(focusedDate.getDate() - 7);
    if (
      !(
        (disableDatesBefore &&
          isDateBefore(previousWeek, disableDatesBefore)) ||
        (disableSpecificDates &&
          isDateDisabled(previousWeek, disableSpecificDates))
      )
    ) {
      setFocusDateAndHandleMonthChange(previousWeek);
    }
  }

  if (key === 'ArrowDown') {
    const nextWeek = new Date(focusedDate);
    nextWeek.setDate(focusedDate.getDate() + 7);
    if (
      !(
        (disableDatesAfter && isDateAfter(nextWeek, disableDatesAfter)) ||
        (disableSpecificDates &&
          isDateDisabled(nextWeek, disableSpecificDates))
      )
    ) {
      setFocusDateAndHandleMonthChange(nextWeek);
    }
  }

  if (key === 'ArrowRight') {
    const tomorrow = new Date(focusedDate);
    tomorrow.setDate(focusedDate.getDate() + 1);
    if (
      !(
        (disableDatesAfter && isDateAfter(tomorrow, disableDatesAfter)) ||
        (disableSpecificDates &&
          isDateDisabled(tomorrow, disableSpecificDates))
      )
    ) {
      setFocusDateAndHandleMonthChange(tomorrow);
    }
  }

  if (key === 'ArrowLeft') {
    const yesterday = new Date(focusedDate);
    yesterday.setDate(focusedDate.getDate() - 1);
    if (
      !(
        (disableDatesBefore &&
          isDateBefore(yesterday, disableDatesBefore)) ||
        (disableSpecificDates &&
          isDateDisabled(yesterday, disableSpecificDates))
      )
    ) {
      setFocusDateAndHandleMonthChange(yesterday);
    }
  }
}
const handleMonthChangeClick = (month: number, year: number) => {
  focusDate.value = undefined;
  calMonth.value = month;
  calYear.value = year;
  emit('monthChange', month, year);
}
const handleDateSelection = (range: Range) => {
  const { end } = range;

  hoverDate.value = end;
  focusDate.value = end;
  emit('update:modelValue', range);
}
const handleHover = (date: Date) => {
  hoverDate.value = date;
}
const handleFocus = (date: Date) => {
  focusDate.value = date;
}

watch(() => props.modelValue, () => {
  focusDate.value = undefined;
}, { flush: 'post' })

function deriveRange(selected?: Date | Range) {
  return selected instanceof Date ? { start: selected, end: selected } : selected;
}
</script>
