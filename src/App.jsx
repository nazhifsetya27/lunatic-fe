import './App.css'
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useCookies } from 'react-cookie'
import { useEffect, useState } from 'react'
import { useMediaQuery } from '@mui/material'
import { Menu01 } from '@untitled-ui/icons-react'
import { AppProvider, useApp } from './AppContext'
import Welcome from './pages/Welcome'
import AssetManagement from './pages/asset-management'
import Furniture from './pages/asset-management/furniture'
import MyNavigation from './components/Navigation/MyNavigation'
import { FurnitureProvider } from './pages/asset-management/furniture/context'
import Login from './pages/Login'
import { LoginProvider } from './pages/Login/context'
import ApprovalWarehouse from './pages/Approval'
import { ApprovalProvider } from './pages/Approval/context'
import Elektronik from './pages/asset-management/elektronik'
import { ElektronikProvider } from './pages/asset-management/elektronik/context'
import Umum from './pages/asset-management/umum'
import { UmumProvider } from './pages/asset-management/umum/context'
import Settings from './pages/settings'
import Condition from './pages/settings/kondisi/index'
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
import MyModalSlider from './components/ModalSlider/MyModalSlider'
import MyButtonIcon from './components/Button/MyButtonIcon'
import Dashboard from './pages/dashboard'
import { DashboardProvider } from './pages/dashboard/context'

function App() {
  const { createStockAdjustmentFromQR, user, isLoading } = useApp()
  const [cookies, setCookie, removeCookie] = useCookies(['token'])
  const [searchParams, setSearchParams] = useSearchParams()
  const nav = useNavigate()
  const location = useLocation()
  const isMobile = useMediaQuery('(max-width:640px)')

  const [currentSlider, setCurrentSlider] = useState({
    status: false,
    current: null,
  })

  const handleCurrentSlider = (slider, id) => {
    if (slider) {
      setCurrentSlider((value) => ({ ...value, ...slider, id }))
    } else {
      setCurrentSlider({ current: null })
    }
  }

  const isAllowed = (role, allowedRoles) => allowedRoles?.includes(role)

  // Access control logic
  function ProtectedRoute({ element, allowedRoles }) {
    if (isLoading) {
      // Show a loading spinner or placeholder while user data is being fetched
      return <div>Loading...</div>
    }

    if (!isAllowed(user?.role, allowedRoles) && isLoading) {
      myToaster({
        status: 'error',
        message: 'Access denied',
      })
      return <Navigate to="/" replace />
    }
    return element
  }

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

    // console.log('location : ', !location.pathname.includes('login'))

    if (!location.pathname.includes('login')) {
      handleScan() // Call the async function
    }
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
        draggablePercent={30} // Adjust the swipe distance percentage for dismissal
        pauseOnHover
        closeOnClick
      />
      {cookies.token ? (
        <AppProvider>
          {isMobile && (
            <MyModalSlider
              alignment="left"
              open={currentSlider?.current === 'nav'}
              element={<MyNavigation />}
              onClose={() => handleCurrentSlider(null)}
            />
          )}
          <div
            id="main-content"
            className={`relative flex ${
              isMobile ? 'flex-col' : 'flex-row'
            } h-screen w-full`}
          >
            {isMobile ? (
              <div className="pl-8 pt-4">
                <MyButtonIcon
                  color="gray"
                  type="outlined"
                  onClick={() => handleCurrentSlider({ current: 'nav' })}
                >
                  <Menu01 />
                </MyButtonIcon>
              </div>
            ) : (
              <MyNavigation />
            )}
            <div className="relative flex h-screen w-full flex-col">
              <Routes>
                <Route path="/login" element={<Navigate to="/" replace />} />
                <Route
                  path="/"
                  element={
                    <DashboardProvider>
                      <Dashboard />
                    </DashboardProvider>
                  }
                />
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
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute
                      element={<Settings />}
                      allowedRoles={['Administrator', 'Approver']}
                    />
                  }
                >
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
                {/* USER */}
                <Route
                  path="/user"
                  element={
                    <ProtectedRoute
                      element={
                        <UserProvider>
                          <User />
                        </UserProvider>
                      }
                      allowedRoles={['Administrator']}
                    />
                  }
                />
                {/* PROFILE */}
                <Route
                  path="/profile"
                  element={
                    <ProfileProvider>
                      <Profile />
                    </ProfileProvider>
                  }
                />
                {/* STORAGE MANAGEMENT */}
                <Route
                  path="/storage-management"
                  element={
                    <ProtectedRoute
                      element={
                        <StorageManagementProvider>
                          <StorageManagement />
                        </StorageManagementProvider>
                      }
                      allowedRoles={['Administrator', 'Approver']}
                    />
                  }
                />
                {/* STOCK ADJUSTMENT */}
                <Route
                  path="/stock-adjustment"
                  element={
                    <StockAdjustmentProvider>
                      <StockAdjustment />
                    </StockAdjustmentProvider>
                  }
                />
                {/* STOCK ADJUSTMENT INVENTORY */}
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
                {/* APPROVAL */}
                <Route
                  path="/approval"
                  element={
                    <ProtectedRoute
                      element={
                        <ApprovalProvider>
                          <ApprovalWarehouse />
                        </ApprovalProvider>
                      }
                      allowedRoles={['Administrator', 'Approver']}
                    />
                  }
                />
                {/* <Route
                  path="/"
                  element={
                    <ProtectedRoute
                      element={
                        <DashboardProvider>
                          <Dashboard />
                        </DashboardProvider>
                      }
                      allowedRoles={['Administrator', 'Approver']}
                    />
                  }
                /> */}
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
          <Route
            path="/login?isScan=true&asset_id=..."
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
