import type { ComplexAction } from '../../types';

export interface FooterProps {
    /** Primary action */
    primaryAction?: ComplexAction;
    /** Collection of secondary actions */
    secondaryActions?: ComplexAction[];
}
