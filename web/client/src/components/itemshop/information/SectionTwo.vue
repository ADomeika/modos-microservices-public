<template>
  <div class="section-2">
    <div class="kaushan old-price" v-if="item.onSale">{{ item.originalPrice | currency }}</div>
    <div class="kaushan item-price">{{ item.price | currency }}</div>
    <div class="kaushan size-selection">
      <div>
        <label for="size">{{ $t('components.product.sectionTwo.size') }}: </label>
        <select
          name="size"
          id="size"
          class="kaushan size-select"
          v-model="selectedSize"
          @change="quantity = 1"
          :disabled="addedToCart">
          <option
            v-for="(size, i) in sizes"
            :key="i"
            :value="size">{{ size.size }} ({{ $t('components.product.sectionTwo.remaining') }}: {{ size.quantity }})</option>
        </select>
      </div>
    </div>
    <div class="kaushan basket-info">
      <div class="card__actions">
        <div class="action__input">
          <div class="minus" :class="{ 'disabled': quantity < 2 }">
            <i class="fas fa-minus" @click="quantity > 1 && quantity--"></i>
          </div>
          <div class="quantity">{{ quantity }}</div>
          <div class="plus" :class="{ 'disabled': quantity >= selectedSize.quantity }">
            <i class="fas fa-plus" @click="quantity < selectedSize.quantity && quantity++"></i>
          </div>
        </div>
        <div class="action__button">
          <button
            class="kaushan"
            @click="addToCart({ productId: item._id, size: selectedSize.size, quantity })"
            :class="{ 'disabled': quantity > selectedSize.quantity }"
            :disabled="addedToCart || quantity > selectedSize.quantity">
            <i class="fas fa-shopping-cart"></i> {{ $t('components.product.sectionTwo.toCart') }}
          </button>
          <transition name="slide">
            <div class="alert-box" v-if="addedToCart">
              <div class="alert">{{ $t('components.product.sectionTwo.addedToCart') }}!</div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartService from '@/services/CartService'
import { mapGetters } from 'vuex'

export default {
  props: ['item'],
  data () {
    return {
      quantity: 1,
      sizes: this.item.sizes,
      selectedSize: '',
      addedToCart: false
    }
  },
  mounted () {
    this.selectedSize = this.sizes[0]
  },
  methods: {
    async addToCart (product) {
      this.addedToCart = true
      try {
        const response = await CartService.addItemsToCart({ cartId: this.cartId, product })
        if (!response.data.error) {
          setTimeout(() => {
            this.addedToCart = false
            this.sizes.map(size => {
              if (size.size === this.selectedSize.size) {
                size.quantity -= this.quantity
              }
              return size
            })
          }, 1000)
          if (!this.$store.getters.cartId) this.$store.dispatch('setCartId', response.data._id)
          this.$store.dispatch('setCartQuantity', response.data.products.length)
          this.$store.dispatch('setCartCheck', true)
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {
    ...mapGetters([
      'cartId'
    ])
  }
}
</script>

<style scoped lang="scss">
.alert-box {
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  position: absolute;
  bottom: 100%;
  background-color: rgba(255,255,255,0.9);
  z-index: 9999;
}
.alert {
  width: 100%;
  text-align: center;
  color: #000;
  font-size: 1.4em;
  font-weight: bold;
}
.section-2 {
  order: 2;
  width: 100%;
  @media screen and (min-width: 768px) {
    order: 3;
  }
  .old-price {
    text-decoration: line-through;
    color: #fff;
    padding-left: 10px;
    padding-top: 10px;
    margin-bottom: 10px;
    font-size: 0.9em;
    @media screen and (min-width: 1296px) {
      font-size: 1.4em;
    }
  }
  .item-price {
    color: #fff;
    font-size: 1.2em;
    padding-left: 10px;
    padding-top: 10px;
    margin-bottom: 10px;
    @media screen and (min-width: 1296px) {
      font-size: 2em;
    }
  }
  .size-selection {
    padding: 10px;
    color: #fff;
    @media screen and (min-width: 1296px) {
      font-size: 2em;
    }
  }
  .size-select {
    padding: 5px;
    letter-spacing: 0.1em;
    @media screen and (min-width: 1296px) {
      font-size: 0.7em;
    }
  }
  .basket-info {
    color: #fff;
  }
  .quantity {
    font-size: 1.6em;
    font-weight: bold;
  }
}
.card__actions {
  padding: 15px 10px 20px 5px;
  display: flex;
  align-items: center;
}
.card__actions .action__input {
  flex: 1;
  padding-right: 5px;
  display: flex;
  align-items: center;
}
.card__actions .action__input .minus,
.card__actions .action__input .plus,
.card__actions .action__input .quantity {
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
}
.card__actions .action__input .minus,
.card__actions .action__input .plus {
  width: 15px;
  height: 15px;
  margin: 0 10px;
  cursor: pointer;
  color: #fff;
  font-size: 1.3em;
  &.disabled {
    cursor: not-allowed;
  }
}
.disabled {
  cursor: not-allowed;
}
.card__actions .action__button {
  flex: 3;
  position: relative;
}
.card__actions .action__button button {
  width: 100%;
  min-height: 30px;
  font-size: 1.15em;
}
.slide-enter-active {
  transition: all .2s ease;
}
.slide-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-enter,
.slide-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
</style>
