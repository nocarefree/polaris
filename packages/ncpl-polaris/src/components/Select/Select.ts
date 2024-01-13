import { Component } from "vue";
import type { LabelledProps } from "@ncpl-polaris/components/Labelled"

export interface StrictOption {
    /** Machine value of the option; this is the value passed to `onChange` */
    value: string;
    /** Human-readable text for the option */
    label: string;
    /** Option will be visible, but not selectable */
    disabled?: boolean;
    /** Element to display to the left of the option label. Does not show in the dropdown. */
    prefix?: string | Component;
}

export type SelectOption = string | StrictOption;

export interface SelectGroup {
    title: string;
    options: SelectOption[];
}



export interface SelectProps {
    /** List of options or option groups to choose from */
    options?: (SelectOption | SelectGroup)[];
    /** Label for the select */
    label: string | Component;
    /** Adds an action to the label */
    labelAction?: LabelledProps['action'];
    /** Visually hide the label */
    labelHidden?: boolean;
    /** Show the label to the left of the value, inside the control */
    labelInline?: boolean;
    /** Disable input */
    disabled?: boolean;
    /** Additional text to aide in use */
    helpText?: string | Component;
    /** Example text to display as placeholder */
    placeholder?: string;
    /** ID for form input */
    id?: string;
    /** Name for form input */
    name?: string;
    /** Value for form input */
    modelValue?: string;
    /** Display an error state */
    error?: Error | boolean;
    /** Visual required indicator, add an asterisk to label */
    requiredIndicator?: boolean;
    /** Indicates the tone of the select */
    tone?: 'magic';
}
