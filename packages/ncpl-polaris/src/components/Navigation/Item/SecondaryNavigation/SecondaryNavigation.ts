import type { Component } from "vue"
import type { SubNavigationItem } from '../../types';
import type { IconSource } from '../../../types';

export interface SecondaryNavigationProps {
  itemComponent: Component,
  icon?: IconSource;
  longestMatch?: SubNavigationItem;
  subNavigationItems: SubNavigationItem[];
  showExpanded: boolean;
  truncateText?: boolean;
  secondaryNavigationId?: string;
}