export default {
  setLoading: (state, payload) => {
    state.loading = payload
  },
  setDelivery: (state, payload) => {
    state.delivery = payload
  },
  setCartId: (state, payload) => {
    state.cartId = payload
  },
  setCartQuantity: (state, payload) => {
    state.cartQuantity = payload
  },
  setCartCheck: (state, payload) => {
    state.cartCheck = payload
  },
  setCartWarning: (state, payload) => {
    state.cartWarning = payload
  },
  setCartWarningTime: (state, payload) => {
    state.cartWarningTime = payload
  }
}
