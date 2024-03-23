import { Component } from "vue"

export interface AppliedFilterInterface {
    /** A unique key used to identify the applied filter */
    key: string;
    /** A label for the applied filter */
    label: string;
    /** Callback when the remove button is pressed */
    onRemove: (key: string) => void;
}

export interface FilterInterface {
    /** A unique key used to identify the filter */
    key: string;
    /** The label for the filter */
    label: string;
    /** The label for the selected filter */
    //selectedLabel?: string;
    /** The label for the filter */
    //onRemove?: (key: string) => void;
    /** The markup for the given filter */
    //filter: Component;
    /** Whether or not the filter should have a shortcut popover displayed */
    shortcut?: boolean;
    /** Whether or not the filter should be pinned, permanently displaying the filter */
    pinned?: boolean;
    /** Whether or not the filter is disabled */
    disabled?: boolean;
    /**
     * @default false
     * Whether or not the clear button is displayed
     */
    hideClearButton?: boolean;
    /** Optional callback when filter is pressed */
    onAction?: () => void;
    /** Suffix source */
    suffix?: Component;
    /** Optional section heading that this filter will go under  */
    section?: string;
}

export type FiltersProps = {
    /** Currently entered text in the query field */
    queryValue?: string;
    /** Placeholder text for the query field. */
    queryPlaceholder?: string;
    /** Whether the query field is focused. */
    focused?: boolean;
    /** Available filters added to the filter bar. Shortcut filters are pinned to the front of the bar. */
    filters: FilterInterface[];
    /** Applied filters which are rendered as filter pills. The remove callback is called with the respective key. */
    appliedFilters?: AppliedFilterInterface[];
    /** Disable all filters. */
    disabled?: boolean;
    /** Hide filter bar for applied filters. */
    hideFilters?: boolean;
    /** Hide the query field. */
    hideQueryField?: boolean;
    /** Disable the query field. */
    disableQueryField?: boolean;
    /** Disable the filters */
    disableFilters?: boolean;
    /** Whether the text field should be borderless. Should be true when used as part of the IndexFilters component. */
    borderlessQueryField?: boolean;
    /** Whether an asyncronous task is currently being run. */
    loading?: boolean;
    /** Whether the filter should close when clicking inside another Popover. */
    closeOnChildOverlayClick?: boolean;
    mountedState?: "entering" | "entered" | "exiting" | "exited" | "unmounted";
}
