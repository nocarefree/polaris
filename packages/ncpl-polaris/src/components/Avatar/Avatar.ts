import { Size } from "./types"

type Shape = 'square' | 'round';

export interface AvatarProps {
    /**
     * Size of avatar
     * @default 'medium'
     */
    size?: Size;
    /**
     * Shape of avatar
     * @default 'round'
     */
    shape?: Shape;
    /** The name of the person */
    name?: string;
    /** Initials of person to display */
    initials?: string;
    /** Whether the avatar is for a customer */
    customer?: boolean;
    /** URL of the avatar image which falls back to initials if the image fails to load */
    source?: string;
    /** Callback fired when the image fails to load  */
    onError?(): void;
    /** Accessible label for the avatar image */
    accessibilityLabel?: string;
}


export const STYLE_CLASSES = ['one', 'two', 'three', 'four', 'five'] as const;

export const avatarStrokeWidth: { [S in Size]: string } = {
    extraSmall: '3',
    small: '2.5',
    medium: '2.5',
    large: '2.5',
    'xl-experimental': '2',
    '2xl-experimental': '1.5',
};
