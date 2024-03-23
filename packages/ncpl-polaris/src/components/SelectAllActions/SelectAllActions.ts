import type { Action } from '../types';

export type SelectAllActionsProps = {
    /** Visually hidden text for screen readers */
    accessibilityLabel?: string;
    /** Label for the bulk actions */
    label?: string;
    /** State of the bulk actions checkbox */
    selected?: boolean | 'indeterminate';
    /** List is in a selectable state */
    selectMode?: boolean;
    /** Text to select all across pages */
    paginatedSelectAllText?: string;
    /** Action for selecting all across pages */
    paginatedSelectAllAction?: Action;
    /** Disables bulk actions */
    disabled?: boolean;
}
