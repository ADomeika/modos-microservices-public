const fs = require('fs')
const exec = require('child_process').exec
const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})

const readAndWriteFile = (singleImg, newPath) => {
  return new Promise((resolve) => {
    fs.readFile(singleImg.path, (err, data) => {
      if (err) return { error: 'unknownError' }
      fs.writeFile(newPath, data, (err) => {
        if (err) return { error: 'unknownError' }
        resolve('Done Uploading image -' + singleImg.originalFilename)
      })
    })
  })
}

exports.addPictures = async (req, res) => {
  const galleryPath = req.body.gallery
  fs.readdir(galleryPath, async (err, items) => {
    if (err) console.log(err)
    return new Promise(async (resolve, reject) => {
      const uploadLen = items.length
      const uploadRes = []
      for (let i = 0; i <= uploadLen + 1; i++) {
        if (uploadRes.length === uploadLen) {
          resolve(uploadRes)
          return
        } else {
          const filePath = 'public/uploads/pictures/' + items[i]
          await cloudinary.uploader.upload(
            filePath,
            {
              folder: 'pictures',
              width: 600,
              height: 600,
              crop: 'fit'
            }
          )
            .then(result => {
              if (result) {
                uploadRes.push(result.secure_url)
              }
            })
            .catch(error => {
              reject(error)
            })
        }
      }
    })
      .then(data => {
        exec(`rm -r '${galleryPath}'`, function (err) {
          if (err) throw err
        })
        return res.send(data)
      })
      .catch(err => {
        res.send(err)
      })
  })
}

exports.fileupload = (req, res) => {
  const { id } = req.user
  const multiparty = require('multiparty')
  const form = new multiparty.Form()
  let newPath
  form.parse(req, async (err, fields, files) => {
    if (err) res.status(500).send({ error: 'Serverio klaida' })
    const imageArr = Object.values(files)

    const waitForImagesToUpload = imageArr.map(image => {
      if (!fs.existsSync('./public/uploads/' + id)) {
        fs.mkdirSync('./public/uploads/' + id)
      }
      newPath = './public/uploads/' + id + '/' + image[0].originalFilename
      const singleImg = image[0]
      return readAndWriteFile(singleImg, newPath)
    })
    try {
      await Promise.all(waitForImagesToUpload)
      res.send('./public/uploads/' + id)
    } catch (error) {
      res.status(500).send({ error: 'Serverio klaida' })
    }
  })
}

exports.removeImage = (req, res) => {
  fs.unlink(req.body.filePath, (err) => {
    if (err) return res.status(500).send({ error: 'Serverio klaida' })
    const sourcePath = req.body.filePath
    const lastIndex = sourcePath.lastIndexOf('/')
    const requiredPath = sourcePath.slice(0, lastIndex + 1)
    fs.readdir(requiredPath, function (err, files) {
      if (err) res.status(500).send({ error: 'Serverio klaida' })
      else {
        if (!files.length) {
          fs.rmdir(requiredPath, (err) => {
            if (err) throw err
          })
        }
      }
    })
    res.send('Successfully deleted file')
  })
}

exports.getPictures = async (req, res) => {
  try {
    const data = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'pictures/',
      max_results: 500
    })
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: 'Serverio Klaida' })
  }
}
