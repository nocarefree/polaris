<template>
  <div :class="styles.MonthContainer">
    <table role="grid" :class="styles.Month">
      <caption :class="classNames(styles.Title, current && styles['Month-current'])">
        {{ i18n.translate(`Polaris.DatePicker.months.${monthName(month)}`) }}{{ ' ' }}
        {{ year }}
      </caption>
      <thead>
        <tr :class="styles.WeekHeadings">
          <Weekday v-for="weekday in weekdays" :key="weekday"
            :title="i18n.translate(`Polaris.DatePicker.daysAbbreviated.${weekdayName(weekday)}`,)"
            :label="weekdayLabel(weekday)" :current="current && new Date().getDay() === weekday" />
        </tr>
      </thead>
      <tbody>
        <tr v-for="(week, index) in weeks" :class="styles.Week" :key="index">
          <Day v-for="(day, dayIndex) in week" :key="dayIndex" v-bind="dayAttributes(day, dayIndex)" />
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import type { DatePickerMonthProps } from './Month'
import styles from '../DatePicker.module.scss'
import { monthName, weekdayName } from '../utils';
import Weekday from '../Weekday';
import Day from '../Day';
import {
  isDateBefore,
  isDateAfter,
  isSameDay,
  getWeeksForMonth,
  dateIsInRange,
  dateIsSelected,
  getNewRange,
  getOrderedWeekdays,
  isDateDisabled,
} from '../../../utils/dates';
import { classNames } from "../../../utils"
import { useI18n } from "../../context";
import type { Range } from '../../../utils/dates';

defineOptions({
  name: 'NpDatePickerMonth',
})
const props = defineProps<DatePickerMonthProps>();
const emit = defineEmits(['change', 'hover', 'focus']);
const i18n = useI18n();

const lastDayOfMonth = computed(() => {
  return new Date(props.year, (props.month as number) + 1, 0)
})
const current = computed(() => {
  const now = new Date();
  return now.getMonth() === props.month && now.getFullYear() === props.year
})
const weeks = computed(() => {
  return getWeeksForMonth(props.month, props.year, props.weekStartsOn);
})
const weekdays = computed(() => {
  return getOrderedWeekdays(props.weekStartsOn);
})

const onHover = (event: Event) => {
  emit('hover', event);
}
const onFocus = (event: Event) => {
  emit('focus', event);
}
const handleDateClick = (selectedDate: Date) => {
  emit('change', getNewRange(props.allowRange ? props.selected : undefined, selectedDate));
};
const dayAttributes = (day: Date | null, dayIndex: number) => {
  const { focusedDate,
    selected,
    hoverDate,
    disableDatesBefore,
    disableDatesAfter,
    disableSpecificDates,
    allowRange,
    accessibilityLabelPrefixes
  } = props;
  if (day == null) {
    return {
      onHover: onHover,
      lastDayOfMonth: lastDayOfMonth.value
    }
  }
  const disabled =
    (disableDatesBefore && isDateBefore(day, disableDatesBefore)) ||
    (disableDatesAfter && isDateAfter(day, disableDatesAfter)) ||
    (disableSpecificDates && isDateDisabled(day, disableSpecificDates));

  const isFirstSelectedDay =
    allowRange && selected && isDateStart(day, selected);
  const isLastSelectedDay =
    allowRange &&
    selected &&
    ((!isSameDay(selected.start, selected.end) && isDateEnd(day, selected)) ||
      (hoverDate &&
        isSameDay(selected.start, selected.end) &&
        isDateAfter(hoverDate, selected.start) &&
        isSameDay(day, hoverDate) &&
        !isFirstSelectedDay));
  const rangeIsDifferent = !(
    selected && isSameDay(selected.start, selected.end)
  );
  const isHoveringRight = hoverDate && isDateBefore(day, hoverDate);
  const [firstAccessibilityLabelPrefix, lastAccessibilityLabelPrefix] =
    accessibilityLabelPrefixes;
  let accessibilityLabelPrefix;

  if (
    (allowRange && isFirstSelectedDay) ||
    (!allowRange && firstAccessibilityLabelPrefix)
  ) {
    accessibilityLabelPrefix = firstAccessibilityLabelPrefix;
  } else if (allowRange && isLastSelectedDay) {
    accessibilityLabelPrefix = lastAccessibilityLabelPrefix;
  }

  return {
    selectedAccessibilityLabelPrefix: accessibilityLabelPrefix,
    weekday: weekdayLabel(dayIndex),
    focused: focusedDate != null && isSameDay(day, focusedDate),
    day: day,
    key: dayIndex,
    onFocus: onFocus,
    onClick: handleDateClick,
    onHover: onHover,
    selected: selected != null && dateIsSelected(day, selected),
    inRange: selected != null && dateIsInRange(day, selected),
    disabled: disabled,
    inHoveringRange: selected != null && hoverDate != null && hoveringDateIsInRange(day, selected, hoverDate),
    isLastSelectedDay: isLastSelectedDay,
    isFirstSelectedDay: isFirstSelectedDay,
    isHoveringRight: isHoveringRight,
    rangeIsDifferent: rangeIsDifferent,
  }
}

function weekdayLabel(weekday: number) {
  return i18n.value.translate(`Polaris.DatePicker.days.${weekdayName(weekday)}`);
}

function hoveringDateIsInRange(
  day: Date | null,
  range: Range,
  hoverEndDate: Date,
) {
  if (!props.allowRange) {
    return false;
  }
  if (day == null) {
    return false;
  }
  const { start, end } = range;
  return Boolean(isSameDay(start, end) && day > start && day <= hoverEndDate);
}

function isDateEnd(day: Date | null, range: Range) {
  if (day == null) return false;
  const { end } = range;

  return Boolean(end && isSameDay(end, day));
}

function isDateStart(day: Date | null, range: Range) {
  if (day == null) return false;
  const { start } = range;

  return Boolean(start && isSameDay(start, day));
}

</script>
