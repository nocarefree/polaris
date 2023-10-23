import type { Component } from "vue";

export interface ChoiceListItem {
    /** Value of the choice */
    value: string;
    /** Label for the choice */
    label: Component | string;
    /** A unique identifier for the choice */
    id?: string;
    /** Disable choice */
    disabled?: boolean;
    /** Additional text to aide in use */
    helpText?: Component | string;
    /** Indicates that the choice is aria-describedBy the error message */
    describedByError?: boolean;
}


export interface ChoiceListProps {
    /** Label for list of choices */
    title: Component | string;
    /** Collection of choices */
    choices: ChoiceListItem[];
    /** Collection of selected choices */
    selected: string[];
    /** Name for form input */
    name?: string;
    /** Allow merchants to select multiple options at once */
    allowMultiple?: boolean;
    /** Toggles display of the title */
    titleHidden?: boolean;
    /** Display an error message */
    error?: Error;
    /** Disable all choices **/
    disabled?: boolean;
}
