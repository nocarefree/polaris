import type { BulkActionsProps } from '../BulkActions';

import type { SelectOption } from '../Select';

export interface ResourceListItemData {
    [data: string]: any;
}

export const SELECT_ALL_ITEMS = 'All';

export interface TItemType extends ResourceListItemData { };

export type ResourceListSelectedItems = string[] | 'All';

export type ResourceListProps = {
    /** Item data; each item is passed to renderItem */
    items: TItemType[];
    /** Whether to remove all padding around the filter controls. Should be true if using Filters, and false if using LegacyFilters.  */
    flushFilters?: boolean;
    /** Name of the resource, such as customers or products */
    resourceName?: {
        singular: string;
        plural: string;
    };
    /** Up to 2 bulk actions that will be given more prominence */
    promotedBulkActions?: BulkActionsProps['promotedActions'];
    /** Actions available on the currently selected items */
    bulkActions?: BulkActionsProps['actions'];
    /** Collection of IDs for the currently selected items */
    selectedItems?: ResourceListSelectedItems;
    /** Whether or not the list has filter(s) applied */
    isFiltered?: boolean;
    /** Renders a Select All button at the top of the list and checkboxes in front of each list item. For use when bulkActions aren't provided. **/
    selectable?: boolean;
    /** Whether or not there are more items than currently set on the items prop. Determines whether or not to set the paginatedSelectAllAction and paginatedSelectAllText props on the BulkActions component. */
    hasMoreItems?: boolean;
    /** Overlays item list with a spinner while a background action is being performed */
    loading?: boolean;
    /** Boolean to show or hide the header */
    showHeader?: boolean;
    /** Total number of resources */
    totalItemsCount?: number;
    /** Current value of the sort control */
    sortValue?: string;
    /** Collection of sort options to choose from */
    sortOptions?: SelectOption[];
    /** Custom header text displayed above the list instead of the resource count. */
    headerContent?: string;
    /** Function to customize the unique ID for each item */
    idForItem?(item: TItemType, index: number): string;
    /** Function to resolve the ids of items */
    resolveItemId?(item: TItemType): string;
}
