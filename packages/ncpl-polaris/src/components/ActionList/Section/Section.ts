import type { ActionListSection } from '../../types';


export interface ActionListSectionProps {
    /** Section of action items */
    section: ActionListSection;
    /** Should there be multiple sections */
    hasMultipleSections: boolean;
    /** Defines a specific role attribute for each action in the list */
    actionRole?: 'option' | 'menuitem' | string;
    /** Whether it is the first in a group of sections */
    isFirst?: boolean;
}
