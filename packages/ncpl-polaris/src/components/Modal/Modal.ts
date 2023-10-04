import type { FooterProps } from './Footer';

export interface ModalProps extends FooterProps {
    activator?: HTMLElement;
    /** Whether the modal is open or not */
    open: boolean;
    /** The url that will be loaded as the content of the modal */
    src?: string;
    /** The name of the modal content iframe */
    iFrameName?: string;
    /** The content for the title of the modal */
    title: string;
    /**
     * Hide the title in the modal
     * @default false
     */
    titleHidden?: boolean;
    /** Disable animations and open modal instantly */
    instant?: boolean;
    /** Automatically adds sections to modal */
    sectioned?: boolean;
    /** Increases the modal width */
    large?: boolean;
    /** Decreases the modal width */
    small?: boolean;
    /** Limits modal height on large sceens with scrolling */
    limitHeight?: boolean;
    /** Replaces modal content with a spinner while a background action is being performed */
    loading?: boolean;
    /** Removes Scrollable container from the modal content */
    noScroll?: boolean;
    /** Sets modal to the height of the viewport on small screens */
    fullScreen?: boolean;
}