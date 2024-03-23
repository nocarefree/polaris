type Positioning = 'above' | 'below';


export type PreferredPosition = 'above' | 'below' | 'mostSpace';

export type PreferredAlignment = 'left' | 'center' | 'right';

export interface OverlayDetails {
  left?: number;
  right?: number;
  desiredHeight: number;
  positioning: Positioning;
  measuring: boolean;
  chevronOffset: number;
}


export interface PositionedOverlayProps {
  active: boolean;
  activator: HTMLElement;
  preferInputActivator?: boolean;
  preferredPosition?: PreferredPosition;
  preferredAlignment?: PreferredAlignment;
  fullWidth?: boolean;
  fixed?: boolean;
  preventInteraction?: boolean;
  classNames?: string;
  zIndexOverride?: number;
  onScrollOut?(): void;
}