import type {Range} from '../../../utils/dates';

export type DatePickerMonthProps = {
    focusedDate?: Date;
    selected?: Range;
    hoverDate?: Date;
    month: number;
    year: number;
    disableDatesBefore?: Date;
    disableDatesAfter?: Date;
    disableSpecificDates?: Date[];
    allowRange?: boolean;
    weekStartsOn: number;
    accessibilityLabelPrefixes: [string | undefined, string];
}
