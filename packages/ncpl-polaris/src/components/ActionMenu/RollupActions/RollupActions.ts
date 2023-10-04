import type { ActionListItemProps } from '@ncpl-polaris/components/ActionList/Item';
import type { ActionListSection } from '@ncpl-polaris/components/ActionList/Section';

export interface RollupActionsProps {
    /** Accessibilty label */
    accessibilityLabel?: string;
    /** Collection of actions for the list */
    items?: ActionListItemProps[];
    /** Collection of sectioned action items */
    sections?: ActionListSection[];
}
