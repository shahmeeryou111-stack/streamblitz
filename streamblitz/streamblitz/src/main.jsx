import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <HashRouter>
        <App />
        <Toaster position="bottom-right" toastOptions={{
          style: { background:'#141414', color:'#f5f5f5', border:'1px solid #2a2a2a' }
        }}/>
      </HashRouter>
    </HelmetProvider>
  </React.StrictMode>
)
