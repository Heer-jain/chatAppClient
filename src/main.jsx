import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {CssBaseline} from "@mui/material"
import {Provider} from 'react-redux'
import store from './redux/store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <CssBaseline/>  
      <div onContextMenu={(e) => e.preventDefault()}>
        <App />
      </div>  
    </Provider>
  </StrictMode>,
)
