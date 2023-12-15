export interface TagProps {
    /** Disables the tag  */
    disabled?: boolean;
    /** Clickable the tag  */
    clickable?: boolean;
    /** Removable the tag  */
    removable?: boolean;
    /** A string to use when tag has more than textual content */
    accessibilityLabel?: string;
    /** Url to navigate to when tag is clicked or keypressed. */
    url?: string;
}
