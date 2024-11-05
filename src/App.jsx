import './App.css'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import SimpleBar from 'simplebar-react'
import { AppProvider } from './AppContext'
import Welcome from './pages/Welcome'
import SideNavbar from './components/Navigation'

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
      <div className="relative flex h-screen w-full flex-col">
        <SimpleBar
          forceVisible="y"
          className="flex-1"
          style={{ height: '100vh' }}
        >
          <SideNavbar />
          <AppProvider>
            <Routes>
              <Route path="/" element={<Welcome />} />
            </Routes>
          </AppProvider>
        </SimpleBar>
      </div>
    </>
  )
}

export default App
