const Post = require("../models/postModel")

exports.newPost = async (req, res) => {
   const postData = req.body

   try {
      const newPost = await Post.create(postData)

      res.send(newPost)
   } catch (error) {
      console.log(error)
      res.status(400).send("error on new post")
   }
}

exports.listPost = async (req, res) => {
   try {
      const posts = await Post.find({})
      res.send(posts)
   } catch (error) {
      console.log(error)
      res.status(400).send("error on list post")
   }
}

exports.readPost = async (req, res) => {
   try {
      const id = req.params.id
      const post = await Post.findOne({ _id: id })

      res.send(post)
   } catch (err) {
      console.log(err)
      res.status(400).send("error on read a post")
   }
}

exports.deletePost = async (req, res) => {
   try {
      const id = req.params.id
      const deleted = await Post.findOneAndDelete({ _id: id })

      res.send(deleted)
   } catch (err) {
      console.log(err)
      res.status(400).send("error on delete a post")
   }
}
