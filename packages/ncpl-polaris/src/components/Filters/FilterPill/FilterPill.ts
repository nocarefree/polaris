import type { FilterInterface } from "../Filters"

export interface FilterPillProps extends Omit<FilterInterface, 'key'> {
    /** A unique identifier for the filter */
    filterKey: string;
    /** Whether the filter is selected or not */
    selected?: boolean;
    /** Whether the Popover will be initially open or not */
    initialActive: boolean;
    /** Whether filtering is disabled */
    disabled?: boolean;
    /** Whether the filter should close when clicking inside another Popover. */
    closeOnChildOverlayClick?: boolean;
}
