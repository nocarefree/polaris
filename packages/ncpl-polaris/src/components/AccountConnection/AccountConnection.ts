import type { Action } from '../types';
export interface AccountConnectionProps {
    title?: string;
    details?: string;
    /** The name of the service */
    accountName?: string;
    /** URL for the user’s avatar image */
    avatarUrl?: string;
    /** Set if the account is connected */
    connected?: boolean;
    /** Action for account connection */
    action?: Action;
}