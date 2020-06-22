const mongoose = require('mongoose')
const { Schema } = mongoose

var sizeSchema = new Schema({
  _id: false,
  size: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
})

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  originalPrice: {
    type: Number
  },
  price: {
    type: Number,
    required: true
  },
  sizes: {
    type: [sizeSchema],
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
  onSale: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    required: true
  },
  additionalInfo: {
    type: String,
    required: true
  },
  gallery: {
    type: [String],
    default: ['https://www.softwarearge.com/wp-content/uploads/2018/09/no-image-icon-6.png']
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
})

mongoose.model('Product', productSchema)
