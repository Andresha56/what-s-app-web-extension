export const BLUR_CLASSES = {
  messages: "chatshield-blur--messages",
  sidebarPreviews: "chatshield-blur--sidebar-previews",
  names: "chatshield-blur--names",
  avatars: "chatshield-blur--avatars",
  phoneNumbers: "chatshield-blur--phone-numbers"
} as const

export type BlurClassName =
  (typeof BLUR_CLASSES)[keyof typeof BLUR_CLASSES]

export const HOVER_REVEAL_ROOT_CLASS = "chatshield-hover-reveal" as const
