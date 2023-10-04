import type { Component } from "vue";
import { DisableableAction, DestructableAction, IconSource } from "../../types"

export interface ActionListItemProps
    extends DisableableAction,
    DestructableAction {
    /** Visually hidden text for screen readers */
    accessibilityLabel?: string;
    /** @deprecated Badge component */
    badge?: {
        status: 'new';
        content: string;
    };
    /** Additional hint text to display with item */
    helpText?: Component | string;
    /** @deprecated Source of the icon */
    icon?: IconSource;
    /** @deprecated Image source */
    image?: string;
    /** Prefix source */
    prefix?: Component;
    /** Suffix source */
    suffix?: Component;
    /** @deprecated Add an ellipsis suffix to action content. ellipsis appends `...` without truncating. Use truncate instead. */
    ellipsis?: boolean;
    /** Truncate the action content either at the beginning or at the end */
    truncate?: boolean;
    /** Whether the action is active or not */
    active?: boolean;
    /** The item variations */
    variant?: 'default' | 'menu' | 'indented';
    /** Defines a role for the action */
    role?: string;
}