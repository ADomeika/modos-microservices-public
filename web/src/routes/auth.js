const express = require('express')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

const router = express.Router()

router.post('/', [
  check('email', 'Truksta el pasto').isEmail(),
  check('password', 'Slaptazodis yra privalomas').exists()
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res
        .status(400)
        .json({ error: 'Neteisingi prisijungimo duomenys' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res
        .status(400)
        .json({ error: 'Neteisingi prisijungimo duomenys' })
    }

    const payload = {
      user: {
        id: user.id
      }
    }
    jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
      if (err) throw err
      res.json({ token })
    })
  } catch (error) {
    res.status(500).json({ error: 'Serverio Klaida' })
  }
})

module.exports = router
