type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
    /**
     * Size of avatar
     * @default 'medium'
     */
    size?: Size;
    /** The name of the person */
    name?: string;
    /** Initials of person to display */
    initials?: string;
    /** Whether the avatar is for a customer */
    customer?: boolean;
    /** URL of the avatar image which falls back to initials if the image fails to load */
    source?: string;
    /** Accessible label for the avatar image */
    accessibilityLabel?: string;
}


export const STYLE_CLASSES = ['one', 'two', 'three', 'four', 'five'] as const;
