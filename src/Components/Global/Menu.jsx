import { Box, Grid2X2, LogOut, MenuIcon, SquareLibrary, X } from "lucide-react"
import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"

const Menu = () => {
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)

  const handleLogOut = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  const handleShowMenu = () => {
    setShowMenu(true)
  }

  const handleNoMenu = () => {
    setShowMenu(false)
  }

  return (
    <>
      <header className="bg-[#191D23] w-[250px] fixed top-0 left-0 h-screen text-[#B8C0CC] max-xl:hidden">
        <div className="h-full flex flex-col">
          <section className="flex gap-1 items-center uppercase">
            <div className="my-8 mx-14 flex gap-1 items-center">
              <img
                src="/logo.png"
                alt="admin.tsch"
                className="w-[180px]"
              />
            </div>
          </section>
          <section className="h-full">
            <ul>
              <li className="block hover:bg-[#262C36] cursor-pointer">
                <NavLink
                  to={'/dashboard'}
                  className={({ isActive }) =>
                    `flex py-4 px-10 items-center gap-2 transition
                  ${isActive ? 'bg-[#262C36] text-white ' : ''}`}>
                  {({ isActive }) => (
                    <>
                      <Grid2X2 strokeWidth={1.5} size={20} color={isActive ? '#7B57E0' : '#B8C0CC'} />
                      <p className="">Dashboard</p>
                    </>
                  )}
                </NavLink>
              </li>
              <li className="block hover:bg-[#262C36] cursor-pointer">
                <NavLink
                  to={'/productos'}
                  className={({ isActive }) =>
                    `flex py-4 px-10 items-center gap-2 transition
                  ${isActive ? 'bg-[#262C36] text-white ' : ''}`}>
                  {({ isActive }) => (
                    <>
                      <Box strokeWidth={1.5} size={20} color={isActive ? '#7B57E0' : '#B8C0CC'} />
                      <p className="">Productos</p>
                    </>
                  )}
                </NavLink>
              </li>
              <li className="block hover:bg-[#262C36] cursor-pointer">
                <NavLink
                  to={'/publicaciones'}
                  className={({ isActive }) =>
                    `flex py-4 px-10 items-center gap-2 transition
                  ${isActive ? 'bg-[#262C36] text-white ' : ''}`}>
                  {({ isActive }) => (
                    <>
                      <SquareLibrary strokeWidth={1.5} size={20} color={isActive ? '#7B57E0' : '#B8C0CC'} />
                      <p className="">Publicaciones</p>
                    </>
                  )}
                </NavLink>
              </li>
            </ul>
          </section>
          <section className="my-8 hover:bg-[#262C36] cursor-pointer py-4 px-10">
            <button
              className="flex items-center gap-2 cursor-pointer"
              onClick={handleLogOut}
            >
              <LogOut strokeWidth={1.2} size={20} />
              <p className="">Cerrar sesión</p>
            </button>
          </section>
        </div>
      </header>


      <section className="fixed top-4 right-0 xl:hidden z-50">

        {/* Botón Hamburguesa */}
        <div
          onClick={handleShowMenu}
          className="rounded-bl-full rounded-tl-full bg-[#282b31] p-3 z-50"
        >
          <MenuIcon />
        </div>

        {/* Fondo Oscuro */}
        <div
          onClick={handleNoMenu}
          className={`fixed inset-0 bg-black/40 transition-opacity duration-300
      ${showMenu ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
    `}
        />

        {/* Panel del Menú */}
        <section
          className={`
      fixed top-0 right-0 h-full w-3/4 sm:w-1/2 bg-[#282b31] 
      transition-transform duration-300 ease-in-out
      ${showMenu ? "translate-x-0" : "translate-x-full"}
    `}
        >
          <ul>
            <li onClick={handleNoMenu} className="block hover:bg-[#262C36] cursor-pointer">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `flex py-4 px-10 items-center gap-2 transition
            ${isActive ? "bg-[#262C36] text-white" : ""}`
                }
              >
                {({ isActive }) => (
                  <>
                    <Grid2X2 strokeWidth={1.5} size={20} color={isActive ? "#7B57E0" : "#B8C0CC"} />
                    <p>Dashboard</p>
                  </>
                )}
              </NavLink>
            </li>

            <li onClick={handleNoMenu} className="block hover:bg-[#262C36] cursor-pointer">
              <NavLink
                to="/productos"
                className={({ isActive }) =>
                  `flex py-4 px-10 items-center gap-2 transition
            ${isActive ? "bg-[#262C36] text-white" : ""}`
                }
              >
                {({ isActive }) => (
                  <>
                    <Box strokeWidth={1.5} size={20} color={isActive ? "#7B57E0" : "#B8C0CC"} />
                    <p>Productos</p>
                  </>
                )}
              </NavLink>
            </li>

            <li onClick={handleNoMenu} className="block hover:bg-[#262C36] cursor-pointer">
              <NavLink
                to="/publicaciones"
                className={({ isActive }) =>
                  `flex py-4 px-10 items-center gap-2 transition
            ${isActive ? "bg-[#262C36] text-white" : ""}`
                }
              >
                {({ isActive }) => (
                  <>
                    <SquareLibrary strokeWidth={1.5} size={20} color={isActive ? "#7B57E0" : "#B8C0CC"} />
                    <p>Publicaciones</p>
                  </>
                )}
              </NavLink>
            </li>
          </ul>
        </section>
      </section>

    </>
  )
}
export default Menu