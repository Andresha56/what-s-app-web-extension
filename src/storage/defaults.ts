import type { PrivacySettings } from "../shared/types/settings"

export const DEFAULT_SETTINGS: Readonly<PrivacySettings> = {
blurMessages: true,
blurSidebarPreviews: true,
blurNames: false,
blurAvatars: false,
hoverReveal: true,
excludeActiveConversation: false
}