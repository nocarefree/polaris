import type { RangeSliderProps, DualValue } from "../RangeSlider"

export interface RangeSliderDualThumbProps extends RangeSliderProps {
  modelValue: DualValue;
  id: string;
  min: number;
  max: number;
  step: number;
}
