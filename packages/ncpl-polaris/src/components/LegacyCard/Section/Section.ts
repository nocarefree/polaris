import type { ComplexAction } from "../../types"

export interface LegacyCardSectionProps {
    title?: string;
    subdued?: boolean;
    flush?: boolean;
    fullWidth?: boolean;
    /** Allow the card to be hidden when printing */
    hideOnPrint?: boolean;
    actions?: ComplexAction[];
}
