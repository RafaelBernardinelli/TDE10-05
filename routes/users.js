const express = require('express')
const { saveUser, findUserByEmail, findUserById } = require('../database/users')
const router = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { auth } = require('../middlerwares/auth')

router.post('/register', auth, async (req, res) => {
   try {
    const isEmailAlreadyUsed = await findUserByEmail(req.body.email)
    if (isEmailAlreadyUsed) return res.status(400).json({
        message: "Email já cadastrado"
    })
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)

    const user = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    }

    const saveUser = await saveUser(user)
    delete saveUser.password

    res.status(201).json({
        user: saveUser
    })
   } catch (error) {
    req.status(500).json({
        message: "Server error"
    })
   }
})

router.post('/login', auth, async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    const user = await findUserByEmail(email)

    if (!user) return req.status(401).send()

    const hasPassword = bcrypt.compareSync(password, user.password)

    if (!hasPassword) return req.status(401).send()

    const secret = process.env.SECRET

    const token = jwt.sign({
        userId: user.id,
        name: user.name
    }, secret)

    res.json({
        sucess: true,
        token
    })
})

router.get('/profile', auth, async (req, res) => {
    const user = await findUserById(req.body.userId)

    delete user.password
    res.json({
        user
    })
})