const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/payments', require('./src/routes/payment'))

const port = process.env.PORT || 3000
app.listen(port, () => console.log('Payment service is running...'))
