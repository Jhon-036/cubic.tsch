import { useEffect, useState } from "react"
import Search from "../Components/Global/Search"
import ProductsList from "../Components/List/ProductsList"
import NewProductForm from "../Components/Forms/NewProductForm"
import { API_URL } from "../utils/ConfigApi"
import { useNavigate } from "react-router-dom"

const Productos = () => {
  const [openModal, setOpenModal] = useState(false)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState([])
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) {
      navigate('/')
      return
    }
  }, [token, navigate])

  const handleShowCreateForm = () => {
    setOpenModal(!openModal)
  }

  const searcher = (e) => {
    setSearch(e.target.value)
  }

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}products`)
      const data = await res.json()

      if (res.status === 401) {
      localStorage.removeItem("token")
      navigate("/")
      return
    }

      if (!res.ok) {
        alert('Ocurrió un error, por favor vuelve a intentar')
        console.log(res)
      }

      setProducts(data)
      setCategory([...new Set(data.map(p => p.category))])
    } catch (err) {
      console.error(err.nessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!token) return
    fetchProducts()
  }, [token])

  return (
    <article className="ml-[250px] px-8 flex flex-col gap-8 max-xl:m-0">
      <section className="bg-[#191D23] p-8 max-xl:p-4 rounded-b-sm">
        <div className="pb-4">
          <p className="text-2xl">Gestor de productos</p>
        </div>
        <div className="flex items-center justify-between max-sm:flex-col max-sm:gap-4 max-sm:pt-4">
          <div className="w-2/4 max-sm:w-full">
            <Search
              value={search}
              onChange={searcher}
              placeholder={'Buscar productos'}
            />
          </div>
          <button
            onClick={handleShowCreateForm}
            className="text-sm cursor-pointer bg-[#262C36] py-2 px-6 rounded hover:bg-[#2d323b] transition"
          >Nuevo Producto
          </button>
        </div>
      </section>

      <section className="mb-8">
        <ProductsList 
          search={search}
          fetchProducts={fetchProducts}
          products={products}
          loading={loading}
          categories={category}
        />
      </section>

      {
        openModal && (
          <NewProductForm 
            handleCloseForm={handleShowCreateForm} 
            fetchProducts={fetchProducts} 
            category={category}
          />
        )
      }
    </article>
  )
}
export default Productos