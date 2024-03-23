import type {RangeSliderProps} from "../RangeSlider"

export interface RangeSliderSingleThumbProps extends RangeSliderProps {
    modelValue: number;
    id: string;
    min: number;
    max: number;
    step: number;
  }