const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const connectDB = require("./config/db")

const userRouter = require("./routes/userRouter")
const postRouter = require("./routes/postRouter")

require("dotenv").config()

const app = express()

connectDB()

app.use(cors())
app.use(bodyParser.json())
app.use(morgan("dev"))

app.use(userRouter)
app.use("/posts", postRouter)

app.listen(3000, () => {
   console.log("Server is running on port 3000")
})
