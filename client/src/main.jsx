import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ErrorBoundary from './ErrorBoundary.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import './styles/global.scss'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <ErrorBoundary> */}
      <AuthProvider>
        <App />
      </AuthProvider>
    {/* </ErrorBoundary> */}
  </StrictMode>,
)
