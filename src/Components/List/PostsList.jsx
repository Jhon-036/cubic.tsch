import PostCard from "../Cards/PostCard"

const PostsList = ({search, fetchPosts, posts, loading, filter}) => {

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <div className="mr-3 size-5 animate-spin border-2 border-gray-300 border-t-[#262C36] rounded-full"></div>
      </div>
    )
  }

  const removeAccents = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
  const term = removeAccents(search)

  const filteredPosts = posts.filter((post) => {
    if (!term) return true

    const title = removeAccents(post.name || '')
    const category = removeAccents(post.category || '')
    const resume = removeAccents(post.resume || '')
    const fullContent = removeAccents(post.fullContent || '')

    return (
      title.includes(term) ||
      category.includes(term) ||
      resume.includes(term) ||
      fullContent.includes(term)
    )
  })

  return (
    <div>
      <div className="grid grid-cols-2 gap-8 max-[1100px]:grid-cols-1">
        {
          filteredPosts.reverse().map((post) => (
            <PostCard key={post.id} post={post} fetchPosts={fetchPosts} filter={filter} />
          ))
        }
      </div>
    </div>
  )
}
export default PostsList