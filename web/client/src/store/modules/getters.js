export default {
  products: state => {
    return state.products
  },
  loading: state => {
    return state.loading
  },
  delivery: state => {
    return state.delivery
  },
  cartId: state => {
    return state.cartId
  },
  cartQuantity: state => {
    return state.cartQuantity
  },
  cartCheck: state => {
    return state.cartCheck
  },
  cartWarning: state => {
    return state.cartWarning
  },
  cartWarningTime: state => {
    return state.cartWarningTime
  }
}
