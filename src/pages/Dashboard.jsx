import { Boxes, LibraryBig, MousePointerClick } from "lucide-react"
import CardInfo from "../Components/Cards/CardInfo"
import { useState, useEffect } from "react"
import { API_URL } from "../utils/ConfigApi"
import OrderDashboard from "../Components/Dashboard/OrderDashboard"
import OrderTable from "../Components/Table/OrderTable"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
  const [productsCount, setProductsCount] = useState(0)
  const [postsCount, setPostsCount] = useState(0)
  const [dataCount, setDostsCount] = useState(0)
  const [dataOrder, setDataOrder] = useState([])
  const [orders, setOrders] = useState([])
  const  navigate = useNavigate()
  const token = localStorage.getItem('token')

  const dataInfo = [
    { icon: <Boxes strokeWidth={1.2} size={28} />, title: 'Total de productos', data: productsCount, color: '#7B57E0' },
    { icon: <LibraryBig strokeWidth={1.2} size={28} />, title: 'Total de publicaciones', data: postsCount, color: '#47A785' },
    { icon: <MousePointerClick strokeWidth={1.2} size={28} />, title: 'Total de cotizaciones', data: dataCount, color: '#5395CF' }
  ]

  useEffect(() => {
    if (!token) {
      localStorage.removeItem('token')
      navigate('/')
    }
  }, [token, navigate])

  const checkUnauthorized = async (res) => {
    if (res.status === 401) {
      localStorage.removeItem('token')
      navigate('/')
      return true
    }
    return false
  }

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}products`)
      if (!res.ok) {
        alert('Ocurrio un error, recarque la página')
      }
      const data = await res.json()
      setProductsCount(data.length)
    } catch (err) {
      alert('Ocurrio un error inesperado \n' + 'Detalle : \m' + err.message)
      console.log(err.message)
    }
  }

  const fetchPosts = async () => {
    try {
      const res = await fetch(`${API_URL}posts`, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (!res.ok) {
        alert('Ocurrio un error, recarque la página')
      }
      const data = await res.json()
      setPostsCount(data.length)
    } catch (err) {
      alert('Ocurrio un error inesperado \n' + 'Detalle : \m' + err.message)
      console.log(err.message)
    }
  }

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_URL}orders`, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (!res.ok) {
        alert('Ocurrio un error, por favor recargue la pagina')
      }

      const data = await res.json()
      setDostsCount(data.length)
      setOrders(data)
    } catch (err) {
      alert('Ocurrio un error inesperado \n' + 'Detalle : \n' + err.message)
    }
  }

  const fetchStatsMonth = async () => {
    try {
      const res = await fetch(`${API_URL}orders/stats/month`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
      
      if (await checkUnauthorized(res)) return

      const data = await res.json()

      // Transformar para Recharts: name = etiqueta del eje X
      const chartData = data.map(item => {
        const dateObj = new Date(item.date)
        const label = dateObj.toLocaleDateString("es-PE", {
          day: "2-digit",
          month: "2-digit",
          timeZone: "UTC"
        }) // ej: 01/11

        return {
          name: label,
          orders: item.totalOrders,
        }
      })
      setDataOrder(chartData)
    } catch (err) {
      alert('Ocurrio un error inesperado \n' + 'Detalle : \m' + err.message)
      console.log(err.message)
    }
  }

  useEffect(() => {
    if (!token) return
    fetchProducts()
    fetchPosts()
    fetchStatsMonth()
    fetchOrders()
  }, [token])


  return (
    <article className="ml-[250px] px-8 flex flex-col gap-6 max-xl:m-0">
      <section className="grid grid-cols-3 gap-8 max-lg:grid-cols-1">
        {
          dataInfo.map((data, index) => (
            <CardInfo
              key={index}
              icon={data.icon}
              title={data.title}
              data={data.data}
              color={data.color}
            />
          ))
        }
      </section>
      <section>
        <div className="bg-[#191D23] p-8 max-md:p-6 rounded max-md:outline-0">
          <div className="pb-6">
            <p className="text-xl">Cotizaciones por día</p>
          </div>
          <OrderDashboard
            dataOrder={dataOrder}
          />
        </div>
      </section>
      <section className="w-full overflow-x-auto">
        <div className="bg-[#191D23] p-8 max-md:p-6 rounded min-w-[800px]">
          <OrderTable
            orders={orders}
          />
        </div>
      </section>
    </article>
  )
}
export default Dashboard