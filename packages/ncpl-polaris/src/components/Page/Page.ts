import type { PageHeaderProps } from './Header';

export interface PageProps extends PageHeaderProps {
    /** Remove the normal max-width on the page */
    fullWidth?: boolean;
    /** Decreases the maximum layout width. Intended for single-column layouts */
    narrowWidth?: boolean;
    /** Displays a divider between the page header and the page content */
    divider?: boolean;
}