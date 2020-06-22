const fs = require('fs')
const path = require('path')

const express = require('express')
const expressip = require('express-ip')
const mongoose = require('mongoose')
const cors = require('cors')

const fileUploadDir = path.join(__dirname, '../public/uploads')
if (!fs.existsSync(fileUploadDir)) {
  fs.mkdirSync(fileUploadDir, { recursive: true })
}

const app = express()
app.use(express.json({ limit: '100mb' }))
app.use(expressip().getIpInfoMiddleware)
app.use(cors())

require('./src/models/Product')

app.use('**', (req, res, next) => {
  let defaultLang = 'lt'
  /* Example:
  {
    range: [ 1040637440, 1040637695 ],
    country: 'GB',
    region: 'ENG',
    eu: '1',
    timezone: 'Europe/London',
    city: 'Bradford',
    ll: [ 53.8328, -1.7255 ],
    metro: 0,
    area: 20
  }
  */
  const ipInfo = req.ipInfo
  if (ipInfo.country !== 'LT') {
    defaultLang = 'en'
  }
  console.log(ipInfo)
  req.defaultLang = defaultLang
  next()
})

app.use('/api/products', require('./src/routes/product'))

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})

app.listen(3000, () => {
  console.log('Products service is listening')
})
