import { Storage } from "@plasmohq/storage"

import { DEFAULT_SETTINGS } from "./defaults"
import type { PrivacySettings } from "../shared/types/settings"

const storage = new Storage()

export const SETTINGS_KEY = "privacy-settings" as const

export async function getSettings(): Promise<PrivacySettings> {
  const stored = await storage.get<
    Partial<PrivacySettings>
  >(SETTINGS_KEY)

  if (!stored) {
    return { ...DEFAULT_SETTINGS }
  }

  return { ...DEFAULT_SETTINGS, ...stored }
}

export async function saveSettings(
  settings: PrivacySettings
): Promise<void> {
  await storage.set(SETTINGS_KEY, settings)
}

export function getSettingsStorage(): Storage {
  return storage
}
