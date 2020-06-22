<template>
  <div class="orders">
    <Loader v-if="loading" />
    <template v-if="!loading">
      <Order
        v-for="order in orders"
        :key="order._id"
        :order="order" />
    </template>
    <h1 v-if="!loading && orders.length === 0">{{ $t('views.admin.noOrdersYet') }}...</h1>
  </div>
</template>

<script>
import OrderService from '@/services/OrderService'
import Loader from '@/components/shared/Loader'

export default {
  components: {
    Order: () => import('@/components/admin/Orders/Order'),
    Loader
  },
  data () {
    return {
      orders: []
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  beforeMount () {
    this.$store.dispatch('setLoading', true)
  },
  async created () {
    try {
      const { data } = await OrderService.fetchOrders()
      this.orders = data
    } catch (error) {
      console.error('Atsitiko kazkas negero')
    } finally {
      this.$store.dispatch('setLoading', false)
    }
  }
}
</script>

<style scoped lang="scss">
.orders {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
  h1 {
    color: #fff;
  }
}
</style>
