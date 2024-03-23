import type { NonEmptyArray } from "../types";
import type { Component } from "vue";
import type { Width } from '../Tooltip';
import type { BulkActionsProps } from "../BulkActions";
import type { PaginationProps } from "../Pagination";


export type IndexTableSortDirection = 'ascending' | 'descending';

export interface IndexTableHeading {
    id?: string;
    title: string | Component;
    /**
     * Adjust horizontal alignment of header content.
     * @default 'start'
     */
    alignment?: 'start' | 'center' | 'end';
    flush?: boolean;
    new?: boolean;
    hidden?: boolean;
    tooltipWidth?: Width;
    tooltipPersistsOnClick?: boolean;
    /**
     * The direction to sort the table rows on first click or keypress of this column heading.
     * When not specified, the value from IndexTable.defaultSortDirection will be used.
     */
    defaultSortDirection?: IndexTableSortDirection;
}

export type HeaderContentProps = IndexTableHeading & {
    sortable?: boolean;
    sortTooltipContent?: string | Component;
    alignment?: string;
    index?: number;
    defaultSortDirection?: string;
    tooltipContent?: string | Component;
}

export type IndexSelectedItems = string[] | 'All';

export const SELECT_ALL_ITEMS = 'All';

export enum SelectionType {
    All = 'all',
    Page = 'page',
    Multi = 'multi',
    Single = 'single',
    Range = 'range',
}

export interface TableHeadingRect {
    offsetWidth: number;
    offsetLeft: number;
}


export type Range = [number, number];

export interface IndexProviderProps {
    selectable?: boolean;
    selectedItemsCount?: typeof SELECT_ALL_ITEMS | number;
    resourceName?: {
        singular: string;
        plural: string;
    };
    loading?: boolean;
    hasMoreItems?: boolean;
    condensed?: boolean;
    onSelectionChange?(
        selectionType: SelectionType,
        toggleType: boolean,
        selection?: string | Range,
    ): void;
}

export type HandleSelectionChange = (
    selectionType: SelectionType,
    toggleType: boolean,
    selection?: string | Range,
    sortOrder?: number,
) => void;

export interface BulkSelectionDataOptions {
    selectedItemsCount: number | typeof SELECT_ALL_ITEMS;
    itemCount: number;
    hasMoreItems?: boolean;
    resourceName?: {
        singular: string;
        plural: string;
    };
}

export interface HandleBulkSelectionOptions {
    onSelectionChange?(
        selectionType: SelectionType,
        toggleType: boolean,
        selection?: string | Range,
    ): void;
}

type IndexTableSortToggleLabel = {
    [key in IndexTableSortDirection]: string;
};

interface IndexTableSortToggleLabels {
    [key: number]: IndexTableSortToggleLabel;
}

export type IndexTablePaginationProps = Omit<PaginationProps, 'type'>;

export interface IndexTableProps extends IndexProviderProps {
    headings: NonEmptyArray<IndexTableHeading>;
    promotedBulkActions?: BulkActionsProps['promotedActions'];
    bulkActions?: BulkActionsProps['actions'];
    paginatedSelectAllActionText?: string;
    lastColumnSticky?: boolean;
    selectable?: boolean;
    /** List of booleans, which maps to whether sorting is enabled or not for each column. Defaults to false for all columns.  */
    sortable?: boolean[];
    /**
     * The direction to sort the table rows on first click or keypress of a sortable column heading. Defaults to descending.
     * @default 'descending'
     */
    defaultSortDirection?: IndexTableSortDirection;
    /** The current sorting direction. */
    sortDirection?: IndexTableSortDirection;
    /**
     * The index of the heading that the table rows are sorted by.
     */
    sortColumnIndex?: number;
    /** Optional dictionary of sort toggle labels for each sortable column, with ascending and descending label,
     * with the key as the index of the column */
    sortToggleLabels?: IndexTableSortToggleLabels;
    /** Add zebra striping to table rows */
    hasZebraStriping?: boolean;
    //itemCount: number;
    selected?: string[] | 'All';
    rows?: { id: string, [key: string]: any }[];
    pagination?: IndexTablePaginationProps & { onNext?: () => void; onPrevious?: () => void };
    itemCount?: number;
}
