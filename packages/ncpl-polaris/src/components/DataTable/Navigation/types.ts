import type { ColumnVisibilityData } from '../types';

export interface NavigationProps {
    columnVisibilityData: ColumnVisibilityData[];
    isScrolledFarthestLeft?: boolean;
    isScrolledFarthestRight?: boolean;
    fixedFirstColumns: number;
    navigateTableLeft?(): void;
    navigateTableRight?(): void;
    setRef?: (ref: HTMLDivElement | null) => void;
}