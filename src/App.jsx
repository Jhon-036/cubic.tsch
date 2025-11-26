import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard'
import Menu from './Components/Global/Menu'
import Productos from './pages/Productos'
import Publicaciones from './pages/Publicaciones'
import Login from './pages/Login'

function App() {

  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/productos' element={<Productos />} />
        <Route path='/publicaciones' element={<Publicaciones />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
