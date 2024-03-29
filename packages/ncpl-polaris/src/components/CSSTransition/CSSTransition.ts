


export interface CSSTransitionClassNames {
  appear?: string | undefined;
  appearActive?: string | undefined;
  appearDone?: string | undefined;
  enter?: string | undefined;
  enterActive?: string | undefined;
  enterDone?: string | undefined;
  exit?: string | undefined;
  exitActive?: string | undefined;
  exitDone?: string | undefined;
}

export type CSSTransitionProps = {
  in?: boolean;
  nodeRef?: HTMLElement,
  classNames?: string | CSSTransitionClassNames,
  timeout?: number | { appear?: number | undefined; enter?: number | undefined; exit?: number | undefined },

  mode?: string,
  appear?: boolean,
  persisted?: boolean,
  unmountOnExit?: boolean,
  // // enter
  // onEnter: TransitionHookValidator,
  // onEntering: TransitionHookValidator,
  // onEntered: TransitionHookValidator,
  // // leave
  // onExit: TransitionHookValidator,
  // onExiting: TransitionHookValidator,
  // onExited: TransitionHookValidator,
  // // appear
  // onBeforeAppear: TransitionHookValidator,
  // onAppear: TransitionHookValidator,
  // onAfterAppear: TransitionHookValidator,
  // onAppearCancelled: TransitionHookValidator
};
