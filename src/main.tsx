import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Home from './home/Home.tsx'
import { ShowUsers } from './components/ShowUsers.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
)
