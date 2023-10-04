

import type { ComplexAction } from '../types';

export type EmptyStateProps = {
    /** The empty state heading */
    heading?: string;
    /**
     * The path to the image to display.
     * The image should have ~40px of white space above when empty state is used within a card, modal, or navigation component
     */
    image: string;
    /** The path to the image to display on large screens */
    largeImage?: string;
    /** Whether or not to limit the image to the size of its container on large screens */
    imageContained?: boolean;
    /** Whether or not the content should span the full width of its container  */
    fullWidth?: boolean;
    /** Primary action for empty state */
    action?: ComplexAction;
    /** Secondary action for empty state */
    secondaryAction?: ComplexAction;
}
