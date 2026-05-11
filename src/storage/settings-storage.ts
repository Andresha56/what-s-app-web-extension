import { Storage } from "@plasmohq/storage"

import { DEFAULT_SETTINGS } from "./defaults"
import type { PrivacySettings } from "../shared/types/settings"

const storage = new Storage()

const SETTINGS_KEY = "privacy-settings"

export async function getSettings(): Promise<PrivacySettings> {
const settings = await storage.get<PrivacySettings>(SETTINGS_KEY)

return settings ?? DEFAULT_SETTINGS
}

export async function saveSettings(
settings: PrivacySettings
): Promise<void> {
await storage.set(SETTINGS_KEY, settings)
}
