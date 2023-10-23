import type { Component } from "vue";

import type { ChoiceBleedProps } from '../Choice';
import type { ResponsiveProp } from '@ncpl-polaris/utils/css';


export interface RadioButtonProps extends ChoiceBleedProps {
    /** Indicates the ID of the element that describes the the radio button */
    ariaDescribedBy?: string;
    /** Label for the radio button */
    label: Component | string;
    /** Visually hide the label */
    labelHidden?: boolean;
    /** Radio button is selected */
    checked?: boolean;
    /** Disable input */
    disabled?: boolean;
    /** ID for form input */
    id?: string;
    /** Name for form input */
    name?: string;
    /** Value for form input */
    value?: string;
    /** Grow to fill the space. Equivalent to width: 100%; height: 100% */
    fill?: ResponsiveProp<boolean>;
    /** Additional text to aide in use */
    helpText?: Component | string;
}