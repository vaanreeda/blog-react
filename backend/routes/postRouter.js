const express = require("express")
const router = express()
const auth = require("../middleware/auth")
const { newPost, listPost, readPost, deletePost } = require("../controllers/postController")

router.get("/", listPost)
router.get("/:id", readPost)
router.post("/new", auth, newPost)
router.delete("/:id", deletePost)

module.exports = router
