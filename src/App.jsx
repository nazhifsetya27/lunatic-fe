import './App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { AppProvider } from './AppContext'
import Welcome from './pages/Welcome'

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" element={<Welcome />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  )
}

export default App
