export interface TopBarProps {
    /** Toggles whether or not a navigation component has been provided. Controls the presence of the mobile nav toggle button */
    showNavigationToggle?: boolean;
    /** A boolean property indicating whether search results are currently visible. */
    searchResultsVisible?: boolean;
    /** Whether or not the search results overlay has a visible backdrop */
    searchResultsOverlayVisible?: boolean;
}