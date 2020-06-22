const express = require('express')

const router = express.Router()

const OrdersController = require('../controllers/OrdersController')
const auth = require('../middleware/auth')
const owner = require('../middleware/owner')
const { validationRules, validate } = require('../middleware/validator')

// @route  POST api/order
// @desc   Create a new order
// @access Public
router.post('/', [owner, validationRules(), validate], OrdersController.store)

// @route  GET api/order
// @desc   Get all orders
// @access Public
router.get('/', auth, OrdersController.index)

// @route  GET api/order/:id
// @desc   Get an order
// @access Public
router.get('/:id', auth, OrdersController.show)

// @route  DELETE api/order/:id
// @desc   Remove order and add it to Fulfilled Orders
// @access Public
router.delete('/:id', auth, OrdersController.destroy)

module.exports = router
