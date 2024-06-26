import type { SpaceScale } from '@shopify/polaris-tokens';

import type { ResponsiveProp } from '../../utils/css';

type ColumnsAlias = 'oneThird' | 'oneHalf' | 'twoThirds';
type ColumnsType = number | string | ColumnsAlias[];
type Columns = ResponsiveProp<ColumnsType>;
type Gap = ResponsiveProp<SpaceScale>;
type InlineGridAlignItems = 'start' | 'end' | 'center';

export type InlineGridProps = {
  /** The number of columns to display. Accepts either a single value or an object of values for different screen sizes.
 * @example
 * columns={6}
 * columns={{xs: 1, sm: 2, md: 3, lg: 4, xl: 6}}
 */
  columns?: Columns;
  /** The spacing between children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @example
   * gap='200'
   * gap={{xs: '100', sm: '200', md: '300', lg: '400', xl: '500'}}
   */
  gap?: Gap;
  /** Vertical alignment of children. If not set, inline elements will stretch to the height of the parent.
   * @example
   * alignItems='start'
   */
  alignItems?: InlineGridAlignItems;
}
