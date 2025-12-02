import { SquarePen, Trash2 } from "lucide-react"
import { useState } from "react"
import UpdateProductForm from "../Forms/UpdateProductForm"
import { API_URL } from "../../utils/ConfigApi"

const ProductCard = ({product, fetchProducts, category}) => {
  const [openModal, setOpenModal] = useState(false)

  const handleShowUpdateForm = () => {
    setOpenModal(prev => !prev)
  }

  const token = localStorage.getItem('token')

  const handleDeleteProduct = async (id) => {
    if (window.confirm('¿Eliminar ' + product.name + '?')) {
      try {
        const res = await fetch(`${API_URL}products/${id}`, {
          method: 'DELETE',
          headers: {
          "Authorization": `Bearer ${token}`
          }
        })

        if (!res.ok) {
          alert('Ocurrio un error, por favor vuelve a intentar')
          return
        }

        alert('Producto eliminado')
        if (fetchProducts) {
          fetchProducts()
        }
      } catch (err) {
        console.error('Error', err)
        alert('Error al eliminar')
      }
    }
  }

  return (
    <div className="bg-[#191D23] rounded p-4">
      <div className="flex gap-4">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-42 rounded"
        />
        <div className="flex flex-col justify-between">
          <div>
            <p>{product.name}</p>
            <span className="text-xs text-[#47A785] bg-[#47a7853b] py-px px-[5px] rounded">{product.category}</span>
            <span className="block text-sm text-gray-400">Part. No. : {product.partno}</span>
            <p className="pt-1">{product.description}</p>
          </div>
          <div className="flex items-center  gap-2">
            <button onClick={handleShowUpdateForm} className="bg-[#262C36] hover:bg-[#2d323b] transition p-2 rounded cursor-pointer"><SquarePen strokeWidth={1.5} size={20}  color="#5395CF" /></button>
            <button onClick={() => handleDeleteProduct(product.id)} className="bg-[#262C36] hover:bg-[#2d323b] transition p-2 rounded cursor-pointer"><Trash2 strokeWidth={1.5} size={20} color="#e05757" /></button>
          </div>
        </div>
      </div>
      {
        openModal && (
          <UpdateProductForm 
            product={product}
            handleCloseForm={handleShowUpdateForm}
            fetchProducts={fetchProducts}
            category={category}
          />
        )
      }
    </div>
  )
}
export default ProductCard