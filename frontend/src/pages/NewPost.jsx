import axios from "axios"
import Cookies from "js-cookie"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Context } from "../MyContext"

function NewPost() {
   const { loginUser } = useContext(Context)
   const navigate = useNavigate()

   const [newPost, setNewPost] = useState({})

   const handleChange = (e) => {
      setNewPost({
         ...newPost,
         [e.target.name]: e.target.value,
      })
   }

   const createPost = async (e) => {
      e.preventDefault()

      try {
         const token = Cookies.get("accessToken")

         if (token) {
            const res = await axios.post("http://localhost:3000/posts/new", {
               title: newPost.title,
               content: formatContentForDisplay(newPost.content),
               author: loginUser.id,
               token: token,
            })

            navigate(`/posts/${res.data._id}`)
         } else {
            navigate("/login")
         }
      } catch (error) {
         console.log(error)
      }
   }

   const formatContentForDisplay = (content) => {
      if (!content) return ""
      return content.replace(/\n/g, "<br/>")
   }

   return (
      <div data-aos="zoom-in" className="container uppercase">
         <div className="flex items-center border border-accent rounded-lg shadow-lg justify-center flex-col gap-2 mt-16 bg-white w-full mx-auto p-10">
            <h1 className="text-3xl">New Post</h1>
            <form onSubmit={createPost} className="w-full space-y-8">
               <div className="form-control">
                  <label className="label" htmlFor="title">
                     <span className="label-text">title</span>
                  </label>
                  <input className="input input-accent" type="text" name="title" required onChange={handleChange} />

                  <label className="label" htmlFor="content">
                     <span className="label-text">content</span>
                  </label>
                  <textarea
                     className="textarea textarea-accent h-[12rem]"
                     name="content"
                     placeholder="Content..."
                     onChange={handleChange}></textarea>
               </div>

               <button className="w-full btn-pop">POST</button>
            </form>
         </div>
      </div>
   )
}

export default NewPost
