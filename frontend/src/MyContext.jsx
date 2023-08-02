import Cookies from "js-cookie"
import PropType from "prop-types"
import { createContext, useEffect, useState } from "react"

const Context = createContext()

function MyContext({ children }) {
   const [isLoggedIn, setIsLoggedIn] = useState(false)
   const [loginUser, setLoginUser] = useState({})

   const token = Cookies.get("accessToken")
   const user = Cookies.get("userLogin")

   useEffect(() => {
      if (token) {
         setIsLoggedIn(true)
         if (user) {
            try {
               const parsedUser = JSON.parse(user)
               setLoginUser(parsedUser)
            } catch (error) {
               console.error("Error parsing user data from Cookies:", error)
            }
         }
      }
   }, [token, user])

   return <Context.Provider value={{ isLoggedIn, setIsLoggedIn, loginUser, setLoginUser }}>{children}</Context.Provider>
}

MyContext.propTypes = {
   children: PropType.node,
}

export { Context, MyContext }
