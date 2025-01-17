import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import 'simplebar-react/dist/simplebar.min.css'
import 'react-calendar/dist/Calendar.css'
import { AppProvider } from './AppContext'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <BrowserRouter>
    <AppProvider>
      <App />
    </AppProvider>
  </BrowserRouter>
  // </StrictMode>
)
