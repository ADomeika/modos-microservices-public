const express = require('express')

const app = express()
app.use(express.json())

app.use('/api/contacts', require('./src/routes/contacts'))

app.listen(3000, () => {
  console.log(`Listening on port`, 3000)
})
