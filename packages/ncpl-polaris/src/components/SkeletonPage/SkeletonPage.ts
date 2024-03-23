export type SkeletonPageProps = {
    /** Page title, in large type */
    title?: string;
    /** Remove the normal max-width on the page */
    fullWidth?: boolean;
    /** Decreases the maximum layout width. Intended for single-column layouts */
    narrowWidth?: boolean;
    /** Shows a skeleton over the primary action */
    primaryAction?: boolean;
    /** Shows a skeleton over the backAction */
    backAction?: boolean;
}
