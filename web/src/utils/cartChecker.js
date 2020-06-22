const schedule = require('node-schedule')

const Cart = require('../models/cart')
const Product = require('../models/product')

function addMinutes (date, minutes) {
  return new Date(date.getTime() + minutes * 60000)
}

exports.checkCartExpiration = () => {
  const rule = new schedule.RecurrenceRule()
  // Check every hour
  rule.hour = new schedule.Range(0, 23, 1)
  schedule.scheduleJob(rule, async () => {
    try {
      const carts = await Cart.find()
      carts.map(async (cart) => {
        if (cart.createdAt < addMinutes(new Date(), -120)) {
          await Promise.all(cart.products.map(async (product) => {
            await Cart.findByIdAndUpdate(cart._id, { $pull: { products: { ...product } } }, { new: true })
            await Product.findOneAndUpdate({
              _id: product.id,
              sizes: {
                $elemMatch: {
                  size: product.size
                }
              }
            }, { $inc: { 'sizes.$.quantity': product.quantity } })
          }))
          await Cart.findByIdAndRemove(cart._id)
        }
      })
    } catch (error) {
      console.log(error)
    }
  })
}
