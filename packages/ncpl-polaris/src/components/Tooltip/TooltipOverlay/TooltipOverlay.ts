import type { PositionedOverlayProps } from '../../PositionedOverlay';

import type { Width, Padding, BorderRadius } from '../Tooltip';

export interface TooltipOverlayProps {
    id: string;
    active: boolean;
    preventInteraction?: PositionedOverlayProps['preventInteraction'];
    preferredPosition?: PositionedOverlayProps['preferredPosition'];
    activator: HTMLElement;
    accessibilityLabel?: string;
    width?: Width;
    padding?: Padding;
    borderRadius?: BorderRadius;
    zIndexOverride?: number;
    instant?: boolean;
}
