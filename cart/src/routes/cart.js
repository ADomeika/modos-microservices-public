const express = require('express')
const { check } = require('express-validator')

const router = express.Router()

const CartsController = require('../controllers/CartsController')
const owner = require('../middleware/owner')

const dictionary = require('../lang/dictionary')
const preferredLanguage = 'lt'

// @route  POST api/carts
// @desc   Create a cart or add to existing
// @access Public
router.post('/', [
  check('productId', dictionary.required.product[preferredLanguage]).not().isEmpty(),
  check('size', dictionary.required.size[preferredLanguage]).not().isEmpty(),
  check('quantity', dictionary.required.quantity[preferredLanguage]).isInt({ gt: 0 })
], CartsController.store)

// @route  GET api/carts/:id
// @desc   Get cart items
// @access Public
router.get('/:id', CartsController.show)

// @route  PATCH api/carts/:id
// @desc   Change cart item quantity
// @access Public
router.patch('/:id', [
  check('product.id', dictionary.required.productId[preferredLanguage]).not().isEmpty(),
  check('product.size', dictionary.required.size[preferredLanguage]).not().isEmpty(),
  check('product.quantity').custom((value) => {
    if (value === -1 || value === 1) return true
    else throw new Error(dictionary.required.minusOrPlusOne[preferredLanguage])
  })
], CartsController.update)

// @route  PATCH api/carts
// @desc   Remove items from cart
// @access Public
router.patch('/', [
  check('cartId', dictionary.required.cartId[preferredLanguage]).not().isEmpty(),
  check('product.id', dictionary.required.productId[preferredLanguage]).not().isEmpty(),
  check('product.size', dictionary.required.size[preferredLanguage]).not().isEmpty()
], CartsController.destroy)

// @route  GET api/carts/existence/:id
// @desc   Remove items from cart if expired
// @access Public
router.get('/existence/:id', CartsController.checkExistence)

module.exports = router
