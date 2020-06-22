const mongoose = require('mongoose')

const { Schema } = mongoose

const orderSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  products: {
    type: [Object],
    required: true
  },
  email: {
    type: String,
    required: true
  },
  telephone: {
    type: String,
    required: true
  },
  deliveryType: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  pastomatas: {
    type: String
  },
  address: {
    type: String
  },
  postcode: {
    type: String
  },
  country: {
    type: String
  },
  city: {
    type: String
  },
  county: {
    type: String
  }
})

mongoose.model('Order', orderSchema)
