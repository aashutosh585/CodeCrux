import { StrictMode } from 'react'
import React from 'react'
import { BrowserRouter } from 'react-router'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DarkModeProvider } from './contexts/DarkModeContext.jsx'
import { AppContextProvider } from './contexts/AppContext.jsx'

createRoot(document.getElementById('root')).render(

    <BrowserRouter>
      <AppContextProvider>
        <DarkModeProvider>
          <App />
        </DarkModeProvider>
      </AppContextProvider>
    </BrowserRouter>

)
