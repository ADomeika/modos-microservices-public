const stripe = require('stripe')(process.env.STRIPE_API_KEY)
const CartsService = require('../services/CartsService')
const PaypalService = require('../services/PaypalService')

const getDeliveryPrice = (deliveryType) => {
  switch (deliveryType) {
    case 'ltPastu':
      return 200
    case 'pastomatu':
      return 250
    case 'esValstybese':
      return 600
    case 'ktValstybese':
      return 1000
    default:
      throw new Error('Something went wrong')
  }
}

exports.store = async (req, res) => {
  // First of all, check if the cartId exists in CartsService.
  // If it does exist, gather the products into line_items
  // Then create a checkout session, if it was paid, create an order to OrdersService
  const cart = await CartsService.show(req.body.cartId)
  if (!cart) return res.status(404).json({ error: 'Nerastas krepselis' })
  const deliveryPrice = getDeliveryPrice(req.body.details.deliveryType)

  const line_items = [{
    name: 'Pristatymas', // Delivery
    description: 'Pristatymo mokestis', // Delvery fee
    amount: deliveryPrice,
    currency: 'eur',
    quantity: 1
  }]

  cart.products.forEach(product => {
    const line_item = {
      name: product.product.name,
      description: product.product.description,
      images: product.product.gallery,
      amount: product.product.price * 100,
      currency: 'eur', // gb/usd
      quantity: product.quantity
    }

    line_items.push(line_item)
  })

  try {
    const session = await stripe.checkout.sessions.create({
      customer_email: req.body.email,
      payment_method_types: ['card'],
      line_items,
      success_url: process.env.SUCCESS_URL,
      cancel_url: process.env.CANCEL_URL,
    })

    res.json(session)
  } catch (err) {
    res.send(err)
  }
}

exports.createPayment = async (req, res) => {
  console.log(req.body)
  const cart = await CartsService.show(req.body.cartId)
  if (!cart) return res.status(404).json({ error: 'Nerastas krepselis' })
  const deliveryPrice = getDeliveryPrice(req.body.deliveryType)

  const prices = []
  cart.products.forEach(product => {
    const price = product.product.price
    prices.push(price)
  })

  const total = (prices.reduce((accumulator, currentValue) => accumulator + currentValue) + deliveryPrice / 100).toFixed(2)

  console.log(total)

  const body = {
    intent: 'sale',
    payer:
    {
      payment_method: 'paypal'
    },
    transactions: [
    {
      amount:
      {
        total,
        currency: 'EUR'
      }
    }],
    redirect_urls:
    {
      return_url: process.env.SUCCESS_URL,
      cancel_url: process.env.CANCEL_URL
    }
  }
  try {
    const { id } = await PaypalService.payment(body)
    res.json({ id })
  } catch (error) {
    res.status(500).json({ error })
  }
}

exports.executePayment = async (req, res) => {
  const { paymentID, payerID, deliveryType } = req.body.details

  const cart = await CartsService.show(req.body.cartId)
  if (!cart) return res.status(404).json({ error: 'Nerastas krepselis' })
  const deliveryPrice = getDeliveryPrice(deliveryType)

  const prices = []
  cart.products.forEach(product => {
    const price = product.product.price
    prices.push(price)
  })

  const total = (prices.reduce((accumulator, currentValue) => accumulator + currentValue) + deliveryPrice / 100).toFixed(2)

  const body = {
    payer_id: payerID,
    transactions: [
    {
      amount:
      {
        total,
        currency: 'EUR'
      }
    }]
  }
  try {
    await PaypalService.execute({ paymentID, body })
    res.send()
  } catch (error) {
    res.status(500).json({ error })
  }
}
