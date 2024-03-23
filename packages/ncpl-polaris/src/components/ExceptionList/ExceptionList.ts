import type { Component } from "vue";
import type { IconProps } from '../Icon';

type Description =
    | string
    | Component
    | (string | Component)[];


export interface ExceptionListItemProps {
    /** Set the color of the icon and title for the given item. */
    status?: 'critical' | 'warning';
    /** Icon displayed by the list item */
    icon?: IconProps['source'];
    /** Text displayed beside the icon */
    title?: string;
    /** Text displayed for the item */
    description?: Description;
    /** Should the description be truncated at end of line */
    truncate?: boolean;
}

export type ExceptionListProps = {
    items: ExceptionListItemProps[];
}


