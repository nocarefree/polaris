import type { Progress, Status } from '../types';

export interface PipProps {
    status?: Status;
    progress?: Progress;
    accessibilityLabelOverride?: string;
}
