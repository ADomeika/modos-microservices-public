const fs = require('fs')
const exec = require('child_process').exec

const mongoose = require('mongoose')
const cloudinary = require('cloudinary').v2

const Product = mongoose.model('Product')

const dictionary = require('../lang/dictionary')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

exports.store = async (req, res) => {
  const galleryPath = req.body.gallery
  const lastIndex = galleryPath.lastIndexOf('/')
  const requiredPath = galleryPath.slice(lastIndex + 1)

  fs.readdir(galleryPath, async (err, items) => {
    if (err) console.error(err)
    return new Promise(async (resolve, reject) => {
      const uploadLen = items.length
      const uploadRes = []
      for (let i = 0; i <= uploadLen + 1; i++) {
        if (uploadRes.length === uploadLen) {
          resolve(uploadRes)
          return
        } else {
          const filePath = galleryPath + '/' + items[i]
          try {
            const result = await cloudinary.uploader.upload(
              filePath,
              {
                folder: requiredPath,
                width: 1000,
                height: 1000,
                crop: 'fit'
              }
            )
            if (result) {
              uploadRes.push(result.secure_url)
            }
          } catch (error) {
            reject(error)
          }
        }
      }
    })
      .then(async (gallery) => {
        try {
          delete req.body.gallery
          const product = new Product({ ...req.body, gallery })
          await product.save()
          exec('rm -r ' + galleryPath, function (err) {
            if (err) throw err
          })
          res.json(product)
        } catch (error) {
          res.status(500).json({ error: dictionary.error.server[req.defaultLang] })
        }
      })
      .catch(err => {
        res.status(500).json(err)
      })
  })
}

exports.index = async (req, res) => {
  const match = {}
  const {
    kategorija: category,
    subkategorija: subCategory,
    dydis: size,
    limit,
    skip
  } = req.query
  if (category) match.category = { $regex: new RegExp(category, 'i') }
  if (subCategory) match.subCategory = { $regex: new RegExp(subCategory, 'i') }
  if (size) match['sizes.size'] = { $regex: new RegExp(size, 'i') }
  const options = {
    limit: parseInt(limit),
    skip: parseInt(skip) * limit
  }
  try {
    const products = await Product.find()
      .find(match)
      .limit(options.limit)
      .skip(options.skip)
    res.json(products)
  } catch (error) {
    res.status(500).json({ error: dictionary.error.server[req.defaultLang] })
  }
}

exports.show = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ error: dictionary.error.product[req.defaultLang] })
    res.json(product)
  } catch (error) {
    if (error.kind === 'ObjectId') return res.status(404).json({ error: dictionary.error.product[req.defaultLang] })
    res.status(500).json({ error: dictionary.error.server[req.defaultLang] })
  }
}

exports.update = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!product) return res.status(404).json({ error: dictionary.error.product[req.defaultLang] })
    res.json(product)
  } catch (error) {
    if (error.kind === 'ObjectId') return res.status(404).json({ error: dictionary.error.product[req.defaultLang] })
    res.status(500).json({ error: dictionary.error.server[req.defaultLang] })
  }
}

exports.sale = async (req, res) => {
  try {
    const saleItems = await Product
      .find({ onSale: true })
      .select({ gallery: { $slice: 1 } })
    res.json(saleItems)
  } catch (error) {
    res.status(500).json({ error: dictionary.error.server[req.defaultLang] })
  }
}

exports.destroy = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) return res.status(404).json({ error: dictionary.error.product[req.defaultLang] })

    const { resources } = await cloudinary.api.resources({
      type: 'upload',
      prefix: product.gallery,
      max_results: 50
    })
    if (resources.length) await cloudinary.api.delete_resources(resources.map(item => item.public_id))
    res.send()
  } catch (error) {
    if (error.kind === 'ObjectId') return res.status(404).json({ error: dictionary.error.product[req.defaultLang] })
    res.status(500).json({ error: dictionary.error.server[req.defaultLang] })
  }
}
