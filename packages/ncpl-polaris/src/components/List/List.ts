type Type = 'bullet' | 'number';

type Spacing = 'extraTight' | 'loose';

export type ListProps = {
    /**
 * Determines the space between list items
 * @default 'loose'
 */
    gap?: Spacing;
    /**
     * Type of list to display
     * @default 'bullet'
     */
    type?: Type;
}
