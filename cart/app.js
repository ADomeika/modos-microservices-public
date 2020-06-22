const express = require('express')
const mongoose = require('mongoose')
const session = require('cookie-session')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(
  session({
    maxAge: 120 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
  })
)
app.use(cors())

require('./src/models/Cart')

app.use('/api/carts', require('./src/routes/cart'))

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})

app.listen(3000, () => {
  console.log(`Listening on port`, 3000)
})
