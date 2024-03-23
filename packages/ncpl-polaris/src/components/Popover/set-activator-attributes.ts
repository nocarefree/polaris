export function setActivatorAttributes(
  activator: HTMLElement,
  {
    id,
    active = false,
    ariaHaspopup,
    activatorDisabled = false,
  }: {
    id: string;
    active: boolean;
    ariaHaspopup?: boolean;
    activatorDisabled: boolean;
  },
) {
  if (!activatorDisabled) {
    activator.tabIndex = activator.tabIndex || 0;
  }

  activator.setAttribute('aria-controls', id);
  activator.setAttribute('aria-owns', id);
  activator.setAttribute('aria-expanded', String(active));
  activator.setAttribute('data-state', active ? 'open' : 'closed');

  if (typeof (ariaHaspopup) !== 'undefined') {
    activator.setAttribute('aria-haspopup', String(ariaHaspopup));
  }
}
