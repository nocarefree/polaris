import type {
    MenuActionDescriptor,
    MenuGroupDescriptor,
} from '../../types';

export interface ActionMenuActionsProps {
    /** Collection of page-level secondary actions */
    actions?: MenuActionDescriptor[];
    /** Collection of page-level action groups */
    groups?: MenuGroupDescriptor[];
    /** Callback that returns true when secondary actions are rolled up into action groups, and false when not */
    onActionRollup?(hasRolledUp: boolean): void;
}

