import axios from 'axios'

export default {
  makeOrder ({ cartId, order: details }) {
    return axios.post('/api/orders', { cartId, details })
  },
  fetchOrders () {
    return axios.get('/api/orders')
  },
  fetchOrder (id) {
    return axios.get(`/api/orders/${id}`)
  },
  sendOrder (id) {
    return axios.delete(`/api/orders/${id}`)
  }
}
