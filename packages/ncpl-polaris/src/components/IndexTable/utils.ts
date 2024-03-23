export function getTableHeadingsBySelector(
  wrapperElement: HTMLElement | null | undefined,
  selector: string,
) {
  return wrapperElement
    ? Array.from(wrapperElement.querySelectorAll<HTMLElement>(selector))
    : [];
}
