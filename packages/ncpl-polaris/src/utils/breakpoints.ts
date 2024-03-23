const Breakpoints = {
  // TODO: Update to smDown
  navigationBarCollapsed: "767.95px",
  // TODO: Update to lgDown
  stackedContent: "1039.95px",
};

function noop() {}

const noWindowMatches: MediaQueryList = {
  media: "",
  addListener: noop,
  removeListener: noop,
  matches: false,
  onchange: noop,
  addEventListener: noop,
  removeEventListener: noop,
  dispatchEvent: (_: Event) => true,
};

export function navigationBarCollapsed() {
  return typeof window === "undefined"
    ? noWindowMatches
    : window.matchMedia(`(max-width: ${Breakpoints.navigationBarCollapsed})`);
}

export function stackedContent() {
  return typeof window === "undefined"
    ? noWindowMatches
    : window.matchMedia(`(max-width: ${Breakpoints.stackedContent})`);
}
