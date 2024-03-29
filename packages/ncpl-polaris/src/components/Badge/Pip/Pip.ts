import type { Progress, Tone } from '../types';

export interface PipProps {
    tone?: Tone;
    progress?: Progress;
    accessibilityLabelOverride?: string;
}
