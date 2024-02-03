import type { Component } from "vue"
import type { LabelProps } from "../Label"

import type { Action, Error } from '../types';

export type LabelledProps = {
    /** A unique identifier for the label */
    id: LabelProps['id'];
    /** Text for the label */
    label?: string | Component;
    helpText?: string | Component;
    /** Error to display beneath the label */
    error?: Error | boolean;
    /** An action */
    action?: Action;
    /** Visually hide the label */
    labelHidden?: boolean;
    /** Visual required indicator for the label */
    requiredIndicator?: boolean;
    /** Labels signify a disabled control */
    disabled?: boolean;
    /** Labels signify a readOnly control */
    readOnly?: boolean;
}

export function helpTextID(id: string) {
    return `${id}HelpText`;
}
