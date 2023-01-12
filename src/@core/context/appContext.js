// ** React Imports
import { createContext, useState } from 'react'

const initialState = {}

// ** Create Context
export const AppSessionContext = createContext({
  updateSessions: () => null,
  sessionData: initialState
})

export const AppSessionProvider = ({ children }) => {
  // ** State
  const [sessionData, setSessionData] = useState({ ...initialState })

  const updateSessions = session => {
    setSessionData(session)
  }

  return <AppSessionContext.Provider value={{ sessionData, updateSessions }}>{children}</AppSessionContext.Provider>
}

export const AppSessionConsumer = AppSessionContext.Consumer
