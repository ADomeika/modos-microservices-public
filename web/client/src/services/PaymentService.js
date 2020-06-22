import axios from 'axios'

export default {
  makePayment ({ cartId, details }) {
    return axios.post('/api/payments', { cartId, details })
  },
  createPayment (cartId, details, deliveryType) {
    return axios.post('/api/payments/create-payment', { cartId, deliveryType, details })
  },
  executePayment (cartId, details) {
    return axios.post('/api/payments/execute-payment', { cartId, details })
  }
}
