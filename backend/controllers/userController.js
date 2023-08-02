const UserSchema = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const salt = bcrypt.genSaltSync(10)

module.exports.register = async (req, res) => {
   const { username, password } = req.body
   const pass = await UserSchema.findOne({ username })

   if (pass === null) {
      try {
         const user = await UserSchema.create({
            username,
            password: bcrypt.hashSync(password, salt),
         })

         res.send(user)
      } catch (error) {
         console.log(error)
         res.status(400).send(error)
      }
   } else {
      res.send("Username has been used")
   }
   // if(username !== pass.username)
}

module.exports.login = async (req, res) => {
   try {
      const { username, password } = req.body
      const user = await UserSchema.findOneAndUpdate({ username }, { new: true })

      if (user) {
         const passCorrect = await bcrypt.compareSync(password, user.password)

         if (!passCorrect) {
            return res.status(400).send("Password Invalid")
         }

         // ข้อมูลที่ส่งไปให้หน้าบ้าน
         const payload = {
            user: {
               username: user.username,
               id: user._id,
            },
         }

         jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "2h" }, (err, token) => {
            if (err) throw err
            res.json({ token, payload })
         })
      } else {
         return res.status(400).send("User not found!!")
      }
   } catch (error) {
      console.log(err)
      res.status(500).send("Server Error")
   }
}

module.exports.readUser = async (req, res) => {
   try {
      const id = req.params.id
      const user = await UserSchema.findOne({ _id: id })

      res.send(user)
   } catch (error) {
      console.log(error)
      res.status(500).send("read user error")
   }
}
