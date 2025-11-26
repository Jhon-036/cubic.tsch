import { X } from "lucide-react"
import ProductsList from "../List/ProductsList"

const ProductsModal = ({handleClose, clasName}) => {
  return (
    <div className={`${clasName}`}>
      <div onClick={handleClose}>
        <X />
      </div>
      Productos
      <ProductsList />
    </div>
  )
}
export default ProductsModal