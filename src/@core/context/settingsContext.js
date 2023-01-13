// ** React Imports
import { createContext, useState } from 'react'

// ** ThemeConfig Import
import themeConfig from 'src/configs/themeConfig'

const initialSettings = {
  themeColor: 'primary',
  mode: themeConfig.mode,
  contentWidth: themeConfig.contentWidth
}

const initialSessionData = {
  beds:{},
  hospitals: {},
  tasks:{},
  doctors: {},
  patients:{},
  bookings: {}
}

// ** Create Context
export const SettingsContext = createContext({
  saveSettings: () => null,
  settings: initialSettings,
  updateSessionsData: () => null,
  sessionData:initialSessionData
})

export const SettingsProvider = ({ children }) => {
  // ** State
  const [settings, setSettings] = useState({ ...initialSettings })
  const [sessionData, setSessionsData] = useState({...initialSessionData})

  const saveSettings = updatedSettings => {
    setSettings(updatedSettings)
  }

  const updateSessionsData = (data) => {
    setSessionsData({...sessionData, ...data})
  }

  return <SettingsContext.Provider value={{ settings, sessionData, saveSettings, updateSessionsData }}>{children}</SettingsContext.Provider>
}

export const SettingsConsumer = SettingsContext.Consumer
