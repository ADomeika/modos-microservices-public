const express = require('express')
const expressip = require('express-ip')
const mongoose = require('mongoose')
const session = require('cookie-session')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(expressip().getIpInfoMiddleware)
app.use(cookieParser())
app.use(
  session({
    maxAge: 120 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
  })
)
app.use(cors())

require('./src/models/Order')

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
  req.defaultLang = defaultLang
  next()
})

app.use('/api/orders', require('./src/routes/order'))

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})

app.listen(300, () => {
  console.log(`Listening on port`, 3000)
})
