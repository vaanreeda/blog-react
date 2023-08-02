import axios from "axios"
import PropType from "prop-types"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function CardPost({ id, title, author }) {
   const [user, setUser] = useState({})

   useEffect(() => {
      if (author) {
         const getUser = async () => {
            try {
               const response = await axios.get(`http://localhost:3000/users/${author}`)
               setUser(response.data)
            } catch (error) {
               console.error("Error fetching user: ", error)
            }
         }
         getUser()
      }
   }, [author])

   return (
      <div
         data-aos="fade-up"
         data-aos-duration="1000"
         data-aos-once="true"
         key={id}
         className="border border-slate-500 shadow-lg p-5 mb-3 bg-white h-40 flex flex-col justify-between">
         <div>
            <h2 className="font-bold text-xl">{title}</h2>
            <p className="text-gray-500">{user.username}</p>
         </div>
         <div className="flex justify-end w-full">
            <Link to={`/posts/${id}`}>
               <button className="btn-pop">Read more</button>
            </Link>
         </div>
      </div>
   )
}

CardPost.propTypes = {
   id: PropType.string,
   title: PropType.string,
   author: PropType.string,
}
export default CardPost
