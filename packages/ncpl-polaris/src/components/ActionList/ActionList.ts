import type { ActionListItemDescriptor, ActionListSection } from '../types';

export interface ActionListProps {
  /** Collection of actions for list */
  items?: ActionListItemDescriptor[];
  /** Collection of sectioned action items */
  sections?: ActionListSection[];
  /** Defines a specific role attribute for each action in the list */
  actionRole?: 'menuitem' | string;
  /** Allow users to filter items in the list. Will only show if more than 8 items in the list. The item content of every items must be a string for this to work */
  allowFiltering?: boolean;
}