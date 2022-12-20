import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { SnippetsContextProvider } from './context/SnippetsContext';
import { AuthContextProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthContextProvider>
      <SnippetsContextProvider>
          <App />
      </SnippetsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
