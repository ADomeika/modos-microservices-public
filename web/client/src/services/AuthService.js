import axios from 'axios'

export default {
  login (credentials) {
    return axios.post('/api/auth', credentials)
  }
}
