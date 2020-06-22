export const totalPriceMixin = {
  computed: {
    total () {
      const totalArray = this.cart.map((product) => {
        return product.quantity * product.product.price
      })
      let total = 0
      for (let number of totalArray) {
        total += number
      }
      return total
    }
  }
}
