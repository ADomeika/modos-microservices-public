import Vue from 'vue'

export const currency = function (value) {
  return parseFloat(Math.round(value * 100) / 100).toFixed(2) + ' €'
}

export default Vue.filter('currency', currency)
