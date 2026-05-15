import { useEffect, useState } from "react"

import "../globals.css"

import { DEFAULT_SETTINGS } from "~/src/storage/defaults"
import {
  getSettings,
  saveSettings
} from "~/src/storage/settings-storage"

import type { PrivacySettings } from "~/src/shared/types/settings"

type ToggleSettingKey =
  | "blurMessages"
  | "blurSidebarPreviews"
  | "blurNames"
  | "blurAvatars"
  | "blurPhoneNumbers"

function Popup() {
  const [settings, setSettings] =
    useState<PrivacySettings>(DEFAULT_SETTINGS)

  useEffect(() => {
    async function loadSettings() {
      const storedSettings = await getSettings()

      setSettings(storedSettings)
    }

    loadSettings()
  }, [])

  async function handleToggle(
    key: ToggleSettingKey
  ) {
    const updatedSettings: PrivacySettings = {
      ...settings,
      [key]: !settings[key]
    }

    setSettings(updatedSettings)

    await saveSettings(updatedSettings)
  }

  return (
    <main className="w-[340px] bg-zinc-950 p-4 text-white">
      <h1 className="text-lg font-semibold">
        ChatShield
      </h1>

      <p className="mt-2 text-sm leading-snug text-zinc-400">
        Privacy features stay off until enabled. 
        Only enabled privacy controls are applied on WhatsApp Web.
      </p>

      <div className="mt-4 flex flex-col gap-3">
        <Toggle
          label="Blur Messages"
          checked={settings.blurMessages}
          onChange={() =>
            handleToggle("blurMessages")
          }
        />

        <Toggle
          label="Blur Left Panel"
          checked={
            settings.blurSidebarPreviews
          }
          onChange={() =>
            handleToggle(
              "blurSidebarPreviews"
            )
          }
        />

        <Toggle
          label="Blur Names"
          checked={settings.blurNames}
          onChange={() =>
            handleToggle("blurNames")
          }
        />

        <Toggle
          label="Blur Avatars"
          checked={settings.blurAvatars}
          onChange={() =>
            handleToggle("blurAvatars")
          }
        />

        <Toggle
          label="Blur Phone Numbers"
          checked={settings.blurPhoneNumbers}
          onChange={() =>
            handleToggle("blurPhoneNumbers")
          }
        />
      </div>
    </main>
  )
}

interface ToggleProps {
  label: string
  checked: boolean
  onChange: () => void
}

function Toggle({
  label,
  checked,
  onChange
}: ToggleProps) {
  return (
    <label className="flex items-center justify-between rounded-lg border border-zinc-800 px-3 py-2">
      <span>{label}</span>

      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
    </label>
  )
}

export default Popup
