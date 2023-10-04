import { type Component } from "vue"

import type {
    Width,
} from '../../Tooltip';


export type IndexTableSortDirection = 'ascending' | 'descending';

export interface IndexTableHeading {
    id: string;
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
    sortTooltipContent?: string;
    alignment?: string;
    index?: number;
    defaultSortDirection?: string,
}