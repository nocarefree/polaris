type Breakpoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type Areas = {
    [Breakpoint in Breakpoints]?: string[];
};

type Columns = {
    [Breakpoint in Breakpoints]?: number;
};

type Gap = {
    [Breakpoint in Breakpoints]?: string;
};


export type GridProps = {
    areas?: Areas;
    /* Number of columns */
    columns?: Columns;
    /* Grid gap */
    gap?: Gap;
}
