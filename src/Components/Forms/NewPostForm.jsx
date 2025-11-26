import { useRef, useState } from "react"

const NewPostForm = ({ handleCloseForm, fetchPosts, filter }) => {
  const fileInputRef = useRef(null)
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    newCategory: '',
    resume: '',
    fullContent: '',
    image: null,
    imageUrl: ''
  })

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

  const handleForm = async (e) => {
    e.preventDefault()

    // Si el usuario escribió una nueva categoría, usamos esa
    const categoryToSend = formData.newCategory || formData.category

    const dataToSend = new FormData()
    dataToSend.append('title', formData.title)
    dataToSend.append('category', categoryToSend)
    dataToSend.append("resume", formData.resume)
    dataToSend.append("fullContent", formData.fullContent)

    if (formData.image) {
      dataToSend.append('image', formData.image)
    }

    try {
      const res = await fetch(`http://localhost:3000/api/v1/posts`, {
        method: 'POST',
        body: dataToSend
      })

      if (!res.ok) {
        alert('Error con el servidor')
        return
      }

      alert('Publicación creado')
      if (fetchPosts) {
        fetchPosts()
      }

      handleCloseForm()
    } catch (err) {
      alert('Ocurrio un error, vuelve a intentar \nDetalle :\n' + err.message)
      console.log(err);
    }
  }

  return (
    <section className={`w-full h-screen fixed top-0 left-0 bg-[#00000080] backdrop-blur-[2px]`}>
      <div className="flex justify-center items-center h-screen">
        <form onSubmit={handleForm} className="bg-[#191D23] w-2/6 flex flex-col gap-2 p-8 rounded">
          <h2 className="text-xl text-center">Actualizar publicación</h2>
          <div className="pt-4 flex flex-col gap-2">
            <label
              htmlFor="name">Título :</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border border-[#262C36] rounded outline-0 text-sm px-2 py-1"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {/* Cbo de categorias */}
            <div className=" flex flex-col gap-2">
              <label>Filtro :</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="bg-[#191D23] border border-[#262C36] rounded outline-0 px-2 py-1">

                <option></option>
                {filter.map((cate, index) => (
                  <option value={cate} key={index}>{cate}</option>
                ))}
                <option>[Nuevo]</option>

              </select>
            </div>

            {/* Nuevo categoria */}
            <div className=" flex flex-col gap-2">
              <label
                htmlFor="category">Nuevo filtro :</label>
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
              htmlFor="description">Resumen :</label>
            <textarea
              rows={4}
              id="resume"
              name="resume"
              value={formData.resume}
              onChange={handleChange}
              className="border border-[#262C36] rounded outline-0 text-sm px-2 py-1 resize-none">
            </textarea>
          </div>
          <div className=" flex flex-col gap-2">
            <label
              htmlFor="description">Contenido completo :</label>
            <textarea
              rows={4}
              id="fullContent"
              name="fullContent"
              value={formData.fullContent}
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
export default NewPostForm