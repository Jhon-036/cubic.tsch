import { useState } from "react"
import { API_URL } from "../../utils/ConfigApi"
import { Eye, EyeClosed } from "lucide-react"

const LoginForm = () => {
  const [eyes, setEyes] = useState(false)
  const [dataForm, setDataForm] = useState({
    username: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    setDataForm((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleEyes = () => {
    setEyes(!eyes)
  }

  const handleForm = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch(`${API_URL}auth/login`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataForm)
      })
      const data = await res.json()

      if (!res.ok) {
        alert(data.message || data.error || 'Credenciales inválidas')
        return
      }

      localStorage.setItem('token', data.token)
      alert(data.mensaje || 'Ingresado correctamente')
      window.location.href = '/dashboard'

    } catch (err) {
      alert('Ocurrio un error')
      console.log(err)
    }
  }

  return (
    <form
      className="flex flex-col p-12 rounded bg-[#13233b] w-96"
      onSubmit={handleForm}
    >
      <h2 className="text-center text-2xl">Iniciar Sesión</h2>
      <div className="flex flex-col gap-2 pt-8">
        <label htmlFor="username">Usuario :</label>
        <input
          type="text"
          id="username"
          name="username"
          value={dataForm.username}
          onChange={handleChange}
          className="outline-0 border-b border-gray-500 py-1 transition-all duration-25 focus:border-b-2 focus:border-gray-300"
        />
      </div>
      <div className="flex flex-col gap-2 pt-4">
        <label htmlFor="username">Contraseña :</label>
        <div className="flex items-center">
          <input
            type={eyes ? 'text' : 'password'}
            id="password"
            name="password"
            value={dataForm.password}
            onChange={handleChange}
            autoComplete="off"
            className="outline-0 border-b w-full border-gray-500 py-1 transition-all duration-25 focus:border-b-2 focus:border-gray-300"
          />
          <div 
            className="cursor-pointer pl-2" onClick={handleEyes}>
            {eyes ? <EyeClosed /> : <Eye />}
          </div>
        </div>
      </div>
      <button
        type="submit"
        className=" cursor-pointer bg-[#0a1b38] py-2 px-6 rounded hover:bg-[#0a1b38c4] transition mt-12"
      >Ingresar</button>
    </form>
  )
}
export default LoginForm