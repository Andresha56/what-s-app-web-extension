import "../../../globals.css"

import {
  BLUR_CLASSES,
  HOVER_REVEAL_ROOT_CLASS
} from "../../shared/constants"
import type { PrivacySettings } from "../../shared/types/settings"
import { queryElements, toggleBlurClass } from "./dom-utils"
import { collectPhoneLikeElements } from "./phone-elements"
import { SELECTOR_GROUPS } from "./selectors"
import type { SelectorGroupKey } from "./selectors"

interface SelectorBlurBinding {
  readonly selectorKey: SelectorGroupKey
  readonly blurClass: (typeof BLUR_CLASSES)[keyof typeof BLUR_CLASSES]
  readonly isEnabled: (settings: PrivacySettings) => boolean
}

const SELECTOR_BLUR_BINDINGS: readonly SelectorBlurBinding[] = [
  {
    selectorKey: "messages",
    blurClass: BLUR_CLASSES.messages,
    isEnabled: (settings) =>
      settings.blurMessages &&
      !settings.excludeActiveConversation
  },
  {
    selectorKey: "sidebarPreview",
    blurClass: BLUR_CLASSES.sidebarPreviews,
    isEnabled: (settings) => settings.blurSidebarPreviews
  },
  {
    selectorKey: "names",
    blurClass: BLUR_CLASSES.names,
    isEnabled: (settings) => settings.blurNames
  },
  {
    selectorKey: "avatars",
    blurClass: BLUR_CLASSES.avatars,
    isEnabled: (settings) => settings.blurAvatars
  }
]

function applySelectorDrivenBlur(
  settings: PrivacySettings
): void {
  for (const binding of SELECTOR_BLUR_BINDINGS) {
    const shouldBlur = binding.isEnabled(settings)
    const selector = SELECTOR_GROUPS[binding.selectorKey]
    const elements = queryElements<HTMLElement>(
      document,
      selector
    )

    for (const element of elements) {
      toggleBlurClass(
        element,
        binding.blurClass,
        shouldBlur
      )
    }
  }
}

function applyPhoneBlur(settings: PrivacySettings): void {
  const shouldBlur = settings.blurPhoneNumbers
  const candidates = collectPhoneLikeElements(document)

  for (const element of candidates) {
    toggleBlurClass(
      element,
      BLUR_CLASSES.phoneNumbers,
      shouldBlur
    )
  }
}

function syncHoverRevealRoot(
  settings: PrivacySettings
): void {
  document.documentElement.classList.toggle(
    HOVER_REVEAL_ROOT_CLASS,
    settings.hoverReveal
  )
}

export function syncPrivacyBlur(
  settings: PrivacySettings
): void {
  syncHoverRevealRoot(settings)
  applySelectorDrivenBlur(settings)
  applyPhoneBlur(settings)
}
