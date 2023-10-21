import type { ChoiceBleedProps } from '../Choice';
import type { Component } from 'vue';
import type { ResponsiveProp } from "@ncpl-polaris/utils/css"

export interface CheckboxProps extends ChoiceBleedProps {
    /** Indicates the ID of the element that is controlled by the checkbox */
    ariaControls?: string;
    /** Indicates the ID of the element that describes the checkbox */
    ariaDescribedBy?: string;
    /** Visually hide the label */
    labelHidden?: boolean;
    /** Checkbox is selected. `indeterminate` shows a horizontal line in the checkbox */
    checked?: boolean | 'indeterminate';
    /** Disable input */
    disabled?: boolean;
    /** ID for form input */
    id?: string;
    /** Name for form input */
    name?: string;
    /** Value for form input */
    value?: string;
    /** Added to the wrapping label */
    labelClassName?: string;
    /** Grow to fill the space. Equivalent to width: 100%; height: 100% */
    fill?: ResponsiveProp<boolean>;
    /** Label for the checkbox */
    label?: string | Component;
    /** Additional text to aide in use */
    helpText?: string | Component;
    /** Display an error message */
    error?: Error | boolean;
}
