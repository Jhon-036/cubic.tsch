import { ChevronRight } from "lucide-react"

const CardInfo = ({ icon, title, data, color, handleListProducts }) => {
  return (
    <section className="bg-[#191D23] p-8 max-md:p-6 rounded">
      <div className="flex gap-4">
        <div className="self-start p-2 rounded-full" style={{backgroundColor: color}}>
          {icon}
        </div>
        <div>
          <h2 className="font-light pb-1">{title}</h2>
          <p className="text-3xl">{data}</p>
        </div>
      </div>
      {/* <button onClick={handleListProducts} className="flex items-center pt-4 cursor-pointer">
        <span className="text-[#7B57E0] text-sm font-extralight">Ver detalles</span>
        <ChevronRight strokeWidth={1.2} size={20} color="#7B57E0" />
      </button> */}
    </section>
  )
}
export default CardInfo