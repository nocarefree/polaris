import type { Action } from '../../types';

export type CalloutCardProps = {
    /** The title of the card */
    title: string;
    /** URL to the card illustration */
    illustration: string;
    /** Primary action for the card */
    primaryAction: Action;
    /** Secondary action for the card */
    secondaryAction?: Action;
    /** Callback when banner is dismissed */
    dismiss?: Boolean;
}
