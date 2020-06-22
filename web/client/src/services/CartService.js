import axios from 'axios'

export default {
  addItemsToCart ({ cartId, product }) {
    return axios.post('/api/carts', { cartId, ...product })
  },
  getCartItems (cartId) {
    return axios.get(`/api/carts/${cartId}`)
  },
  removeFromCart ({ cartId, product }) {
    return axios.patch('/api/carts', { cartId, product })
  },
  changeQuantity ({ cartId, product }) {
    return axios.patch(`/api/carts/${cartId}`, { product })
  },
  checkExistence (cartId) {
    return axios.get(`/api/carts/existence/${cartId}`)
  }
}
