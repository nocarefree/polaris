export type DatePickerDayProps = {
    focused?: boolean;
    day?: Date;
    selected?: boolean;
    inRange?: boolean;
    inHoveringRange?: boolean;
    disabled?: boolean;
    lastDayOfMonth?: any;
    isLastSelectedDay?: boolean;
    isFirstSelectedDay?: boolean;
    isHoveringRight?: boolean;
    rangeIsDifferent?: boolean;
    weekday?: string;
    selectedAccessibilityLabelPrefix?: string;
}
