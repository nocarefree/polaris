import type { LabelledProps } from '../Labelled';

export type DualValue = [number, number];

export type RangeSliderValue = number | DualValue;

export interface RangeSliderProps extends Pick<LabelledProps, 'label' | 'helpText' | 'error'> {
    /** ID for range input */
    id?: LabelledProps['id'];
    /** Visually hide the label */
    labelHidden?: boolean;
    /** Adds an action to the label */
    labelAction?: LabelledProps['action'];
    /** Initial value for range input */
    modelValue: RangeSliderValue;
    /** Minimum possible value for range input */
    min?: number;
    /** Maximum possible value for range input */
    max?: number;
    /** Increment value for range input changes */
    step?: number;
    /** Provide a tooltip while sliding, indicating the current value */
    output?: boolean;
    /** Disable input */
    disabled?: boolean;
}
