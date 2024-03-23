export type StickyProps = {
    /** Element outlining the fixed position boundaries */
    boundingElement?: HTMLElement | null;
    /** Offset vertical spacing from the top of the scrollable container */
    offset?: boolean;
    /** Should the element remain in a fixed position when the layout is stacked (smaller screens)  */
    disableWhenStacked?: boolean;
}
