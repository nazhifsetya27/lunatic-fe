import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import SimpleBar from 'simplebar-react'
import { AppProvider } from './AppContext'
import Welcome from './pages/Welcome'
import AssetManagement from './pages/asset-management'
import Furniture from './pages/asset-management/furniture'
import MyNavigation from './components/Navigation/MyNavigation'
import { FurnitureProvider } from './pages/asset-management/furniture/context'

function App() {
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
      <AppProvider>
        <div id="main-content" className="relative flex h-screen w-full">
          <MyNavigation />
          <div className="relative flex h-screen w-full flex-col">
            <Routes>
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
              </Route>
            </Routes>
          </div>
        </div>
      </AppProvider>
    </>
  )
}

export default App
