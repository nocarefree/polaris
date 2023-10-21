import type { FiltersProps } from "../Filters"
import type { TabsProps } from "../Tabs"
import type { SortButtonChoice } from "./SortButton/SortButton"

export enum IndexFiltersMode {
  Default = 'DEFAULT',
  Filtering = 'FILTERING',
  EditingColumns = 'EDITING_COLUMNS',
}

export interface IndexFiltersPrimaryAction {
  type: 'save' | 'save-as' | 'cancel';
  onAction: (name: string) => Promise<boolean>;
  disabled?: boolean;
  loading?: boolean;
}
export interface IndexFiltersCancelAction {
  onAction: () => void;
  disabled?: boolean;
  loading?: boolean;
}


export interface IndexFiltersProps extends Omit<FiltersProps, 'focused' | 'children' | 'disableQueryField' | 'disableFilters'>,
  Pick<TabsProps, 'tabs' | 'selected'> {
  /** The available sorting choices. If not present, the sort button will not show */
  sortOptions?: SortButtonChoice[];
  /** The currently selected sort choice. Required if using sorting */
  sortSelected?: string[];
  /** The primary action to display  */
  primaryAction?: IndexFiltersPrimaryAction;
  /** The cancel action to display */
  cancelAction: IndexFiltersCancelAction;
  /** The current mode of the IndexFilters component. Used to determine which view to show */
  mode: IndexFiltersMode;
  /** Will disable all the elements within the IndexFilters component */
  disabled?: boolean;
  /** Will disable just the query field */
  disableQueryField?: boolean;
  /** If true, the sticky interaction on smaller devices will be disabled */
  disableStickyMode?: boolean;
  /** If the component should go flush to the top of the page when sticking */
  isFlushWhenSticky?: boolean;
  /** Whether the index supports creating new views */
  canCreateNewView?: boolean;
  /** Optional override to the default aria-label for the button that toggles the filtering mode */
  filteringAccessibilityLabel?: string;
  /** Optional override to the default Tooltip message for the button that toggles the filtering mode */
  filteringAccessibilityTooltip?: string;
  /** Whether the filter should close when clicking inside another Popover. */
  closeOnChildOverlayClick?: boolean;
  /** Optional override to the default keyboard shortcuts available */
  disableKeyboardShortcuts?: boolean;
}
