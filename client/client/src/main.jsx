import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider}  from './context/Auth.jsx'
import { SearchProvider } from './context/Search.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <SearchProvider>
      <App />
      </SearchProvider>
    
    </AuthProvider>
    
    </BrowserRouter>
  
  </React.StrictMode>,
)
