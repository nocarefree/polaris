
import type { ResponsiveProp } from '../../utils/css';
import type { SpaceScale } from '@shopify/polaris-tokens';

type Align =
  | 'start'
  | 'center'
  | 'end'
  | 'space-around'
  | 'space-between'
  | 'space-evenly';

type InlineAlign = 'start' | 'center' | 'end' | 'baseline' | 'stretch';

type Element = 'div' | 'ul' | 'ol' | 'fieldset';

type Gap = ResponsiveProp<SpaceScale>;

export interface VerticalStackProps {
  /** HTML Element type
   * @default 'div'
   */
  as?: Element;
  /** Vertical alignment of children */
  align?: Align;
  /** Horizontal alignment of children */
  inlineAlign?: InlineAlign;
  /** The spacing between children */
  gap?: Gap;
  /** HTML id attribute */
  id?: string;
  /** Reverse the render order of child items
   * @default false
   */
  reverseOrder?: boolean;
  /** Aria role */
  role?: 'status' | 'presentation' | 'menu' | 'listbox' | 'combobox';
}
