const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// REGISTER
router.post("/register", async (req, res) => {

  try {

    const existingUser = await User.findOne({
      email: req.body.email
    })

    if (existingUser) {
      return res.status(400).json("Email already exists")
    }

    const hashedPassword = await bcrypt.hash(
      req.body.password,
      10
    )

    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role
    })

    res.json(user)

  } catch (err) {

    console.log(err)

    res.status(500).json(err)

  }

})

// LOGIN
router.post("/login", async (req, res) => {

  try {

    const user = await User.findOne({
      email: req.body.email
    })

    if (!user) {
      return res.status(404).json("User not found")
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    )

    if (!validPassword) {
      return res.status(400).json("Wrong password")
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET
    )

    res.json({
      token,
      user
    })

  } catch (err) {

    console.log(err)

    res.status(500).json(err)

  }

})

module.exports = router