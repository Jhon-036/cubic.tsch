import { Box, Grid2X2, LogOut, SquareLibrary } from "lucide-react"
import { NavLink, useNavigate } from "react-router-dom"

const Menu = () => {
  const navigate = useNavigate()

  const handleLogOut = () => {
    navigate('/login')
  }
  
  return (
    <header className="bg-[#191D23] w-[250px] fixed top-0 left-0  h-screen text-[#B8C0CC]">
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
                to={'/'}
                className={({ isActive }) =>
                  `flex py-4 px-10 items-center gap-2 transition
                  ${isActive ? 'bg-[#262C36] text-white ' : ''}`}>
                {({ isActive }) => (
                  <>
                    <Grid2X2 strokeWidth={1.5} size={20} color={isActive ? '#7B57E0' : '#B8C0CC'}/>
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
                    <Box strokeWidth={1.5} size={20} color={isActive ? '#7B57E0' : '#B8C0CC'}/>
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
                    <SquareLibrary strokeWidth={1.5} size={20} color={isActive ? '#7B57E0' : '#B8C0CC'}/>
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
  )
}
export default Menu