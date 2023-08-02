import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function Register() {
   const [newUser, setNewUser] = useState({})
   const [showToast, setShowToast] = useState(false)
   const [toastMessage, setToastMessage] = useState("")

   const navigate = useNavigate()

   const handleChange = (e) => {
      setNewUser({
         ...newUser,
         [e.target.name]: e.target.value,
      })
   }

   const register = async (e) => {
      e.preventDefault()
      if (newUser.password === newUser.confirmPassword) {
         try {
            const res = await axios.post("http://localhost:3000/register", {
               username: newUser.username,
               password: newUser.password,
            })

            if (typeof res.data === "string") {
               showToastWithTimeout(res.data)
            } else {
               showToastWithTimeout("Register Successfully!")

               setTimeout(() => {
                  navigate("/login")
               }, 2000)
            }
         } catch (error) {
            console.log(error)
         }
      } else {
         showToastWithTimeout("Password not match!")
      }
   }

   const showToastWithTimeout = (message) => {
      setShowToast(true)
      setToastMessage(message)

      setTimeout(() => {
         setShowToast(false)
      }, 2000)
   }

   return (
      <div data-aos="zoom-in" className="container uppercase relative">
         <div className="flex items-center border border-accent rounded-lg shadow-lg justify-center flex-col gap-2 mt-16 bg-white w-[30rem] mx-auto p-10">
            <h1 className="text-3xl">Register</h1>
            <form className="w-full space-y-8" onSubmit={register}>
               <div className="form-control">
                  <label className="label" htmlFor="username">
                     <span className="label-text">username</span>
                  </label>
                  <input className="input input-primary" type="text" name="username" onChange={handleChange} required />

                  <label className="label" htmlFor="password">
                     <span className="label-text">password</span>
                  </label>
                  <input
                     className="input input-primary"
                     type="password"
                     name="password"
                     onChange={handleChange}
                     required
                  />

                  <label className="label" htmlFor="confirmPassword">
                     <span className="label-text">confirm password</span>
                  </label>
                  <input
                     className="input input-primary"
                     type="password"
                     name="confirmPassword"
                     onChange={handleChange}
                     required
                  />
               </div>

               <button className="w-full btn-pop">Register</button>
            </form>
            <Link className="mt-5 text-sm link link-accent" to={"/login"}>
               Have Account
            </Link>
         </div>

         {/* toast */}
         {showToast && (
            <div className="toast toast-end">
               <div className="alert bg-primary-content text-primary font-medium border-primary shadow">
                  <span className="ml-5">{toastMessage}</span>
               </div>
            </div>
         )}
      </div>
   )
}

export default Register
