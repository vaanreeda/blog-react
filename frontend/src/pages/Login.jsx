import axios from "axios"
import Cookies from "js-cookie"
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Context } from "../MyContext"

function Login() {
   const [user, setUser] = useState({})
   const [showToast, setShowToast] = useState(false)
   const [toastMessage, setToastMessage] = useState("")

   const { setIsLoggedIn } = useContext(Context)

   const navigate = useNavigate()

   const handleChange = (e) => {
      setUser({
         ...user,
         [e.target.name]: e.target.value,
      })
   }

   const login = async (e) => {
      e.preventDefault()
      try {
         const response = await axios.post("http://localhost:3000/login", user)

         if (response.status === 200) {
            const token = response.data.token
            const user = response.data.payload.user

            Cookies.set("accessToken", token, { path: "/", secure: true })
            Cookies.set("userLogin", JSON.stringify(user), { path: "/", secure: true })

            if (token) {
               showToastWithTimeout("Login Successfully")

               setIsLoggedIn(true)
               setTimeout(() => {
                  navigate("/", { replace: true })
               }, 1500)
            }
         }
      } catch (error) {
         console.log(error)
         showToastWithTimeout("Password Invalid")
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
      <div data-aos="zoom-in" className="container uppercase">
         <div className="flex items-center border border-accent rounded-lg shadow-lg justify-center flex-col gap-2 mt-16 bg-white w-[30rem] mx-auto p-10">
            <h1 className="text-3xl">login</h1>
            <form className="w-full space-y-8" onSubmit={login}>
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
               </div>

               <button className="btn-block btn-pop">Login</button>
            </form>
            <Link className="mt-5 text-sm link link-accent" to={"/register"}>
               Not have account?
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

export default Login
