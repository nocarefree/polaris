import type { Component } from "vue";

interface Item {
    /** Title of the item */
    term: string | Component;
    /**  Item content */
    description: string | Component;
}

export type DescriptionListProps = {
    /** Collection of items for list */
    items: Item[];
    /** Determines the spacing between list items */
    gap?: 'tight' | 'loose';
}
