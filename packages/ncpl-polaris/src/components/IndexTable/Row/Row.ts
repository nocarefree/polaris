type RowStatus = 'success' | 'subdued' | 'critical';

export type IndexTableRowProps = {
    id: string | number;
    position: number;
    subdued?: boolean;
    status?: RowStatus;
    disabled?: boolean;
    onNavigation?(id: string): void;
    onClick?(): void;
}
