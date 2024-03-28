import { ResponsiveProp } from "../../utils";
import type { SpaceScale } from "@shopify/polaris-tokens";

type Gap = ResponsiveProp<SpaceScale>;

type ColumnsAlias = "oneThird" | "oneHalf" | "twoThirds";
export type ColumnsType = number | string | ColumnsAlias[];
export type Columns = ResponsiveProp<ColumnsType>;
export type HorizontalGridAlignItems = "start" | "end" | "center";

export type HorizontalGridProps = {
  /** The number of columns to display. Accepts either a single value or an object of values for different screen sizes.
   * @example
   * columns={6}
   * columns={{xs: 1, sm: 1, md: 3, lg: 6, xl: 6}}
   */
  columns?: Columns;
  /** The spacing between children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @example
   * gap='2'
   * gap={{xs: '1', sm: '2', md: '3', lg: '4', xl: '5'}}
   */
  gap?: Gap;
  /** Vertical alignment of children. If not set, inline elements will stretch to the height of the parent.
   * @example
   * alignItems='start'
   */
  alignItems?: HorizontalGridAlignItems;
};
