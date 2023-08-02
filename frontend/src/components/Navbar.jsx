import Cookies from "js-cookie"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { Context } from "../MyContext"

function Navbar() {
   const { setIsLoggedIn, isLoggedIn, loginUser, setLoginUser } = useContext(Context)

   const handleLogout = () => {
      Cookies.remove("accessToken")
      Cookies.remove("userLogin")

      setIsLoggedIn(false)
      setLoginUser({})

      window.location.reload()
   }

   return (
      <nav className="navbar bg-accent text-accent-content">
         <div className="container navbar uppercase">
            <div className="navbar-start">
               <Link className="text-3xl font-medium btn-pop-w" to="/">
                  LOGO
               </Link>
            </div>
            <div className="navbar-center gap-2">
               <Link className="btn-pop-w" to="/">
                  home
               </Link>
               {isLoggedIn && (
                  <>
                     <Link className="btn-pop-w" to="/blog">
                        blog
                     </Link>
                  </>
               )}
            </div>
            <div className="navbar-end gap-1">
               {!isLoggedIn ? (
                  <>
                     <Link className="btn-pop-w" to="/login">
                        Login
                     </Link>
                     <p>|</p>
                     <Link className="btn-pop-w" to="/register">
                        Register
                     </Link>
                  </>
               ) : (
                  <div className="flex items-center">
                     <button className="btn-pop-w">{loginUser.username}</button>
                     <p className="text-white">|</p>
                     <button onClick={handleLogout} className="btn-pop-w">
                        logout
                     </button>
                  </div>
               )}
            </div>
         </div>
      </nav>
   )
}

export default Navbar
