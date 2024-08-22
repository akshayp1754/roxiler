import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import { DataProvider } from './context/dataProvider.js'

createRoot(document.getElementById('root')).render(
  // <DataProvider>
  <App />
// </DataProvider>,
)
