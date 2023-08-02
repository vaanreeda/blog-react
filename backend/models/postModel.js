const mongoose = require("mongoose")

const Post = new mongoose.Schema(
   {
      title: {
         type: String,
         required: true,
      },
      content: {
         type: String,
      },
      author: {
         type: String,
         required: true,
      },
   },
   { timestamps: true },
)

module.exports = mongoose.model("Posts", Post)
