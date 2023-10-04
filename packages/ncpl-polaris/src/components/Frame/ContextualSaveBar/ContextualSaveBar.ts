import { Component } from "vue";

type ContextualSaveBarAction = {
  url?: string;
  content?: string;
  loading?: boolean;
  disabled?: boolean;
  onAction?: () => void;
};

interface ContextualSaveBarDiscardActionProps {
  /** Whether to show a modal confirming the discard action */
  discardConfirmationModal?: boolean;
}

type ContextualSaveBarCombinedActionProps =
  ContextualSaveBarDiscardActionProps & ContextualSaveBarAction;


export interface ContextualSaveBarProps {
  /** Extend the contents section to be flush with the left edge  */
  alignContentFlush?: boolean;
  /** Accepts a string of content that will be rendered to the left of the actions */
  message?: string;
  /** Save or commit contextual save bar action with text defaulting to 'Save' */
  saveAction?: ContextualSaveBarAction;
  /** Discard or cancel contextual save bar action with text defaulting to 'Discard' */
  discardAction?: ContextualSaveBarCombinedActionProps;
  /** Remove the normal max-width on the contextual save bar */
  fullWidth?: boolean;
  /** Accepts a component that is used to help users switch between different contexts */
  contextControl?: Component;
  /** Accepts a node that is rendered to the left of the discard and save actions */
  secondaryMenu?: Component;
}

