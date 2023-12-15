import type { Range } from "@ncpl-polaris/utils/dates"

export type DatePickerProps = {
    /** ID for the element */
    id?: string;
    /** The selected date or range of dates */
    modelValue?: Date | Range;
    /** The month to show, from 0 to 11. 0 is January, 1 is February ... 11 is December */
    month: number;
    /** The year to show */
    year: number;
    /** Allow a range of dates to be selected */
    allowRange?: boolean;
    /** Disable selecting dates before this. */
    disableDatesBefore?: Date;
    /** Disable selecting dates after this. */
    disableDatesAfter?: Date;
    /** Disable specific dates. */
    disableSpecificDates?: Date[];
    /** The selection can span multiple months */
    multiMonth?: boolean;
    /**
     * First day of week, from 0 to 6. 0 is Sunday, 1 is Monday ... 6 is Saturday
     * @default 0
     */
    weekStartsOn?: number;
    /** Visually hidden prefix text for selected days on single selection date pickers */
    dayAccessibilityLabelPrefix?: string;
}
