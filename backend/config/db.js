const mongoose = require("mongoose")

const connectDB = async () => {
   try {
      await mongoose.connect("mongodb://localhost:27017/testy")
      console.log(`db connected`)
   } catch (error) {
      console.log(error)
   }
}

module.exports = connectDB
