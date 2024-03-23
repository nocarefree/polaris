type Breakpoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type Cell = {
    [Breakpoint in Breakpoints]?: string;
};

interface Columns {
    /** Number of columns the section should span on extra small screens */
    xs?: 1 | 2 | 3 | 4 | 5 | 6;
    /** Number of columns the section should span on small screens */
    sm?: 1 | 2 | 3 | 4 | 5 | 6;
    /** Number of columns the section should span on medium screens */
    md?: 1 | 2 | 3 | 4 | 5 | 6;
    /** Number of columns the section should span on large screens */
    lg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    /** Number of columns the section should span on extra large screens */
    xl?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}

export type GridCellProps = {
    area?: string;
    column?: Cell;
    columnSpan?: Columns;
    row?: Cell;
}
