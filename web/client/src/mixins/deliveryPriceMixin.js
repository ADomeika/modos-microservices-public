export const deliveryPriceMixin = {
  computed: {
    deliveryPrice () {
      switch (this.$store.getters.delivery) {
        case 'ltPastu':
          return 2
        case 'pastomatu':
          return 2.5
        case 'esValstybese':
          return 6
        case 'ktValstybese':
          return 10
        default:
          return 0
      }
    }
  }
}
