const express = require('express')

const router = express.Router()

const PaymentsController = require('../controllers/PaymentsController')

// @route  POST api/payment
// @desc   Create a payment Stripe
// @access Public
router.post('/', PaymentsController.store)

// @route  POST api/payment
// @desc   Create a PayPal payment
// @access Public
router.post('/create-payment', PaymentsController.createPayment)

// @route  POST api/payment
// @desc   Execute a Paypal payment
// @access Public
router.post('/execute-payment', PaymentsController.executePayment)

module.exports = router
