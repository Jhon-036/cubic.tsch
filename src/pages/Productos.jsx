import { useEffect, useState } from "react"
import Search from "../Components/Global/Search"
import ProductsList from "../Components/List/ProductsList"
import NewProductForm from "../Components/Forms/NewProductForm"

const Productos = () => {
  const [openModal, setOpenModal] = useState(false)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState([])

  const handleShowCreateForm = () => {
    setOpenModal(!openModal)
  }

  const searcher = (e) => {
    setSearch(e.target.value)
  }

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/v1/products')
      const data = await res.json()

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
    fetchProducts()
  }, [])

  return (
    <article className="ml-[250px] px-8 flex flex-col gap-8">
      <section className="bg-[#191D23] p-8 rounded-b-sm">
        <div className="pb-4">
          <p className="text-2xl">Gestor de productos</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="w-2/4">
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