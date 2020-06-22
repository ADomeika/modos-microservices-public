const mongoose = require('mongoose')

const { Schema } = mongoose

var productSchema = new Schema({
  _id: false,
  product: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    subCategory: {
      type: String,
      required: true
    },
    gallery: {
      type: [String],
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
  size: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
})

const cartSchema = new Schema({
  products: {
    type: [productSchema],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

mongoose.model('Cart', cartSchema)
