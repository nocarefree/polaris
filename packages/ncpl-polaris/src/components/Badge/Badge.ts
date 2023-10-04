import type { IconSource } from '../types';
import type { Progress, Size, Status } from './types';

interface NonMutuallyExclusiveProps {
    /** Colors and labels the badge with the given status. */
    status?: Status;
    /** Render a pip showing the progress of a given task. */
    progress?: Progress;
    /** Icon to display to the left of the badge’s content. */
    icon?: IconSource;
    /**
     * @default 'medium'
     */
    size?: Size;
    /** Pass a custom accessibilityLabel */
    statusAndProgressLabelOverride?: string;
}

export type BadgeProps = NonMutuallyExclusiveProps &
    (
        | { progress?: Progress; icon?: undefined }
        | { icon?: IconSource; progress?: undefined }
    );
