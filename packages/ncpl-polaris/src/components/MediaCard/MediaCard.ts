import type { ActionListItemDescriptor, ComplexAction } from '../types';

type Size = 'small' | 'medium';

export type MediaCardProps = {
    /** Heading content */
    title?: string;
    /** Body content */
    description: string;
    /** Main call to action, rendered as a basic button */
    primaryAction?: ComplexAction;
    /** Secondary call to action, rendered as a plain button */
    secondaryAction?: ComplexAction;
    /** Action list items to render in ellipsis popover */
    popoverActions?: ActionListItemDescriptor[];
    /** Whether or not card content should be laid out vertically
     * @default false
     */
    portrait?: boolean;
    /** Size of the visual media in the card
     * @default 'medium'
     */
    size?: Size;
    dismiss?: boolean;
}
