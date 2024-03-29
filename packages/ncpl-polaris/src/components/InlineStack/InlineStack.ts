import type { SpaceScale } from '@shopify/polaris-tokens';
import type { ResponsiveProp } from '../../utils/css';

type Align =
  | 'start'
  | 'center'
  | 'end'
  | 'space-around'
  | 'space-between'
  | 'space-evenly';
type BlockAlign = 'start' | 'center' | 'end' | 'baseline' | 'stretch';
type Gap = ResponsiveProp<SpaceScale>;
type Direction = ResponsiveProp<'row' | 'row-reverse'>;
type Element = 'div' | 'span' | 'li' | 'ol' | 'ul';

export type InlineStackProps = {
  /** HTML Element type
   * @default 'div'
   */
  as?: Element;
  /** Horizontal alignment of children */
  align?: Align;
  /** Horizontal direction in which children are laid out */
  direction?: Direction;
  /** Vertical alignment of children */
  blockAlign?: BlockAlign;
  /** The spacing between elements. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @example
   * gap='2'
   * gap={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  gap?: Gap;
  /** Wrap stack elements to additional rows as needed on small screens
   * @default true
   */
  wrap?: boolean;
}
