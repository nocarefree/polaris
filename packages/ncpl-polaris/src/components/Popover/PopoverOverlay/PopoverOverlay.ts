import type { PositionedOverlayProps } from "../../PositionedOverlay"

export type PopoverAutofocusTarget = 'none' | 'first-node' | 'container';

export enum PopoverCloseSource {
    Click,
    EscapeKeypress,
    FocusOut,
    ScrollOut,
}

export interface PopoverOverlayProps {
    fullWidth?: boolean;
    fullHeight?: boolean;
    fluidContent?: boolean;
    preferredPosition?: PositionedOverlayProps['preferredPosition'];
    preferredAlignment?: PositionedOverlayProps['preferredAlignment'];
    active: boolean;
    id: string;
    zIndexOverride?: number;
    activator: HTMLElement;
    preferInputActivator?: PositionedOverlayProps['preferInputActivator'];
    sectioned?: boolean;
    fixed?: boolean;
    hideOnPrint?: boolean;
    autofocusTarget?: PopoverAutofocusTarget;
    preventCloseOnChildOverlayClick?: boolean;
    captureOverscroll?: boolean;
}
