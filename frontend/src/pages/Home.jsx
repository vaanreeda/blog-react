import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Context } from "../MyContext"
import CardPost from "../components/CardPost"

function Home() {
   const [blogs, setPosts] = useState([])
   const { loginUser } = useContext(Context)

   const navigate = useNavigate()

   const getPost = async () => {
      const res = await axios.get("http://localhost:3000/posts")
      setPosts(res.data)
   }

   useEffect(() => {
      getPost()
   }, [])

   const handleNewPost = () => {
      if (Object.keys(loginUser).length === 0) {
         navigate("/login")
      } else {
         navigate("/posts/new")
      }
   }

   return (
      <>
         <div className="container p-10">
            <div data-aos="fade-down" className="flex justify-end">
               <button className="uppercase btn-pop mb-4" onClick={handleNewPost}>
                  new post
               </button>
            </div>
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-3">
               {blogs?.map((post, index) => (
                  <CardPost key={index} id={post._id} title={post.title} author={post.author} />
               ))}
            </div>
         </div>
      </>
   )
}

export default Home
