const fs = require('fs')
const path = require('path')

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const fileUploadDir = path.join(__dirname, '../public/uploads')

if (!fs.existsSync(fileUploadDir)) {
  fs.mkdirSync(fileUploadDir, { recursive: true })
}

const corsOptions = {
  origin: process.env.ORIGIN,
  optionsSuccessStatus: 200
}

const app = express()
app.use(cors(corsOptions))
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.json({ limit: '100mb' }))

app.use('/api/auth', require('./routes/auth'))
app.use('/api/pictures', require('./routes/picture'))

// Temp solution
app.use(express.static(path.resolve(__dirname, '..', 'client', 'dist')))
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'client', 'dist', 'index.html'))
})

if (process.env.NODE_ENV === 'production') {
  app.use('/api', require('./routes/deploy'))
  app.use(express.static(path.resolve(__dirname, '..', 'client', 'dist')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'dist', 'index.html'))
  })
}

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => {
  app.listen(process.env.PORT)
}).catch(err => console.log(err))
