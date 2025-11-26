const OrderTable = ({orders}) => {

  const formatDateTime = (isoString) => {
    return new Date(isoString).toLocaleString("es-PE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC"
    })
  }

  return (
    <table className="w-full">
      <thead>
        <tr className="bg-[#262C36] text-[#B8C0CC]">
          <th className="p-4 text-start">Nro.</th>
          <th className="p-4 text-start">Fecha</th>
          <th className="p-4 text-start">Cliente</th>
          <th className="p-4 text-start">Producto</th>
          <th className="p-4 text-start">Ip</th>
        </tr>
      </thead>
      <tbody>
        {
          orders.map(order => (
            <tr>
              <td className="border-b-2 p-4 border-[#262C36]">#{order.number}</td>
              <td className="border-b-2 p-4 border-[#262C36]">{formatDateTime(order.createdAt)}</td>
              <td className="border-b-2 p-4 border-[#262C36]">{order.name} {order.lastname}</td>
              <td className="border-b-2 p-4 border-[#262C36]">{order.item}</td>
              <td className="border-b-2 p-4 border-[#262C36]">{order.ip}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}
export default OrderTable