import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import Navbar from './components/layout/Navbar.jsx'
import Home from './pages/Home.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar />
    <Home />
  </StrictMode>,
)
