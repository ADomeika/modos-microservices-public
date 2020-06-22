import axios from 'axios'

export default {
  removeImage (imagePath) {
    return axios.post('/api/pictures/removeImage', imagePath)
  },
  addPictures (imagePath) {
    return axios.post('/api/pictures/add', { gallery: imagePath })
  },
  getPictures () {
    return axios.get('/api/pictures')
  }
}
