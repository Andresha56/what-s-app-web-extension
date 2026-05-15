export function queryElements<T extends Element>(
  root: Document | Element,
  selector: string
): T[] {
  return Array.from(root.querySelectorAll<T>(selector))
}

export function toggleBlurClass(
  element: Element,
  blurClass: string,
  shouldBlur: boolean
): void {
  element.classList.toggle(blurClass, shouldBlur)
}
