<template>
  <div class="order">
    <Loader v-if="loading" />
    <form
      class="form"
      v-if="!loading"
    >
      <h2 class="form-title">{{ $t('views.order.order') }}</h2>
      <div class="three-in-row">
        <p :type="$t('views.order.firstName') + ':'" class="column">
          <input
            type="text"
            :placeholder="$t('views.order.firstName')"
            v-model.trim="firstName"
            @blur="$v.firstName.$touch()"
            :class="{ 'required-field': $v.firstName.$dirty && (!$v.firstName.required || !$v.firstName.alpha) }"
          />
        </p>
        <p :type="$t('views.order.lastName') + ':'" class="column">
          <input
            type="text"
            :placeholder="$t('views.order.lastName')"
            v-model.trim="lastName"
            @blur="$v.lastName.$touch()"
            :class="{ 'required-field': $v.lastName.$dirty && (!$v.lastName.required || !$v.lastName.alpha) }"
          />
        </p>
        <p :type="$t('views.order.email') + ':'" class="column">
          <input
            type="email"
            :placeholder="$t('views.order.email')"
            v-model.trim="email"
            @blur="$v.email.$touch()"
            :class="{ 'required-field': $v.email.$dirty && (!$v.email.required || !$v.email.email) }"
          />
        </p>
      </div>
      <div class="three-in-row">
        <p :type="$t('views.order.telephone') + ':'" class="column">
          <input
            type="text"
            :placeholder="$t('views.order.telephone')"
            v-model.trim="telephone"
            @blur="$v.telephone.$touch()"
            :class="{ 'required-field': $v.telephone.$dirty && !$v.telephone.required }"
          />
        </p>
        <p :type="$t('views.order.city') + ':'" v-if="$store.getters.delivery !== 'pastomatu'" class="column">
          <input
            type="text"
            :placeholder="$t('views.order.city')"
            v-model.trim="city"
            @blur="$v.city.$touch()"
            :class="{ 'required-field': $v.city.$dirty && !$v.city.required }"
          />
        </p>
        <p :type="$t('views.order.postcode') + ':'" v-if="$store.getters.delivery !== 'pastomatu'" class="column">
          <input
            type="text"
            :placeholder="$t('views.order.postcode')"
            v-model.trim="postcode"
            @blur="$v.postcode.$touch()"
            :class="{ 'required-field': $v.postcode.$dirty && !$v.postcode.required }"
          />
        </p>
        <p :type="$t('views.order.locker') + ':'" v-if="$store.getters.delivery === 'pastomatu'" class="column pastomatas">
          <input
            type="text"
            :placeholder="$t('views.order.locker')"
            v-model.trim="pastomatas"
            @blur="$v.pastomatas.$touch()"
            :class="{ 'required-field': $v.pastomatas.$dirty && !$v.pastomatas.required }"
          />
        </p>
      </div>
      <div class="three-in-row">
        <div
          class="country column"
          v-if="$store.getters.delivery === 'esValstybese' || $store.getters.delivery === 'ktValstybese'">
          <label for="country">{{ $t('views.order.country') }}:</label><br>
          <input
            type="text"
            id="country"
            :placeholder="$t('views.order.country')"
            class="dropdown-input"
            v-model.trim="country"
            @blur="$v.country.$touch()"
            :class="{ 'required-field': $v.country.$dirty && !$v.country.required }"
          />
          <div class="div" v-if="country.length > 1">
            <ul class="country-list">
              <li
                v-for="(filteredCountry, i) in filteredCountries"
                :key="i"
                @click="setCountry(filteredCountry.name)"
              >{{ filteredCountry.name }}</li>
            </ul>
          </div>
        </div>
        <p :type="$t('views.order.address') + ':'" v-if="$store.getters.delivery !== 'pastomatu'" class="column">
          <input
            type="text"
            :placeholder="$t('views.order.address')"
            v-model.trim="addressLine1"
            @blur="$v.addressLine1.$touch()"
            :class="{ 'required-field': $v.addressLine1.$dirty && !$v.addressLine1.required }"
          />
        </p>
        <p
          :type="$t('views.order.addressLine2') + ':'"
          class="column"
          v-if="$store.getters.delivery === 'esValstybese' || $store.getters.delivery === 'ktValstybese'">
          <input
            type="text"
            :placeholder="$t('views.order.addressLine2')"
            v-model.trim="addressLine2"
            @blur="$v.addressLine2.$touch()"
            :class="{ 'required-field': $v.addressLine2.$dirty && !$v.addressLine2.required }"
          />
        </p>
      </div>
      <h2 class="total">{{ $t('views.order.billTotal') }}: {{ total + deliveryPrice | currency }}</h2>
    </form>
    <button class="btn" @click="onSubmit" v-if="showButtons">{{ $t('views.order.pay') }}</button>
    <Paypal v-if="showButtons" />
  </div>
</template>

<script>
import { required, email, requiredIf, helpers } from 'vuelidate/lib/validators'
import CartService from '@/services/CartService'
import PaymentService from '@/services/PaymentService'
import { deliveryPriceMixin, convertStringMixin, totalPriceMixin } from '@/mixins'
import Loader from '@/components/shared/Loader'
import Paypal from '@/components/payment/Paypal'
const alpha = helpers.regex('alpha', /^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ]*$/)

export default {
  components: { Loader, Paypal },
  mixins: [deliveryPriceMixin, convertStringMixin, totalPriceMixin],
  data () {
    return {
      countryList: this.$t('countries'),
      country: '',
      firstName: '',
      lastName: '',
      email: '',
      telephone: '',
      pastomatas: '',
      city: '',
      addressLine1: '',
      addressLine2: '',
      postcode: '',
      cart: [],
      orderNumber: null,
      totalPrice: 0
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    delivery () {
      return this.$store.getters.delivery
    },
    filteredCountries () {
      return this.countryList.filter(item => {
        return this.convertString(item.name).indexOf(this.convertString(this.country)) > -1
      })
    },
    showButtons () {
      return !this.$v.$invalid
    }
  },
  methods: {
    setCountry (country) {
      this.country = country
    },
    async onSubmit () {
      if (this.$v.$invalid) return
      this.$store.dispatch('setLoading', true)
      const details = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        telephone: this.telephone
      }
      switch (this.delivery) {
        case 'ltPastu':
          details.city = this.city
          details.postcode = this.postcode
          details.address = this.addressLine1
          break
        case 'pastomatu':
          details.pastomatas = this.pastomatas
          break
        case 'esValstybese':
        case 'ktValstybese':
          details.city = this.city
          details.postcode = this.postcode
          details.country = this.country
          details.address = this.addressLine1 + '\n' + this.addressLine2
          break
        default:
          console.log('Kazkas negerai?')
          break
      }
      details.deliveryType = this.delivery

      try {
        const { data: { id: sessionId } } = await PaymentService
          .makePayment({ cartId: this.$store.getters.cartId, details })

        const stripe = window.Stripe('pk_test_yMfg6fTY4um9Tb9JkIQnXBKX00jkvnFnv3')
        await stripe.redirectToCheckout({ sessionId })
      } catch (error) {
        console.error('Error')
      }
    }
  },
  validations: {
    firstName: { required, alpha },
    lastName: { required, alpha },
    email: { required, email },
    telephone: { required },
    country: {
      required: requiredIf(({ delivery }) => {
        return delivery !== 'pastomatu' && delivery !== 'ltPastu'
      })
    },
    pastomatas: {
      required: requiredIf(({ delivery }) => delivery === 'pastomatu')
    },
    city: {
      required: requiredIf(({ delivery }) => delivery !== 'pastomatu')
    },
    addressLine1: {
      required: requiredIf(({ delivery }) => delivery !== 'pastomatu')
    },
    addressLine2: {
      required: requiredIf(({ delivery }) => {
        return delivery !== 'ltPastu' && delivery !== 'pastomatu'
      })
    },
    postcode: {
      required: requiredIf(({ delivery }) => delivery !== 'pastomatu')
    }
  },
  async created () {
    if (this.$store.getters.cartId) {
      this.$store.dispatch('setLoading', true)
      try {
        const { data } = await CartService.getCartItems(this.$store.getters.cartId)
        this.cart = data.products
        this.$store.dispatch('setCartQuantity', this.cart.length)
      } catch (error) {
        console.error('error')
      } finally {
        this.$store.dispatch('setLoading', false)
      }
    }
  },
  beforeCreate () {
    this.$ua.trackView('/order')
  }
}
</script>

<style scoped lang="scss">
.required-field {
  border: 2px solid #f00;
  position: relative;
}
.total {
  margin-top: 28px;
}
.country {
  position: relative;
  padding-top: 28px;
}
.div {
  opacity: 0;
  overflow: auto;
  width: 100%;
  position: absolute;
  top: 100%;
  max-height: 165px;
  transition: opacity .2s linear;
}
.dropdown-input:focus + .div,
.dropdown-input:active + .div {
  opacity: 1;
}
.country-list {
  background-color: #eee;
  color: #000;
  height: 100%;
  list-style: none;
  li {
    padding: 5px;
    cursor: pointer;
    &:hover {
      background-color: #ccc;
    }
  }
}
.order {
  padding: 20px 10px;
  width: 100%;
  font-size: 20px;
  color: #fff;
  @media screen and (min-width: 768px) {
    width: 80%;
    margin: 0 auto;
  }
}
.form {
  padding: 20px 0;
  max-width: 100%;
  box-sizing: border-box;
}
.form-title {
  margin: 10px 0;
  padding-bottom: 10px;
  width: 180px;
  color: #fff;
  border-bottom: 3px solid #fff;
}
input {
  color: #fff;
  font-size: 0.9em;
  width: 100%;
  max-width: 300px;
  padding: 10px;
  box-sizing: border-box;
  background: none;
  outline: none;
  resize: none;
  border: 0;
  transition: all 0.3s;
  border-bottom: 2px solid #fff;
}
input:focus {
  border-bottom: 2px solid #999;
}
p:before {
  content: attr(type);
  display: block;
  margin: 28px 0 0;
  font-size: 1em;
  color: #fff;
}
.btn {
  padding: 8px 12px;
  max-width: 300px;
  width: 100%;
  margin: 28px 0;
  font-family: "Montserrat", sans-serif;
  border: 2px solid #fff;
  border-radius: 5px;
  background: 0;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s;
}
.btn:hover {
  background: #fff;
  color: #000;
}
.three-in-row {
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
  .column,
  .pastomatas {
    width: 100%;
  }
}
@media screen and (min-width: 768px) {
  .three-in-row {
    .column {
      width: 45%;
    }
  }
}
@media screen and (min-width: 1300px) {
  .three-in-row {
    .column {
      width: 30%;
    }
    .pastomatas {
      width: 65%;
    }
  }
}
</style>
