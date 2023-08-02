import axios from "axios"
import Cookies from "js-cookie"
import { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Context } from "../MyContext"

function Post() {
   const param = useParams()
   const navigate = useNavigate()

   const [post, setPost] = useState({})
   const [user, setUser] = useState({})
   const { loginUser } = useContext(Context)

   useEffect(() => {
      const getPost = async () => {
         const response = await axios.get(`http://localhost:3000/posts/${param.id}`)
         setPost(response.data)
      }

      getPost()
   }, [param.id])

   useEffect(() => {
      if (post.author) {
         const getUser = async () => {
            try {
               const response = await axios.get(`http://localhost:3000/users/${post.author}`)
               setUser(response.data)
            } catch (error) {
               console.error("Error fetching user: ", error)
            }
         }
         getUser()
      }
   }, [post.author])

   const delPost = async () => {
      try {
         const token = Cookies.get("accessToken")

         if (token) {
            await axios.delete(`http://localhost:3000/posts/${param.id}`)

            navigate("/")
         }
      } catch (error) {
         console.log(error)
      }
   }

   const formatDate = (dateString) => {
      const date = new Date(dateString)
      const day = date.getDate().toString().padStart(2, "0")
      const month = (date.getMonth() + 1).toString().padStart(2, "0")
      const year = date.getFullYear()
      return `${day}-${month}-${year}`
   }

   return (
      <section className="container my-10 p-5 text-accent">
         <div data-aos="fade-down" className="flex justify-between items-center">
            <Link to={"/"} className="btn-pop mb-4">
               <button className="uppercase">back</button>
            </Link>
            {loginUser.id === post.author && (
               <button className="btn-pop" onClick={() => window.my_modal_1.showModal()}>
                  delete
               </button>
            )}
         </div>
         <div data-aos="fade-up" className="border-2 border-accent p-10 shadow-[10px_10px_0_rgba(0,0,0,1)]">
            <h2 className="text-3xl font-medium">{post.title}</h2>

            <div className="divider"></div>

            <p className="font-light mt-5" dangerouslySetInnerHTML={{ __html: post.content }}></p>

            <div className="text-end text-accent/50 uppercase text-sm mt-16">
               <p className="">
                  <em>{user.username}</em>
               </p>
               <p>
                  <em>{formatDate(post.createdAt)}</em>
               </p>
            </div>
         </div>
         <dialog id="my_modal_1" className="modal">
            <form method="dialog" className="modal-box">
               <h3 className="font-bold text-2xl text-red-500">คำเตือน!</h3>
               <p className="py-4 text-lg">คุณแน่ใจที่จะลบโพสท์ใช่หรือไม่</p>
               <div className="modal-action">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn-pop" onClick={delPost}>
                     delete
                  </button>
                  <button className="btn-pop bg-accent-content text-accent">Close</button>
               </div>
            </form>
         </dialog>
      </section>
   )
}

export default Post
