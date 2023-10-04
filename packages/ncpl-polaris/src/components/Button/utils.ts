import type {ComplexAction} from '../types';
import { h ,type VNode} from "vue";

import Button from './Button.vue';
import type {ButtonProps} from './Button';

export function buttonsFrom(
  action: ComplexAction,
  overrides?: Partial<ButtonProps>,
): VNode<ButtonProps>;
export function buttonsFrom(
  actions: ComplexAction[],
  overrides?: Partial<ButtonProps>,
): VNode[];
export function buttonsFrom(
  actions: ComplexAction[] | ComplexAction,
  overrides: Partial<ButtonProps> = {},
) {
  if (Array.isArray(actions)) {
    return actions.map((action, index) => buttonFrom(action, overrides, index));
  } else {
    const action = actions;
    return buttonFrom(action, overrides);
  }
}

export function buttonFrom(
  {content, onAction, ...action}: ComplexAction,
  overrides?: Partial<ButtonProps>,
  key?: any,
) {
  return h(Button, { key, onClick:onAction,...action, ...overrides},{default:()=>content});
}
