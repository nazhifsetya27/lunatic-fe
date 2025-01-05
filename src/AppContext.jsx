import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useCookies } from 'react-cookie'
import { debounce } from 'lodash'
import { get } from './services/NetworkUtils'
import { Access } from './services/Helper'
import { myToaster } from './components/Toaster/MyToaster'

const AppService = {
  getSession: async () => await get('/auth/session'),
}

const AppContext = createContext()

function AppProvider({ children }) {
  const [slider, setSlider] = useState(false)
  const [user, setUser] = useState({})
  const [accesses, setAccesses] = useState([])
  const [cookies] = useCookies(['token'])

  const getSession = useCallback(
    () =>
      AppService.getSession()
        .then((res) => {
          setUser({
            ...res.data,
            photo_url: `${res.data.photo_url}?time=${new Date().getTime()}`,
          })
        })
        .catch(myToaster),
    []
  )

  useEffect(() => {
    getSession()
  }, [])

  const contextValue = useMemo(
    () => ({
      slider,
      setSlider,
      user,
      setUser,
      accesses,
      setAccesses,
      getSession,
    }),
    [slider, user, accesses]
  )

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  )
}

const useApp = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

export { AppProvider, useApp }
