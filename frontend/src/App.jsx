import { Outlet } from "react-router-dom"
import { MyContext } from "./MyContext"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"

function App() {
   return (
      <MyContext>
         <div className="bg-base-100 min-h-screen text-accent flex flex-col">
            <Navbar />
            <div className="flex-1">
               <Outlet />
            </div>
            <Footer />
         </div>
      </MyContext>
   )
}

export default App
