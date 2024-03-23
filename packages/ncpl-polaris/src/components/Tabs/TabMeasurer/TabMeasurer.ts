import type { TabProps } from "../Tab/Tab";

export type TabMeasurerProps = {
    tabToFocus: number;
    siblingTabHasFocus: boolean;
    selected: number;
    tabs: Omit<TabProps, 'onToggleModal' | 'onTogglePopover'>[];
}

export interface TabMeasurements {
    containerWidth: number;
    disclosureWidth: number;
    hiddenTabWidths: number[];
}
