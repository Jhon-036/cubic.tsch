import { useState } from "react"
import ProductCard from '../Cards/ProductCard'

const ProductsList = ({ search, fetchProducts, loading, products, categories }) => {
  const [currentListProduct, setCurrentListProduct] = useState(12)

  const handleBtnViewMore = () => {
    setCurrentListProduct(prev => prev + 8)
  }

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <div className="mr-3 size-5 animate-spin border-2 border-gray-300 border-t-[#262C36] rounded-full"></div>
      </div>
    )
  }

  const removeAccents = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
  const term = removeAccents(search)

  const filteredProduct = products.filter((product) => {
    if (!term) return true

    const name = removeAccents(product.name || '')
    const partno = removeAccents(product.partno || '')
    const category = removeAccents(product.category || '')
    const description = removeAccents(product.description || '')

    return (
      name.includes(term) ||
      partno.includes(term) ||
      category.includes(term) ||
      description.includes(term)
    )
  })

  return (
    <div>
      <div className="grid grid-cols-2 gap-8">
        {
          filteredProduct.reverse().slice(0, currentListProduct).map((product) => (
            <ProductCard key={product.id} product={product} fetchProducts={fetchProducts} category={categories} />
          ))
        }
      </div>

      {currentListProduct < filteredProduct.length && (
        <div className="pt-16 text-center">
          <button
            onClick={handleBtnViewMore}
            className="text-sm cursor-pointer bg-[#262C36] py-2 px-6 rounded hover:bg-[#2d323b] transition"
          >Ver mas
          </button>
        </div>
      )}
    </div>
  )
}
export default ProductsList