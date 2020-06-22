import Vue from 'vue'
import Vuelidate from 'vuelidate'
import { VLazyImagePlugin } from 'v-lazy-image'
import { mapState } from 'vuex'
import VueAnalytics from 'vue-ua'
import CartService from '@/services/CartService'
import axios from 'axios'

import App from './App.vue'
import router from './router/'
import store from './store/'
import { i18n } from './plugins/i18n'

import './filters'
import './directives'

import setAuthToken from './utils/setAuthToken'

axios.defaults.baseURL = 'http://209.97.177.0'
Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(VLazyImagePlugin)
Vue.use(VueAnalytics, {
  // [Required] The name of your app as specified in Google Analytics.
  appName: 'MoDo\'s Design',
  // [Required] The version of your app.
  appVersion: '1.0',
  // [Required] Your Google Analytics tracking ID.
  trackingId: 'UA-151129092-1',
  // If you're using vue-router, pass the router instance here.
  vueRouter: router
})

const cartExistence = async (clear) => {
  let intervalId
  if (!clear) {
    try {
      await CartService.checkExistence(store.getters.cartId)
      const cartCheckInterval = setInterval(async () => {
        try {
          await CartService.checkExistence(store.getters.cartId)
        } catch (error) {
          if (error.response.status === 404) {
            clearInterval(cartCheckInterval)
            store.dispatch('setCartId', null)
            store.dispatch('setCartQuantity', 0)
            store.dispatch('setCartCheck', false)
            store.dispatch('setCartWarning', true)
            store.dispatch('setCartWarningTime', 0)
          }
        }
      }, 120000)
      intervalId = cartCheckInterval
    } catch (error) {
      if (error.response.status === 404) {
        store.dispatch('setCartId', null)
        store.dispatch('setCartQuantity', 0)
        store.dispatch('setCartCheck', false)
        store.dispatch('setCartWarning', true)
        store.dispatch('setCartWarningTime', 0)
      }
    }
  }
  if (clear) {
    clearInterval(intervalId)
  }
}

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  created () {
    const token = localStorage.getItem('token')
    setAuthToken(token)
    if (store.getters.cartId) store.dispatch('setCartCheck', true)
    if (this.cartCheck) {
      cartExistence(false)
    }
  },
  computed: {
    ...mapState(['cartCheck'])
  },
  watch: {
    cartCheck (newValue) {
      if (newValue) {
        cartExistence(false)
      } else {
        cartExistence(true)
      }
    }
  }
}).$mount('#app')
