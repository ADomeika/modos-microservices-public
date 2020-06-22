<template>
  <div class="order">
    <Loader v-if="loading" />
    <div v-if="!loading" class="card">
      <div class="card-body">
        <div>
          <div class="order__info">
            <h4 class="order-number">{{ $t('views.admin.order.orderNumber') }}: {{ order._id }}</h4>
            <p class="name">{{ $t('views.admin.order.firstName') }}: {{ order.firstName }}</p>
            <p class="name">{{ $t('views.admin.order.lastName') }}: {{ order.lastName }}</p>
            <p class="email">{{ $t('views.admin.order.email') }}: {{ order.email }}</p>
            <p class="tel">{{ $t('views.admin.order.telephone') }}: {{ order.telephone }}</p>
            <p class="delivery">{{ $t('views.admin.order.chosenDeliveryType') }}: {{ deliveryType }}</p>
            <p class="delivery">{{ $t('views.admin.order.totalPrice') }}: {{ order.totalPrice | currency }}</p>
            <p class="delivery">{{ $t('views.admin.order.address') }}: {{ order.address || order.pastomatas }}</p>
          </div>
          <div class="order__info"><h4 class="order-number">{{ $t('views.admin.order.orderedItems') }}:</h4></div>
          <div class="products">
            <div
              v-for="product in order.products"
              :key="product.id + product.size"
              class="product">
              <span>{{ $t('views.admin.order.title') }}: {{ product.name }}</span>
              <div class="image">
                <v-lazy-image
                  :src="'https://aputplqnen.cloudimg.io/width/200/x/' + product.image"
                  :alt="`${order._id} nuotrauka`" />
              </div>
              <span>{{ $t('views.admin.order.size') }}: {{ product.size }}, {{ $t('views.admin.order.quantity') }}: {{ product.quantity }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button class="btn" v-if="!loading" @click="submit">{{ $t('views.admin.order.sentPaid') }}</button>
  </div>
</template>

<script>
import OrderService from '@/services/OrderService'
import Loader from '@/components/shared/Loader'

export default {
  components: {
    Loader
  },
  data () {
    return {
      order: null
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    deliveryType () {
      switch (this.order.deliveryType) {
        case 'esValstybese':
          return 'Europos Valstybėje'
        case 'ktValstybese':
          return 'Kitoje Valstybėje'
        case 'ltPastu':
          return 'Lietuvos Paštu'
        case 'pastomatu':
          return 'Paštomatu'
        default:
          return 'Kažkas negerai'
      }
    }
  },
  beforeMount () {
    this.$store.dispatch('setLoading', true)
  },
  created () {
    this.fetchOrder()
  },
  methods: {
    async submit () {
      try {
        await OrderService.sendOrder(this.order._id)
        this.$router.push('/admin/uzsakymai')
      } catch (error) {
        console.error(error)
      }
    },
    async fetchOrder () {
      try {
        const { data } = await OrderService.fetchOrder(this.$route.params.orderId)
        this.order = data
      } catch (error) {
        console.log(error)
      } finally {
        this.$store.dispatch('setLoading', false)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.order {
  position: relative;
}
.card {
  margin: 10px 1%;
  width: 98%;
  background-color: #222;
  box-shadow: -2px 5px 20px 0px rgba(255,255,255,0.3);
  padding: 15px;
  border-radius: 10px;
  transition: transform .2s;
}
.image {
  text-align: center;
  margin-bottom: 10px;
  max-width: 200px;
  margin: 0 auto;

  img {
    width: 100%;
    object-fit: cover;
    max-width: 250px;
  }
}
.order-number {
  color: #fff;
  font-size: 1.1rem;
  margin-bottom: 5px;
}
.name {
  font-size: 18px;
}
.name,
.email,
.tel,
.delivery {
  color: #fff;
  margin-bottom: 5px;
}
.btn {
  width: 100%;
  padding: 20px;
  font-size: 1.2em;
  border: none;
  border-radius: 15px;
}
.products {
  display: flex;
  flex-wrap: wrap;
}
.product {
  text-align: center;
  width: 100%;
  padding: 0 15px;
  @media screen and (min-width: 601px) {
    width: 50%;
  }
  @media screen and (min-width: 1250px) {
    width: 33%;
  }
}
</style>
