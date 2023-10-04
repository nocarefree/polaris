export interface PaneProps {
  /** Fix the pane to the top of the popover */
  fixed?: boolean;
  /** Automatically wrap children in padded sections */
  sectioned?: boolean;
  /** The pane content */
  /** Sets a fixed height and max-height on the Scrollable */
  height?: string;
  /** Callback when the bottom of the popover is reached by mouse or keyboard  */
  onScrolledToBottom?(): void;
  /**
   * Prevents page scrolling when the end of the scrollable Popover content is reached
   * @default false
   */
  captureOverscroll?: boolean;
  /**
   * Sets a subdued background to the pane
   * @default false
   */
  subdued?: boolean;
}