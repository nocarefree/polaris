import type { HSBColor, HSBAColor } from '../../utils/color-types';


interface Color extends HSBColor {
    /** Level of transparency */
    alpha?: HSBAColor['alpha'];
}


export type ColorPickerProps = {
    /** ID for the element */
    id?: string;
    /** The currently selected color */
    modelValue: Color;
    /** Allow user to select an alpha value */
    allowAlpha?: boolean;
    /** Allow HuePicker to take the full width */
    fullWidth?: boolean;
}
