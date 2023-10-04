import type { ActionListItemProps } from '../Item/Item';


export interface ActionListSection {
    /** Section title */
    title?: string;
    /** Collection of action items for the list */
    items: readonly ActionListItemProps[];
}

export interface ActionListSectionProps {
    /** Section of action items */
    section: ActionListSection;
    /** Should there be multiple sections */
    hasMultipleSections: boolean;
    /** Defines a specific role attribute for each action in the list */
    actionRole?: 'option' | 'menuitem' | string;
    /** Callback when any item is clicked or keypressed */
    onActionAnyItem?: ActionListItemProps['onAction'];
    /** Whether it is the first in a group of sections */
    isFirst?: boolean;
}
