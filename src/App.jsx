import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard'
import Menu from './Components/Global/Menu'
import Productos from './pages/Productos'
import Publicaciones from './pages/Publicaciones'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        
        <Route element={<Layout />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/productos' element={<Productos />} />
          <Route path='/publicaciones' element={<Publicaciones />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

function Layout() {
  return (
    <div>
      <Menu />
      <div>
        <Outlet /> {/* Este es el lugar donde se renderizarán las rutas hijas */}
      </div>
    </div>
  );
}


export default App
