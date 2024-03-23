import type { SpaceScale } from '@shopify/polaris-tokens';
import type { ResponsiveProp } from '@ncpl-polaris/utils/css';

type Spacing = ResponsiveProp<SpaceScale>;

export type BleedProps = {
    /** Negative horizontal space around children */
    marginInline?: Spacing;
    /** Negative vertical space around children */
    marginBlock?: Spacing;
    /** Negative top space around children */
    marginBlockStart?: Spacing;
    /** Negative bottom space around children */
    marginBlockEnd?: Spacing;
    /** Negative left space around children */
    marginInlineStart?: Spacing;
    /** Negative right space around children */
    marginInlineEnd?: Spacing;
}
