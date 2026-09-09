import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './context/AuthContext.jsx'
import './styles/global.scss'
import App from './App.jsx'

window.onerror = (msg, src, line, col, err) => {
  document.body.innerHTML = `
    <pre style="padding:20px;color:red;white-space:pre-wrap;font-size:14px;">
${err?.stack || `${msg}\n${src}:${line}:${col}`}
    </pre>
  `;
};

window.onunhandledrejection = (e) => {
  document.body.innerHTML = `
    <pre style="padding:20px;color:red;white-space:pre-wrap;font-size:14px;">
${e.reason?.stack || e.reason}
    </pre>
  `;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
