import type { PrivacySettings } from "../shared/types/settings"

/**
 * Blur toggles default off: nothing is obscured until the user opts in via the popup.
 */
export const DEFAULT_SETTINGS: Readonly<PrivacySettings> = {
  blurMessages: false,
  blurSidebarPreviews: false,
  blurNames: false,
  blurAvatars: false,
  blurPhoneNumbers: false,
  hoverReveal: true,
  excludeActiveConversation: false
}
