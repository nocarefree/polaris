import type {
    OptionDescriptor,
    SectionDescriptor,
} from '../types';
import type { Alignment } from "./types"
import type { BoxProps } from '../Box';

export type OptionListProps = {
    /** A unique identifier for the option list */
    id?: string;
    /** List title */
    title?: string;
    /** Collection of options to be listed */
    options?: OptionDescriptor[];
    /** Defines a specific role attribute for the list itself */
    role?: BoxProps['role'];
    /** Sections containing a header and related options */
    sections?: SectionDescriptor[];
    /** The selected options */
    selected: string[];
    /** Allow more than one option to be selected */
    allowMultiple?: boolean;
    /** Vertically align child content to the center, top, or bottom.  */
    verticalAlign?: Alignment;
}
