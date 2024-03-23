import { type Component } from "vue";

type Size = 'extraSmall' | 'small' | 'medium' | 'large';

export type ThumbnailProps = {
    /**
 * Size of thumbnail
 * @default 'medium'
 */
    size?: Size;
    /** URL for the image */
    source: string | Component;
    /** Alt text for the thumbnail image */
    alt: string;
    /** Transparent background */
    transparent?: boolean;
}
