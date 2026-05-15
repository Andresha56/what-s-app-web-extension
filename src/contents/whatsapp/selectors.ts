/**
 * Prefer stable attributes (data-testid, role, id) over obfuscated class names.
 * #pane-side / #main are long-lived WhatsApp Web layout roots.
 */
export const SELECTOR_GROUPS = {
  /** Whole bubble (text, captions, embeds) — not only inner spans */
  messages: "#main div[data-testid='msg-container']",
  sidebarPreview: [
    "#pane-side div[role='gridcell'] span[dir='ltr']",
    "#pane-side div[role='gridcell'] span[dir='rtl']",
    "#pane-side div[role='gridcell'] span.selectable-text"
  ].join(","),
  names: [
    "#pane-side div[role='gridcell'] span[title]",
    "#pane-side div[role='row'] span[title]",
    "#main [data-testid='conversation-info-header-chat-title']",
    "#main header h1 span",
    "#main header span[data-testid='selectable-text']"
  ].join(","),
  avatars: [
    "#pane-side img[src*='pps.whatsapp.net']",
    "#pane-side img[src*='whatsapp.net/profile']",
    "#main header img[src*='pps.whatsapp.net']",
    "#main header img[src*='whatsapp.net/profile']",
    "#main div[data-testid='msg-container'] img[src*='pps.whatsapp.net']",
    "#main div[data-testid='msg-container'] img[src*='whatsapp.net/profile']",
    "#pane-side div[role='img'][aria-label]",
    "#main header div[role='img'][aria-label]",
    "#main div[data-testid='msg-container'] div[role='img']"
  ].join(",")
} as const

export type SelectorGroupKey = keyof typeof SELECTOR_GROUPS
