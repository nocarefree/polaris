import type { CSSProperties } from "vue";
import type { SortDirection, VerticalAlign } from "../types"

export interface CellProps {
    contentType?: string;
    nthColumn?: boolean;
    firstColumn?: boolean;
    truncate?: boolean;
    header?: boolean;
    total?: boolean;
    totalInFooter?: boolean;
    sorted?: boolean;
    sortable?: boolean;
    sortDirection?: SortDirection;
    defaultSortDirection?: SortDirection;
    verticalAlign?: VerticalAlign;
    onSort?(): void;
    colSpan?: number;
    setRef?: (ref: HTMLTableCellElement | null) => void;
    stickyHeadingCell?: boolean;
    stickyCellWidth?: number;
    hovered?: boolean;
    handleFocus?: FocusEventHandler;
    inFixedNthColumn?: boolean;
    hasFixedNthColumn?: boolean;
    fixedCellVisible?: boolean;
    firstColumnMinWidth?: string;
    style?: CSSProperties;
    lastFixedFirstColumn?: boolean;
}