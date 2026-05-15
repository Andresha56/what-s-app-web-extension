const PHONE_LIKE_TEXT = /^\+?[\d\s().-]{8,}$/

function isPhoneLikeText(text: string): boolean {
  const trimmed = text.trim()

  if (trimmed.length < 8) {
    return false
  }

  return PHONE_LIKE_TEXT.test(trimmed)
}

function pushUnique(
  target: HTMLElement[],
  seen: Set<HTMLElement>,
  element: HTMLElement
): void {
  if (seen.has(element)) {
    return
  }

  seen.add(element)
  target.push(element)
}

/**
 * Phone numbers are not exposed with a single stable selector; combine
 * semantic links and a narrow header text scan.
 */
export function collectPhoneLikeElements(
  root: Document
): HTMLElement[] {
  const seen = new Set<HTMLElement>()
  const out: HTMLElement[] = []

  for (const link of root.querySelectorAll<HTMLElement>(
    "a[href^='tel:']"
  )) {
    pushUnique(out, seen, link)
  }

  const header = root.querySelector("#main header")

  if (header) {
    for (const node of header.querySelectorAll<HTMLElement>(
      "span.selectable-text, span.copyable-text"
    )) {
      const text = node.textContent ?? ""

      if (isPhoneLikeText(text)) {
        pushUnique(out, seen, node)
      }
    }
  }

  return out
}
