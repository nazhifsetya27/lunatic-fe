import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import SimpleBar from 'simplebar-react'
import { useCookies } from 'react-cookie'
import { AppProvider } from './AppContext'
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

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['token'])

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
                  path="/storage-management"
                  element={
                    <StorageManagementProvider>
                      <StorageManagement />
                    </StorageManagementProvider>
                  }
                />
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
