import { applyPrivacyBlur } from "./blur-manager"

let observer: MutationObserver | null = null

function handleMutations(): void {
applyPrivacyBlur()
}

export function initializeObserver(): void {
applyPrivacyBlur()

observer = new MutationObserver(handleMutations)

observer.observe(document.body, {
childList: true,
subtree: true
})
}
