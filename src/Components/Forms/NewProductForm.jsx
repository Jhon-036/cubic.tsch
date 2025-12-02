import { useRef, useState } from "react"
import { API_URL } from "../../utils/ConfigApi"

const NewProductForm = ({ className, handleCloseForm, fetchProducts, category }) => {
  const fileInputRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    newCategory: '',
    partno: '',
    description: '',
    image: null,
    imageUrl: ''
  })
  const token = localStorage.getItem('token')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
        imageUrl: URL.createObjectURL(file)
      }))
    }
  }

  // const {data, error, loading} = useCreateProducts()

  const handleForm = async (e) => {
    e.preventDefault()

    // Si el usuario escribió una nueva categoría, usamos esa
    const categoryToSend = formData.newCategory || formData.category

    const dataToSend = new FormData()
    dataToSend.append('name', formData.name)
    dataToSend.append('category', categoryToSend)
    dataToSend.append("partno", formData.partno)
    dataToSend.append("description", formData.description)

    if (formData.image) {
      dataToSend.append('image', formData.image)
    }

    try {
      const res = await fetch(`${API_URL}products`, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: dataToSend
      })

      if (!res.ok) {
        alert('Error con el servidor')
        return
      }

      alert('Producto creado')
      if (fetchProducts) {
        fetchProducts()
      }

      handleCloseForm()
    } catch (err) {
      alert('Ocurrio un error, vuelve a intentar \nDetalle :\n' + err.message)
      console.log(err);
    }
  }

  return (
    <section className={`${className} w-full h-screen fixed top-0 left-0 bg-[#00000080] backdrop-blur-[2px]
                        `}>
      <div className="flex justify-center items-center h-screen">
        <form onSubmit={handleForm} className="bg-[#191D23] w-[600px] mx-8 flex flex-col gap-2 p-8 rounded">
          <h2 className="text-xl text-center">Crear producto</h2>
          <div className="pt-4 flex flex-col gap-2">
            <label
              htmlFor="name">Nombre :</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-[#262C36] rounded outline-0 text-sm px-2 py-1"
            />
          </div>
          <div className=" flex flex-col gap-2">
            <label
              htmlFor="partno">Part. No. :</label>
            <input
              type="text"
              id="partno"
              name="partno"
              value={formData.partno}
              onChange={handleChange}
              className="border border-[#262C36] rounded outline-0 text-sm px-2 py-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Cbo de categorias */}
            <div className=" flex flex-col gap-2">
              <label>Categoria :</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="bg-[#191D23] border border-[#262C36] rounded outline-0 px-2 py-1">

                <option></option>
                {category.map((cate, index) => (
                  <option value={cate} key={index}>{cate}</option>
                ))}
                <option>[Nuevo]</option>

              </select>
            </div>

            {/* Nuevo categoria */}
            <div className=" flex flex-col gap-2">
              <label
                htmlFor="category">Nueva categoria :</label>
              <input
                type="text"
                id="newCategory"
                name="newCategory"
                value={formData.newCategory}
                onChange={handleChange}
                className="border border-[#262C36] rounded outline-0 text-sm px-2 py-1"
              />
            </div>
          </div>

          <div className=" flex flex-col gap-2">
            <label
              htmlFor="description">Descripción :</label>
            <textarea
              rows={6}
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border border-[#262C36] rounded outline-0 text-sm px-2 py-1 resize-none">

            </textarea>
          </div>
          <div className=" flex flex-col gap-2">
            <label
              htmlFor="image">Imagen :</label>
            <input
              type="file"
              id="image"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="self-start text-sm cursor-pointer bg-[#262C36] py-2 px-6 rounded hover:bg-[#2d323b] transition"
            >Seleccionar archivo
            </button>
            {formData.image && (
              <span className="text-xs text-gray-400">
                Archivo seleccionado: {formData.image.name}
              </span>
            )}

            {formData.imageUrl && (
              <img
                src={formData.imageUrl}
                alt={formData.name}
                className="w-32 h-32 object-contain border border-[#262C36] rounded mb-2 bg-black/20"
              />
            )}
          </div>

          <div className="pt-8 self-end flex gap-4">
            <button type="button" onClick={handleCloseForm} className="text-sm cursor-pointer bg-[#262C36] py-2 px-6 rounded hover:bg-[#2d323b] transition">Cancelar</button>
            <button type="submit" className="text-sm cursor-pointer bg-white hover:bg-[#eeeeee] text-[#262C36] py-2 px-6 rounded transition">Crear producto</button>
          </div>
        </form>
      </div>
    </section>
  )
}
export default NewProductForm