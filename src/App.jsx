import './App.css'
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useCookies } from 'react-cookie'
import { useEffect } from 'react'
import { AppProvider, useApp } from './AppContext'
import Welcome from './pages/Welcome'
import AssetManagement from './pages/asset-management'
import Furniture from './pages/asset-management/furniture'
import MyNavigation from './components/Navigation/MyNavigation'
import { FurnitureProvider } from './pages/asset-management/furniture/context'
import Login from './pages/Login'
import { LoginProvider } from './pages/Login/context'
import Elektronik from './pages/asset-management/elektronik'
import { ElektronikProvider } from './pages/asset-management/elektronik/context'
import Umum from './pages/asset-management/umum'
import { UmumProvider } from './pages/asset-management/umum/context'
import Settings from './pages/settings'
import Condition from './pages/settings/kondisi'
import { ConditionProvider } from './pages/settings/kondisi/context'
import Building from './pages/settings/gedung'
import { BuildingProvider } from './pages/settings/gedung/context'
import Floor from './pages/settings/lantai'
import { FloorProvider } from './pages/settings/lantai/context'
import Room from './pages/settings/ruangan'
import { RoomProvider } from './pages/settings/ruangan/context'
import Unit from './pages/settings/unit'
import { UnitProvider } from './pages/settings/unit/context'
import StorageManagement from './pages/Storage-management'
import { StorageManagementProvider } from './pages/Storage-management/context'
import Profile from './pages/Profile'
import { ProfileProvider } from './pages/Profile/context'
import User from './pages/user'
import { UserProvider } from './pages/user/context'
import StockAdjustment from './pages/stock-adjustment'
import { StockAdjustmentProvider } from './pages/stock-adjustment/context'
import NotFound from './pages/404'
import StockAdjustmentInventory from './pages/stock-adjustment-inventory'
import { StockAdjustmentInventoryProvider } from './pages/stock-adjustment-inventory/context'
import FurnitureStockAdjustment from './pages/stock-adjustment-inventory/furniture'
import ElektronikStockAdjustment from './pages/stock-adjustment-inventory/elektronik'
import UmumStockAdjustment from './pages/stock-adjustment-inventory/umum'
import { myToaster } from './components/Toaster/MyToaster'

function App() {
  const { createStockAdjustmentFromQR } = useApp()
  const [cookies, setCookie, removeCookie] = useCookies(['token'])
  const [searchParams, setSearchParams] = useSearchParams()
  const nav = useNavigate()

  // from scan QR
  const isScan = searchParams.get('isScan')
  const asset_id = searchParams.get('asset_id')

  useEffect(() => {
    const handleScan = async () => {
      if (isScan === 'true') {
        try {
          await createStockAdjustmentFromQR(asset_id)
        } catch (error) {
          console.error('Error creating stock adjustment:', error)
          myToaster({
            status: 'error',
            message: 'An error occurred while processing the scan.',
          })
          nav('/')
        }
      }
    }

    handleScan() // Call the async function
  }, [isScan, asset_id, nav])

  return (
    <>
      <ToastContainer
        containerId="default"
        autoClose={5000}
        closeButton={false}
        enableMultiContainer
        hideProgressBar
        newestOnTop
        pauseOnFocusLoss
        draggable
        pauseOnHover
        closeOnClick
      />
      {cookies.token ? (
        <AppProvider>
          <div id="main-content" className="relative flex h-screen w-full">
            <MyNavigation />
            <div className="relative flex h-screen w-full flex-col">
              <Routes>
                <Route path="/login" element={<Navigate to="/" replace />} />
                <Route path="/" element={<Welcome />} />
                {/* ASSET */}
                <Route path="/asset" element={<AssetManagement />}>
                  <Route index element={<Navigate to="furniture" replace />} />
                  <Route
                    path="furniture"
                    element={
                      <FurnitureProvider>
                        <Furniture />
                      </FurnitureProvider>
                    }
                  />
                  <Route
                    path="elektronik"
                    element={
                      <ElektronikProvider>
                        <Elektronik />
                      </ElektronikProvider>
                    }
                  />
                  <Route
                    path="umum"
                    element={
                      <UmumProvider>
                        <Umum />
                      </UmumProvider>
                    }
                  />
                </Route>
                {/* SETTINGS */}
                <Route path="/settings" element={<Settings />}>
                  <Route index element={<Navigate to="gedung" replace />} />
                  <Route
                    path="gedung"
                    element={
                      <BuildingProvider>
                        <Building />
                      </BuildingProvider>
                    }
                  />
                  <Route
                    path="lantai"
                    element={
                      <FloorProvider>
                        <Floor />
                      </FloorProvider>
                    }
                  />
                  <Route
                    path="ruangan"
                    element={
                      <RoomProvider>
                        <Room />
                      </RoomProvider>
                    }
                  />
                  <Route
                    path="kondisi"
                    element={
                      <ConditionProvider>
                        <Condition />
                      </ConditionProvider>
                    }
                  />
                  <Route
                    path="unit"
                    element={
                      <UnitProvider>
                        <Unit />
                      </UnitProvider>
                    }
                  />
                </Route>
                <Route
                  path="/user"
                  element={
                    <UserProvider>
                      <User />
                    </UserProvider>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProfileProvider>
                      <Profile />
                    </ProfileProvider>
                  }
                />
                <Route
                  path="/storage-management"
                  element={
                    <StorageManagementProvider>
                      <StorageManagement />
                    </StorageManagementProvider>
                  }
                />
                <Route
                  path="/stock-adjustment"
                  element={
                    <StockAdjustmentProvider>
                      <StockAdjustment />
                    </StockAdjustmentProvider>
                  }
                />
                <Route
                  path="/stock-adjustment/:stock_adjustment_id"
                  element={
                    <StockAdjustmentInventoryProvider>
                      <StockAdjustmentInventory />
                    </StockAdjustmentInventoryProvider>
                  }
                >
                  <Route index element={<Navigate to="furniture" replace />} />
                  <Route
                    path="furniture"
                    element={<FurnitureStockAdjustment />}
                  />
                  <Route
                    path="elektronik"
                    element={<ElektronikStockAdjustment />}
                  />
                  <Route path="umum" element={<UmumStockAdjustment />} />
                </Route>
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
            </div>
          </div>
        </AppProvider>
      ) : (
        <Routes>
          <Route path="*" element={<Navigate to="/login" replace />} />
          <Route
            path="/login"
            element={
              <LoginProvider>
                <Login />
              </LoginProvider>
            }
          />

          {/* <Route
            path="/forget-password"
            element={
              <ForgetPasswordProvider>
                <ForgetPassword />
              </ForgetPasswordProvider>
            }
          /> */}
        </Routes>
      )}
    </>
  )
}

export default App
