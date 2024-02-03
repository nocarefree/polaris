import type { DisableableAction } from "../types"

export type Alignment = 'leading' | 'trailing' | 'center' | 'fill' | 'baseline';


export type ResourceItemProps = {
    /** Visually hidden text for screen readers used for item link */
    accessibilityLabel?: string;
    /** Individual item name used by various text labels */
    name?: string;
    /** Id of the element the item onClick controls */
    ariaControls?: string;
    /** Tells screen reader the controlled element is expanded */
    ariaExpanded?: boolean;
    /** Unique identifier for the item */
    id: string;
    /** Makes the shortcut actions always visible */
    persistActions?: boolean;
    /** 1 or 2 shortcut actions; must be available on the page linked to by url */
    shortcutActions?: DisableableAction[];
    /** The order the item is rendered */
    sortOrder?: number;
    /** URL for the resource’s details page (required unless onClick is provided) */
    url?: string;
    /** Allows url to open in a new tab */
    external?: boolean;
    /** Adjust vertical alignment of elements */
    verticalAlignment?: Alignment;
    /** Prefetched url attribute to bind to the main element being returned */
    dataHref?: string;
}
