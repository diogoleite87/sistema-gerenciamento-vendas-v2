import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import 'react-toastify/dist/ReactToastify.css';

import { ThemeContextProvider } from './contexts/ThemeContext/index.tsx';
import { AuthContextProvider } from './contexts/AuthContext/index.tsx';
import { CssBaseline } from '@mui/material';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <AuthContextProvider>
        <CssBaseline />
        <App />
      </AuthContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>,
)
