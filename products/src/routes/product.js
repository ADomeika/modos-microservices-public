const express = require('express')

const ProductController = require('../controllers/ProductsController')
const auth = require('../middleware/auth')

const { validationRules, validate } = require('../middleware/validator')

const router = express.Router()

// @route  POST api/products
// @desc   Create a product
// @access Private
router.post('/', [auth, validationRules(), validate], ProductController.store)

// @route  GET api/products
// @desc   Get all products with query params (kind of optional)
// @access Public
router.get('/', ProductController.index)

// @route  GET api/products/sale
// @desc   Get all sale items
// @access Public
router.get('/sale', ProductController.sale)

// @route  GET api/products/:id
// @desc   Get a product
// @access Public
router.get('/:id', ProductController.show)

// @route  PATCH api/products/:id
// @desc   Edit a product
// @access Private
router.patch('/:id', auth, ProductController.update)

// @route  DELETE api/products/:id
// @desc   Delete a product
// @access Private
router.delete('/:id', auth, ProductController.destroy)

module.exports = router
