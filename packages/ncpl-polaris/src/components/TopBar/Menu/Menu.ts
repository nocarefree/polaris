import type { ActionListProps } from '@ncpl-polaris/components/ActionList';
import type { MessageProps } from './Message';

export interface MenuProps {
    /** An array of action objects that are rendered inside of a popover triggered by this menu */
    actions: ActionListProps['sections'];
    /** Accepts a message that facilitates direct, urgent communication with the merchant through the menu */
    message?: MessageProps;
    /** A boolean property indicating whether the menu is currently open */
    open: boolean;
    /** A string that provides the accessibility labeling */
    accessibilityLabel?: string;
    /** A custom width value that can be used to set the width of the menu */
    customWidth?: string;
    /** A boolean property indicating whether the menu is being used as a user menu */
    userMenu?: boolean;
}
