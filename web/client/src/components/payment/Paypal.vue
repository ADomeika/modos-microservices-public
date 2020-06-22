<template>
  <div>
    <div id="paypal-button-container"></div>
    <div v-if="error" class="alert alert-danger">
      <strong>Ooops!</strong>  something went wrong 
    </div>
  </div>
</template>
<script>
import PaymentService from '@/services/PaymentService'

export default {
  data () {
    return {
      error: false
    }
  },
  mounted () {
    paypal.Button.render({
      env: 'sandbox',
      commit: true,
      payment: this.payment,
      onAuthorize: this.onAuthorize
    }, '#paypal-button-container')
  },
  methods: {
    async payment (data) {
      const deliveryType = this.$store.getters.delivery
      try {
        const response = await PaymentService.createPayment(this.$store.getters.cartId, data, deliveryType)
        return response.data.id
      } catch (error) {
        this.error = true
      }
    },
    async onAuthorize (data) {
      const deliveryType = this.$store.getters.delivery
      const { paymentID, payerID } = data
      try {
        await PaymentService.executePayment(this.$store.getters.cartId, { paymentID, payerID, deliveryType })
        this.$router.push('/success')
      } catch (error) {
        this.error = true
      }
    }
  }
}
    
</script>