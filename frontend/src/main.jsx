import AOS from "aos"
import "aos/dist/aos.css"
import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./App"
import "./index.css"
import Home from "./pages/Home"
import Login from "./pages/Login"
import NewPost from "./pages/NewPost"
import Post from "./pages/Post"
import Register from "./pages/Register"

const router = createBrowserRouter([
   {
      path: "/",
      element: <App />,
      children: [
         {
            path: "/",
            element: <Home />,
         },
         {
            path: "/posts/:id",
            element: <Post />,
         },
         {
            path: "/login",
            element: <Login />,
         },
         {
            path: "/register",
            element: <Register />,
         },
         {
            path: "/posts/new",
            element: <NewPost />,
         },
      ],
   },
])

AOS.init({
   duration: 1200,
   once: true,
})

ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
      <RouterProvider router={router} />
   </React.StrictMode>,
)
