const { validationResult } = require('express-validator')
const mongoose = require('mongoose')
const CronJob = require('cron').CronJob;

const ProductsService = require('../services/ProductsService')
const dictionary = require('../lang/dictionary')

const Cart = mongoose.model('Cart')

// lt or en
const prefferedLanguage = 'lt'

const addMinutes = (date, minutes) => new Date(date.getTime() + minutes * 60000)

const job = new CronJob('0 0 0-23 * * *', async () => {
  // TODO: check all the baskets and clear the ones expired
  console.log('Runs each hour, so check if the cart is not expired')
})

job.start()

exports.store = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
  const { productId, size, quantity, cartId = null } = req.body

  try {
    // Check if the product exists
    const product = await ProductsService.show(productId)

    const availableSize = product.sizes.find(productSize => productSize.size === size)
    // Check if product has the size
    if (!availableSize) return res.status(400).json({ error: dictionary.error.size[prefferedLanguage] })
    
    // Check if product has enough quantity
    if (availableSize.quantity < quantity) return res.status(400).json({ error: dictionary.error.quantity[prefferedLanguage] })
  } catch (error) {
    console.log(error)
    return res.status(500).json(error.error)
  }
  // Product Check - PASSED

  const {
    _id: id,
    name,
    price,
    category,
    subCategory,
    sizes,
    gallery,
    description
  } = await ProductsService.show(productId)

  // If cart already exists
  if (cartId) {
    try {
      const cart = await Cart.findById(cartId)
      if (!cart) return res.status(404).json({ error: dictionary.error.basket[prefferedLanguage] })

      // Check if the product is already in the cart
      const productInCart = cart.products.find(({ product, size: productSize }) => product.id === productId && productSize === size)
      // If product is in the cart, check if the size is the same, if it is, then increase quantity
      if (productInCart) {
        if (productInCart.size === size) {
          cart.products.find(({ product, size: productSize }) => {
            return product.id === productId && productSize === size
          }).quantity += quantity
        }
      } else {
        cart.products.push({
          product: { id, name, price, category, subCategory, gallery, description },
          size,
          quantity
        })
      }

      await cart.save()

      await ProductsService.update({
        productId,
        body: {
          sizes: sizes.map(productSize => {
            if (productSize.size === size) productSize.quantity -= quantity
            return productSize
          })
        }
      })

      // DO SOMETHING WITH SESSION
      res.cookie('session-id', cart.id, {
        maxAge: 1000 * 60 * 120,
        secure: false, // Change to true in prod
        httpOnly: true
      }).json(cart)
    } catch (error) {
      if (error.kind === 'ObjectId') return res.status(404).json({ error: dictionary.error.basket[prefferedLanguage] })
      res.status(500).json({ error: dictionary.error.server[prefferedLanguage] })
    }
  } else {
    // If cart does not exist
    try {
      const cart = new Cart({
        products: {
          product: { id, name, price, category, subCategory, gallery, description },
          size,
          quantity
        }
      })
      await cart.save()

      await ProductsService.update({
        productId,
        body: {
          sizes: sizes.map(productSize => {
            if (productSize.size === size) productSize.quantity -= quantity
            return productSize
          })
        }
      })
      res
        .status(201)
        .cookie('session-id', cart.id, {
          maxAge: 1000 * 60 * 120,
          secure: false, // Change to true in prod
          httpOnly: true
        })
        .json(cart)
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: dictionary.error.server[prefferedLanguage] })
    }
  }
}

// Implement an owner, so the owner only, will be allowed to view
exports.show = async (req, res) => {
  const { id } = req.params
  try {
    const cart = await Cart.findById(id)
    if (!cart) return res.status(404).json({ error: dictionary.error.basket[prefferedLanguage] })
    res.json(cart)
  } catch (error) {
    if (error.kind === 'ObjectId') return res.status(404).json({ error: dictionary.error.basket[prefferedLanguage] })
    res.status(500).json({ error: dictionary.error.server[prefferedLanguage] })
  }
}

exports.destroy = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

  const { cartId: id, product: { id: productId, size: productSize } } = req.body

  try {
    const cart = await Cart.findById(id)
    if (!cart) return res.status(404).json({ error: dictionary.error.basket[prefferedLanguage] })

    const productToRemove = cart.products.find(({ product, size }) => {
      return product.id === productId && size === productSize
    })

    if (!productToRemove) return res.status(404).json({ error: dictionary.error.itemNotInBasket[prefferedLanguage] })

    cart.products = cart.products.filter(({ product, size }) => {
      return !(product.id === productId && size === productSize)
    })

    if (!cart.products.length) {
      await cart.remove()
    } else {
      await cart.save()
    }
  
    const { sizes } = await ProductsService.show(productId)

    await ProductsService.update({
      productId,
      body: {
        sizes: sizes.map(productSize => {
          if (productSize.size === productToRemove.size) productSize.quantity += productToRemove.quantity
          return productSize
        })
      }
    })

    cart.products.length ? res.json(cart) : res.clearCookie('session-id').send()
  } catch (error) {
    if (error.kind === 'ObjectId') return res.status(404).json({ error: dictionary.error.basket[prefferedLanguage] })
    res.status(500).json({ error: dictionary.error.server[prefferedLanguage] })
  }
}

exports.update = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

  const { id } = req.params
  const { product: { id: productId, size, quantity } } = req.body

  try {
    // Check if the product exists
    const { sizes } = await ProductsService.show(productId)

    const availableSize = sizes.find(productSize => productSize.size === size)
    // Check if product has the size
    if (!availableSize) return res.status(400).json({ error: dictionary.error.size[prefferedLanguage] })
    
    // Check if product has enough quantity
    if (availableSize.quantity < quantity) return res.status(400).json({ error: dictionary.error.quantity[prefferedLanguage] })
  } catch (error) {
    return res.status(500).json(error.error)
  }

  try {
    const cart = await Cart.findById(id)
    if (!cart) return res.status(404).json({ error: dictionary.error.basket[prefferedLanguage] })

    const productToUpdate = cart.products.find(({ product, size: productSize }) => {
      return product.id === productId && productSize === size
    })

    if (!productToUpdate) return res.status(404).json({ error: dictionary.error.itemNotInBasket[prefferedLanguage] })

    cart.products = cart.products.map(({ product, size: productSize, quantity: productQuantity }) => {
      if (product.id === productId && productSize === size) {
        productQuantity += quantity
      }
      if (productQuantity === 0) return undefined
      else return { product, size, quantity: productQuantity }
    }).filter(element => element)

    if (!cart.products.length) {
      await cart.remove()
    } else {
      await cart.save()
    }
  
    const { sizes } = await ProductsService.show(productId)

    await ProductsService.update({
      productId,
      body: {
        sizes: sizes.map(productSize => {
          if (productSize.size === size) productSize.quantity -= quantity
          return productSize
        })
      }
    })

    cart.products.length ? res.json(cart) : res.clearCookie('session-id').send()
  } catch (error) {
    if (error.kind === 'ObjectId') return res.status(404).json({ error: dictionary.error.basket[prefferedLanguage] })
    res.status(500).json({ error: dictionary.error.server[prefferedLanguage] })
  }
}

exports.checkExistence = async (req, res) => {
  const VALID_FOR = 120 // minutes
  const { id } = req.params

  try {
    const cart = await Cart.findById(id)
    if (!cart) return res.status(404).json({ error: dictionary.error.basket[prefferedLanguage] })

    if (cart.createdAt < addMinutes(new Date(), -VALID_FOR)) {
      const { products } = cart

      const productsToUpdate = products.map(({ product: { id }, size, quantity }) => ({
        id,
        sizes: [{
          size,
          quantity
        }]
      })).reduce((acc, curr) => {
        const foundIndex = acc.findIndex(item => item.id === curr.id)
        if (foundIndex === -1) {
          acc.push(curr)
        } else {
          acc[foundIndex].sizes.push(curr.sizes[0])
        }
        return acc
      }, [])


      productsToUpdate.map(async ({ id, sizes: sizesToUpdate }) => {
        let { sizes } = await ProductsService.show(id)
        
        sizes = Object.values([...sizes, ...sizesToUpdate].reduce((acc, { size, quantity }) => {
          acc[size] = {
            size,
            quantity: (acc[size] ? acc[size].quantity : 0) + quantity
          }
          return acc
        }, {}))

        await ProductsService.update({
          productId: id,
          body: { sizes }
        })
      })

      await cart.remove()
      return res.status(404).clearCookie('session-id').json({ error: dictionary.error.removedBasket[prefferedLanguage] })
    } else {
      res.json(cart)
    }
  } catch (error) {
    if (error.kind === 'ObjectId') return res.status(404).json({ error: dictionary.error.basket[prefferedLanguage] })
    res.status(500).json({ error: dictionary.error.server[prefferedLanguage] })
  }
}
