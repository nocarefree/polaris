import type { MenuGroupDescriptor, ActionListSection } from '../../types';

export interface MenuGroupProps extends MenuGroupDescriptor {
    /** Visually hidden menu description for screen readers */
    accessibilityLabel?: string;
    /** Whether or not the menu is open */
    active?: boolean;
    /** Collection of sectioned action items */
    sections?: ActionListSection[];
}
