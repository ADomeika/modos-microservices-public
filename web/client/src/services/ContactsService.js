import axios from 'axios'

export default {
  sendMessage (body) {
    return axios.post('/api/contacts', body)
  }
}
