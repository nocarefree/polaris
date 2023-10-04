import type { ActionListItemProps } from './Item/Item';
import type { ActionListSection } from './Section/Section';



export interface ActionListProps {
  /** Collection of actions for list */
  items?: readonly ActionListItemProps[];
  /** Collection of sectioned action items */
  sections?: readonly ActionListSection[];
  /** Defines a specific role attribute for each action in the list */
  actionRole?: 'menuitem' | string;
  /** Callback when any item is clicked or keypressed */
  onActionAnyItem?: ActionListItemProps['onAction'];
}