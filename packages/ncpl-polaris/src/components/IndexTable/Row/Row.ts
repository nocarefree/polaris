type RowStatus = 'success' | 'subdued' | 'critical';

export type IndexTableRowProps = {
    id: string | number;
    selected?: boolean;
    position: number;
    subdued?: boolean;
    status?: RowStatus;
    disabled?: boolean;
    onNavigation?(id: string): void;
    onClick?(): void;
}
