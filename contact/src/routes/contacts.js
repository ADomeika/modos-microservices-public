const express = require('express')
const { check } = require('express-validator')

const router = express.Router()

const ContactsController = require('../controllers/ContactsController')

// @route  POST api/contact
// @desc   Send an email
// @access Public
router.post('/', [
  check('email', 'El. paštas yra privalomas ir turi būti galiojantis').isEmail(),
  check('fullName', 'Pilnas vardas yra privalomas').not().isEmpty(),
  check('message', 'Žinutė yra privaloma ir turi būti ilgesnė nei 5 raidės').isLength({ min: 5 })
], ContactsController.store)

module.exports = router
