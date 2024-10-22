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
import { myToaster } from './components/MyToaster'

const AppService = {
  getSession: async () => await get('/v1/auth/session'),
}

const AppContext = createContext()

function AppProvider({ children }) {
  const [slider, setSlider] = useState(false)
  const [user, setUser] = useState({})
  const [accesses, setAccesses] = useState([])
  const [cookies] = useCookies(['tokenWarehouse'])
  // console.log(accesses)

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

  const getAccess = (accesName) =>
    accesses?.find(
      (acc) =>
        acc.name === accesName || acc.name === Access?.ALL_MODULE_WAREHOUSE
    )

  // const chatSocket = useMemo(
  //   () =>
  //     io(`${import.meta.env.VITE_APP_CHAT_HOST}/v1`, {
  //       query: { authorization: `Bearer ${cookies.tokenWarehouse}` },
  //       autoConnect: true,
  //       transports: ['websocket'],
  //       path: '/chat/socket.io',
  //     }),
  //   [cookies.tokenWarehouse]
  // )
  // const sendOnline = debounce(
  //   () => chatSocket.emit('update-online-status', true),
  //   5000
  // )
  useEffect(
    () => {
      getSession()

      // sendOnline()
      // const handleBeforeUnload = () => {
      //   chatSocket.emit('update-online-status', false)
      // }

      // window.addEventListener('beforeunload', handleBeforeUnload)

      return () => {
        // chatSocket.emit('update-online-status', false)
        // window.removeEventListener('beforeunload', handleBeforeUnload)
      }
    },
    [
      /* chatSocket */
    ]
  )

  return (
    <AppContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        slider,
        setSlider,
        user,
        setUser,
        // chatSocket,
        accesses,
        setAccesses,
        getAccess,
        getSession,
      }}
    >
      {children}
    </AppContext.Provider>
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
