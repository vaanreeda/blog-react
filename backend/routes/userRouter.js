const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")

const { register, login, readUser } = require("../controllers/userController")

// Register Route
router.post("/register", register)
router.post("/login", login)
router.get("/users/:id", readUser)

module.exports = router
