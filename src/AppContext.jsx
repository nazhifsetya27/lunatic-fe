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
import { useLocation, useNavigate } from 'react-router-dom'
import { get, post } from './services/NetworkUtils'
import { Access } from './services/Helper'
import { myToaster } from './components/Toaster/MyToaster'

const AppService = {
  getSession: async () => await get('/auth/session'),
  createStockAdjustmentFromQR: async (asset_id) =>
    post(`/stock-adjustment/${asset_id}`),
}

const AppContext = createContext()

function AppProvider({ children }) {
  const [slider, setSlider] = useState(false)
  const [user, setUser] = useState({})
  const [accesses, setAccesses] = useState([])
  const [isLoading, setisLoading] = useState(true)
  const [cookies] = useCookies(['token'])
  const nav = useNavigate()
  const location = useLocation()

  const getSession = useCallback(async () => {
    try {
      const res = await AppService.getSession()
      setUser({
        ...res.data,
        photo_url: `${res.data.photo_url}?time=${new Date().getTime()}`,
      })
    } catch (error) {
      console.error('Failed to fetch session:', error)
      setUser(null)
    } finally {
      setisLoading(false) // Ensure loading is complete
    }
  }, [])

  const createStockAdjustmentFromQR = useCallback(
    (asset_id) =>
      AppService.createStockAdjustmentFromQR(asset_id)
        .then((res) => {
          console.log(res)
          nav(`/stock-adjustment/${res?.data?.id}`, {
            state: {
              stock_adjustment_id: res?.data?.id,
              name: res?.data?.name,
            },
          })

          myToaster({
            status: 200,
            title: 'success create stock adjustment',
            message: 'please adjust your inventory',
          })
        })
        .catch(myToaster),
    []
  )

  useEffect(() => {
    // Call getSession only if "login" is not part of the path
    // if (!location.pathname.includes('login')) {
    getSession()
    // }
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
      createStockAdjustmentFromQR,
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
