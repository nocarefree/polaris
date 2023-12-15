import type {
    ComplexAction,
    DisableableAction,
    LoadableAction,
} from '../types';

export type PageActionsProps = {
    /** The primary action for the page */
    primaryAction?: (DisableableAction & LoadableAction);
    /** The secondary actions for the page */
    secondaryActions?: ComplexAction[];
}
