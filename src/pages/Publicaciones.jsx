import { useEffect, useState } from "react"
import Search from "../Components/Global/Search"
import PostsList from "../Components/List/PostsList"
import NewPostForm from "../Components/Forms/NewPostForm"
import { API_URL } from "../utils/ConfigApi"
import { useNavigate } from "react-router-dom"

const Publicaciones = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState([])
  const navigate =  useNavigate()
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

  const fetchPosts = async () => {
    try {
      const res = await fetch(`${API_URL}posts`)
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

      setPosts(data)
      setFilter([...new Set(data.map(p => p.category))])
    } catch (err) {
      console.error(err.nessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!token) return
    fetchPosts()
  }, [token])

  return (
    <article className="ml-[250px] px-8 flex flex-col gap-8 max-xl:m-0">
      <section className="bg-[#191D23] p-8 max-xl:p-4 rounded-b-sm">
        <div className="pb-4">
          <p className="text-2xl">Gestor de publicaciones</p>
        </div>
        <div className="flex items-center justify-between max-sm:flex-col max-sm:gap-4 max-sm:pt-4">
          <div className="w-2/4 max-sm:w-full">
            <Search
              value={search}
              onChange={searcher}
              placeholder={'Buscar publicación'}
            />
          </div>
          <button
            onClick={handleShowCreateForm}
            className="text-sm cursor-pointer bg-[#262C36] py-2 px-6 rounded hover:bg-[#2d323b] transition"
          >Nueva Publicación
          </button>
        </div>
      </section>

      <section className="mb-8">
        <PostsList
          search={search}
          fetchPosts={fetchPosts}
          posts={posts}
          loading={loading}
          filter={filter}
        />
      </section>

      {
        openModal && (
          <NewPostForm 
            handleCloseForm={handleShowCreateForm} 
            fetchPosts={fetchPosts} 
            filter={filter}
          />
        )
      }
    </article>
  )
}
export default Publicaciones