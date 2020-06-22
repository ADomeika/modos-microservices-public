<template>
  <div class="cart">
    <div><h1 class="title">{{ $t('views.cart.cart') }}</h1></div>
    <Loader v-if="loading" />
    <div
      v-if="cart.length < 1 && !loading"
      class="empty-cart">{{ $t('views.cart.cartEmpty') }}...</div>
    <div v-else class="totals">
      <div class="table">
        <transition-group name="slide" tag="div" class="cart-items">
          <div
            v-for="item in cart"
            :key="item.product.id + item.size"
            class="cart-item">
            <div
              class="table__content">
              <div class="product-image">
                <v-lazy-image
                  :src="'https://aputplqnen.cloudimg.io/width/150/x/' + item.product.gallery[0]"
                  :alt="`${item.product.name} nuotrauka`" />
              </div>
              <div class="product-information">
                <div class="col col__name product-info">
                  <div class="product-info__name">
                    <router-link
                      :to="`/parduotuve/${item.product.category.toLowerCase()}/${item.product.id}`">
                      {{ item.product.name }} ({{ item.size }})
                    </router-link>
                    <i
                      class="far fa-trash-alt"
                      @click="removeFromCart({ id: item.product.id, size: item.size })"></i> {{ $t('views.cart.removeFromCart') }}
                  </div>
                </div>
                <div class="col col__price">
                  {{ item.product.price | currency }}
                </div>
                <div class="col col__quantity" v-if="loading">
                  <p>{{ $t('views.cart.renewingQuantity') }}...</p>
                </div>
                <div class="col col__quantity" v-if="!loading">
                  <button
                    class="minus"
                    @click="changeQuantity({ id: item.product.id, size: item.size, quantity: -1 })">
                    <i class="fas fa-minus"></i>
                  </button>
                  <div class="quantity">{{ item.quantity }}</div>
                  <button
                    class="plus"
                    @click="item.quantity > 0 && changeQuantity({ id: item.product.id, size: item.size, quantity: 1 })"
                    :class="{ 'disabled': item.quantity === 0 }"
                    :disabled="item.quantity === 0">
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
                <div class="col col__total">
                  {{ $t('views.cart.total') }}: {{ item.product.price * item.quantity | currency }}
                </div>
              </div>
            </div>
          </div>
        </transition-group>
      </div>
      <DeliveryTable v-if="cart.length > 0" :total="total" />
    </div>
    <div class="order" v-if="cart.length > 0">
      <router-link
        to="/uzsakymas"
        class="order__btn">{{ $t('views.cart.order') }}
      </router-link>
    </div>
  </div>
</template>

<script>
import CartService from '@/services/CartService'
import { totalPriceMixin } from '@/mixins'
import Loader from '@/components/shared/Loader'

export default {
  mixins: [totalPriceMixin],
  data () {
    return {
      cart: []
    }
  },
  components: {
    DeliveryTable: () => import('@/components/cart/DeliveryTable'),
    Loader
  },
  methods: {
    async getItems () {
      try {
        const { data } = await CartService.getCartItems(this.$store.getters.cartId)
        this.cart = data.products
        this.$store.dispatch('setCartQuantity', this.cart.length)
      } catch (error) {
        if (error.response.status === 404) {
          this.cart = []
          this.$store.dispatch('setCartId', null)
          this.$store.dispatch('setCartQuantity', 0)
          this.$store.dispatch('setCartCheck', false)
          this.$store.dispatch('setCartWarning', true)
          this.$store.dispatch('setCartWarningTime', 0)
        } else {
          console.error(error)
        }
      } finally {
        this.$store.dispatch('setLoading', false)
      }
    },
    async removeFromCart (product) {
      try {
        await CartService.removeFromCart({ cartId: this.$store.getters.cartId, product })
        this.getItems()
      } catch (error) {
        console.error(error)
      }
    },
    async changeQuantity (product) {
      this.$store.dispatch('setLoading', true)
      try {
        await CartService.changeQuantity({ cartId: this.$store.getters.cartId, product })
        this.getItems()
      } catch (error) {
        console.error(error)
      } finally {
        this.$store.dispatch('setLoading', false)
      }
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  created () {
    if (this.$store.getters.cartId) {
      this.$store.dispatch('setLoading', true)
      this.getItems()
    }
  },
  beforeCreate () {
    this.$ua.trackView('/cart')
  }
}
</script>

<style scoped lang="scss">
.order {
  padding: 10px;
  &__btn {
    display: block;
    text-align: center;
    width: 100%;
    padding: 15px;
    font-size: 1.4em;
    border-radius: 5px;
    cursor: pointer;
    border: 3px solid #fff;
    background-color: transparent;
    color: #fff;
    transition: background-color .2s linear;
    &:hover {
      background-color: rgb(9, 107, 0);
    }
  }
}
.cart {
  width: 100%;
  color: #fff;
  @media screen and (min-width: 768px) {
    width: 80%;
    margin: 0 auto;
  }
  .title {
    padding-top: 20px;
    text-align: center;
  }
}
.table {
  * {
    @media screen and (min-width: 768px) {
      font-size: 1.1em;
    }
  }
  &__content {
    display: flex;
    flex-direction: row;
    border-bottom: 2px solid #fff;
  }
}
.col {
  padding: 10px;
  width: 100%;
  &__total {
    text-align: right;
  }
  &__quantity {
    position: relative;
    display: flex;
  }
  @media screen and (min-width: 410px) {
    &__quantity,
    &__total {
      width: 50%;
    }
  }
}
.product-image {
  padding: 5px;
  width: 100%;
  max-width: 160px;
  img {
    width: 100%;
  }
}
.product-information {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  padding: 5px;
}
.product-info__name {
  font-size: 1.2em;
  a {
    display: block;
    margin-bottom: 10px;
    &:hover {
      text-decoration: underline;
    }
  }
  i {
    color: rgb(255, 81, 81);
    cursor: pointer;
  }
}

.empty-cart {
  padding: 20px 10px;
  font-size: 1.6em;
}
.totals {
  padding: 30px 5px;
  width: 100%;
}

.minus,
.plus {
  cursor: pointer;
  color: #fff;
  font-size: 1.3em;
  background-color: transparent;
  border: none;
}
.minus,
.plus,
.quantity {
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  margin: 5px;
}
.quantity {
  text-align: center;
}
.cart-items {
  position: relative;
}
.cart-item {
  display: block;
}
.disabled {
  cursor: not-allowed;
}
/*
  Animations
*/
.slide-leave-active,
.slide-move {
  transition: 500ms cubic-bezier(0.59, 0.12, 0.34, 0.95);
  transition-property: opacity, transform;
}
.slide-leave-active {
  position: absolute;
}
.slide-leave-to {
  opacity: 0;
  transform: scaleY(0);
  transform-origin: center top;
}
</style>
