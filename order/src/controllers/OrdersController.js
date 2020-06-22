const sgMail = require('@sendgrid/mail')
const mongoose = require('mongoose')

const Order = mongoose.model('Order')

const ProductsService = require('../services/ProductsService')
const CartsService = require('../services/CartsService')

const createMessageToCustomer = require('../utils/msgToCustomer')
const createMessageToOwner = require('../utils/msgToOwner')

const dictionary = require('../lang/dictionary')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

exports.store = async (req, res) => {
  const { cartId, details } = req.body
  
  try {
    const cart = await CartsService.show(cartId)
    if (!cart) return res.status(404).json({ error: dictionary.error.cart[req.defaultLang] })

    const { products } = cart

    let initialValue = 0

    switch (details.deliveryType) {
      case 'ltPastu':
        initialValue += 2
        break
      case 'pastomatu':
        initialValue += 2.5
        break
      case 'esValstybese':
        initialValue += 6
        break
      case 'ktValstybese':
        initialValue += 10
        break
      default:
        return res.status(400).json({ error: dictionary.error.deliveryType[req.defaultLang] })
    }

    const total = products.reduce((acc, curr) => {
      return acc + curr.quantity * curr.product.price
    }, initialValue)

    const order = new Order({ products, ...details, total })

    await order.save()

    // DESTROY CART AFTER PURCHASE, MEANING THAT CLOTHES DO NOT GO BACK
    // await cart.remove()

    sgMail.send(createMessageToCustomer(order))
    sgMail.send(createMessageToOwner(order))

    res.json(order)
  } catch (error) {
    if (error.kind === 'ObjectId') return res.status(404).json({ error: dictionary.error.cart[req.defaultLang] })
    res.status(500).json({ error: dictionary.error.server[req.defaultLang] })
  }
}

exports.index = async (req, res) => {
  try {
    const orders = await Order.find()
    res.json(orders)
  } catch (error) {
    res.status(500).json({ error: dictionary.error.server[req.defaultLang] })
  }
}

exports.show = async (req, res) => {
  const { id } = req. params
  try {
    const order = await Order.findById(id)
    if (!order) return res.status(404).json({ error: dictionary.error.order[req.defaultLang] })

    res.json(order)
  } catch (error) {
    if (error.kind === 'ObjectId') return res.status(404).json({ error: dictionary.error.order[req.defaultLang] })
    res.status(500).json({ error: dictionary.error.server[req.defaultLang] })
  }
}

exports.destroy = async (req, res) => {
  const { id } = req.params
  try {
    const order = await Order.findById(id)
    if (!order) return res.status(404).json({ error: dictionary.error.order[req.defaultLang] })
    
    await order.remove()

    const msgToCustomer = {
      to: order.email,
      from: 'admin@modos-design.lt',
      subject: 'NEATSAKYTI: MoDo\'s Design',
      text: 'Užsakymas',
      html: `
        <p>Užsakymo numeris - ${order._id}, buvo išsiųstas.</p>
      `
    }
    
    sgMail.send(msgToCustomer)
    res.send()
  } catch (error) {
    if (error.kind === 'ObjectId') return res.status(404).json({ error: dictionary.error.order[req.defaultLang] })
    res.status(500).json({ error: dictionary.error.server[req.defaultLang] })
  }
}
