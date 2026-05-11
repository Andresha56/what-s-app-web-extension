import { BLUR_CLASS } from "../../shared/constants"
import "../../../globals.css"
import { queryElements } from "./dom-utils"
import { SELECTORS } from "./selectors"

function applyBlur(selector: string): void {
const elements = queryElements<HTMLElement>(selector)

for (const element of elements) {
element.classList.add(BLUR_CLASS)
}
}

export function applyPrivacyBlur(): void {
applyBlur(SELECTORS.messageText)
applyBlur(SELECTORS.sidebarPreview)
}
