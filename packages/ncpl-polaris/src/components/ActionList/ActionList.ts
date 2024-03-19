import type { ActionListItemDescriptor, ActionListSection } from '../types';

export interface ActionListProps {
  /** Collection of actions for list */
  items?: ActionListItemDescriptor[];
  /** Collection of sectioned action items */
  sections?: ActionListSection[];
  /** Defines a specific role attribute for each action in the list */
  actionRole?: 'menuitem' | string;
}