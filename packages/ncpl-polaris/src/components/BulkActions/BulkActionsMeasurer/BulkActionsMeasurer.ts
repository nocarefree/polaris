
import type { BulkActionsProps } from '../BulkActions';

export interface BulkActionsMeasurements {
    containerWidth: number;
    disclosureWidth: number;
    hiddenActionsWidths: number[];
}

export interface BulkActionsMeasurerProps {
    /** Collection of page-level action groups */
    promotedActions?: BulkActionsProps['promotedActions'];
    disabled?: BulkActionsProps['disabled'];
    buttonSize?: BulkActionsProps['buttonSize'];
}
