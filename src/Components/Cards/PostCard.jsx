import { SquarePen, Trash2 } from "lucide-react"
import { useState } from "react"
import { getRelativeTime } from "../hooks/getRelativeTime.js"
import UpdatePostForm from "../Forms/UpdatePostForm.jsx"
import { API_URL } from "../../utils/ConfigApi.js"

const PostCard = ({post, fetchPosts, filter}) => {
  const [openModal, setOpenModal] = useState(false)
  const [openContentFull, setOpenContentFull] = useState(false)
  const token = localStorage.getItem('token')

  const handleShowUpdateForm = () => {
    setOpenModal(prev => !prev)
  }

  const handleShowContent = () => {
    setOpenContentFull(prev => !prev)
  }

  const handleDeletePost = async (id) => {
    if (window.confirm('¿Eliminar ' + post.title + '?')) {
      try {
        const res = await fetch(`${API_URL}posts/${id}`, {
          method: 'DELETE',
          headers: {
          "Authorization": `Bearer ${token}`
          }
        })

        if (!res.ok) {
          return alert('Ocurrio un error, por favor vuelve a intentar')
        }

        alert('Publicación eliminada')
        if (fetchPosts) {
          fetchPosts()
        }
      } catch (err) {
        console.error('Error', err)
        alert('Error al eliminar')
      }
    }
  }

  return (
    <div className="bg-[#191D23] rounded p-4">
      <div className="flex gap-4 max-xl:flex-wrap">
        <img 
          src={post.image} 
          alt={`${post.title} | tschperu.com`} 
          className="w-52 rounded self-start"
        />
        <div className="flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <p className="uppercase text-lg">{post.title}</p>
              <span className="text-xs text-gray-400">{getRelativeTime(post.createdAt)}</span>
            </div>
            <span className="text-xs text-[#47A785] bg-[#47a7853b] py-px px-[5px] rounded">{post.category}</span>
            <p className="pt-1 whitespace-pre-line text-[#bbbbbb] text-sm">{post.resume}</p>
            <span onClick={handleShowContent} className={`text-[#4b7ea8] place-self-start hover:text-[#5c86b1] transition text-sm cursor-pointer ${openContentFull ? 'hidden' : 'block'}`}>Ver mas</span>
            {openContentFull && (
              <div>
                <p className="pt-1 whitespace-pre-line text-[#bbbbbb] text-sm">{post.fullContent}</p>
                <span onClick={handleShowContent} className={`text-[#4b7ea8] self-start hover:text-[#5c86b1] transition text-sm cursor-pointer`}>Ver menos</span>
              </div>
            )}
          </div>
          <div className="flex items-center pt-6 gap-2">
            <button onClick={handleShowUpdateForm} className="bg-[#262C36] hover:bg-[#2d323b] transition p-2 rounded cursor-pointer"><SquarePen strokeWidth={1.5} size={20}  color="#5395CF" /></button>
            <button onClick={() => handleDeletePost(post.id)} className="bg-[#262C36] hover:bg-[#2d323b] transition p-2 rounded cursor-pointer"><Trash2 strokeWidth={1.5} size={20} color="#e05757" /></button>
          </div>
        </div>
      </div>
      {
        openModal && (
          <UpdatePostForm
            post={post}
            handleCloseForm={handleShowUpdateForm}
            fetchPosts={fetchPosts}
            filter={filter}
          />
        )
      }
    </div>
  )
}
export default PostCard