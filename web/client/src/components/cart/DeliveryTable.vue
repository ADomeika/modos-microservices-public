<template>
  <table class="delivery-table">
    <tr>
      <td>{{ $t('components.basket.totalPriceForProducts') }}:</td>
      <td>{{ total | currency }}</td>
    </tr>
    <tr>
      <td class="vertical-top">{{ $t('components.basket.delivery') }}:</td>
      <td>
        <div class="container">
          <ul>
            <li>
              <input type="radio" id="ltPastu" value="ltPastu" v-model="delivery">
              <label for="ltPastu">{{ $t('components.basket.post') }} ({{ 2 | currency }})</label>
              <div class="check"></div>
            </li>
            <li>
              <input type="radio" id="pastomatu" value="pastomatu" v-model="delivery">
              <label for="pastomatu">{{ $t('components.basket.locker') }} ({{ 2.5 | currency }})</label>
              <div class="check"><div class="inside"></div></div>
            </li>
            <li>
              <input type="radio" id="esValstybese" value="esValstybese" v-model="delivery">
              <label for="esValstybese">{{ $t('components.basket.euCountries') }} ({{ 6 | currency }})</label>
              <div class="check"><div class="inside"></div></div>
            </li>
            <li>
              <input type="radio" id="ktValstybese" value="ktValstybese" v-model="delivery">
              <label for="ktValstybese">{{ $t('components.basket.otherCountries') }} ({{ 10 | currency }})</label>
              <div class="check"><div class="inside"></div></div>
            </li>
          </ul>
        </div>
      </td>
    </tr>
    <tr>
      <td>{{ $t('components.basket.total') }}:</td>
      <td>{{ total + deliveryPrice | currency }}</td>
    </tr>
  </table>
</template>

<script>
import { deliveryPriceMixin } from '@/mixins/deliveryPriceMixin'

export default {
  mixins: [deliveryPriceMixin],
  props: ['total'],
  computed: {
    delivery: {
      get: function () {
        return this.$store.getters.delivery
      },
      set: function (value) {
        this.$store.dispatch('setDelivery', value)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.delivery-table {
  padding: 20px 0;
  border-collapse:collapse;
  @media screen and (min-width: 768px) {
    font-size: 1.2em;
    letter-spacing: 0.02em;
  }
  tr:not(:last-child) {
    border-bottom: 1px solid #fff;
  }
  tr:nth-child(odd) td {
    padding: 20px 0;
  }
  tr td:last-child {
    padding-left: 10px;
  }
}
.vertical-top {
  vertical-align: top;
  padding-top: 20px;
}
.container {
  display: block;
  position: relative;
  height: auto;
  width: 100%;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      color: #aaa;
      display: block;
      position: relative;
      width: 100%;
      input[type=radio] {
        position: absolute;
        visibility: hidden;
      }
      label {
        display: block;
        position: relative;
        font-weight: 300;
        font-size: 1.2em;
        padding-left: 40px;
        margin: 10px auto;
        cursor: pointer;
        z-index: 66;
        transition: all 0.25s linear;
      }
      &:hover label {
        color: #fff;
      }
      &:hover .check {
        border: 3px solid #fff;
      }
      .check{
        display: block;
        position: absolute;
        border: 3px solid #aaa;
        border-radius: 100%;
        height: 20px;
        width: 20px;
        top: 2px;
        left: 10px;
        transition: border .25s linear;
      }
    }
  }
}
ul li .check::before {
  display: block;
  position: absolute;
  content: '';
  border-radius: 100%;
  height: 10px;
  width: 10px;
  top: 2px;
  left: 2px;
  margin: auto;
  transition: background-color 0.25s linear;
}

input[type=radio]:checked ~ .check {
  border: 3px solid #fff;
}

input[type=radio]:checked ~ .check::before{
  background-color: #fff;
}

input[type=radio]:checked ~ label{
  color: #fff;
}
</style>
