import { syncPrivacyBlur } from "./blur-manager"
import {
  getSettings,
  getSettingsStorage,
  SETTINGS_KEY
} from "../../storage/settings-storage"

let observer: MutationObserver | null = null
let scheduledFrame = 0
let plasmoStorageWatchAttached = false
let chromeStorageListenerAttached = false

async function applyFromStorage(): Promise<void> {
  const settings = await getSettings()

  syncPrivacyBlur(settings)
}

function schedulePrivacySync(): void {
  if (scheduledFrame !== 0) {
    return
  }

  scheduledFrame = requestAnimationFrame(() => {
    scheduledFrame = 0
    void applyFromStorage()
  })
}

function privacySettingsKeyChanged(
  changes: Record<string, chrome.storage.StorageChange>
): boolean {
  return Object.keys(changes).some(
    (key) =>
      key === SETTINGS_KEY ||
      key.includes(SETTINGS_KEY)
  )
}

function attachPlasmoStorageWatch(): void {
  if (plasmoStorageWatchAttached) {
    return
  }

  plasmoStorageWatchAttached = true
  const storage = getSettingsStorage()

  storage.watch({
    [SETTINGS_KEY]: () => {
      schedulePrivacySync()
    }
  })
}

function attachChromeStorageListener(): void {
  if (chromeStorageListenerAttached) {
    return
  }

  chromeStorageListenerAttached = true

  chrome.storage.onChanged.addListener(
    (changes, areaName) => {
      if (areaName !== "local") {
        return
      }

      if (privacySettingsKeyChanged(changes)) {
        schedulePrivacySync()
      }
    }
  )
}

export function initializeObserver(): void {
  void applyFromStorage()
  attachPlasmoStorageWatch()
  attachChromeStorageListener()

  observer = new MutationObserver(schedulePrivacySync)

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  })
}
