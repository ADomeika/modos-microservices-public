const express = require('express')

const router = express.Router()

const auth = require('../middleware/auth')
const PictureController = require('../controllers/PictureController')

router.post('/fileupload', auth, PictureController.fileupload)
router.post('/removeImage', auth, PictureController.removeImage)
router.post('/add', auth, PictureController.addPictures)
router.get('/', PictureController.getPictures)

module.exports = router
