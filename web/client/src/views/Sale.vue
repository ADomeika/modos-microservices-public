<template>
  <div class="wrapper">
    <h1>{{ $t('components.sale') }}!</h1>
    <div class="sale">
      <Loader v-if="loading" />
      <Card
        v-for="saleItem in saleItems"
        :key="saleItem.id"
        :item="saleItem"
        v-else
      />
      <h1 v-if="saleItems.length < 1 && !loading" class="text-white">{{ $t('components.nothingYet') }}...</h1>
    </div>
  </div>
</template>

<script>
import Card from '@/components/shop/Card'
import Loader from '@/components/shared/Loader'
import ProductService from '@/services/ProductService'

export default {
  data () {
    return {
      saleItems: []
    }
  },
  components: {
    Loader,
    Card
  },
  beforeMount () {
    this.$store.dispatch('setLoading', true)
    this.fetchSaleItems()
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    async fetchSaleItems () {
      try {
        const data = await ProductService.getSaleItems()
        console.log(data)
        this.saleItems = data.data
      } catch (error) {
        console.log(error)
      } finally {
        this.$store.dispatch('setLoading', false)
      }
    }
  },
  beforeCreate () {
    this.$ua.trackView('/sale')
  }
}
</script>

<style lang="scss" scoped>
h1 {
  color: #fff;
  text-align: center;
}
.sale {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  justify-content: space-evenly;
  padding: 20px 0;
  padding: 5px;
  @media (min-width: 768px) {
    justify-content: flex-start;
  }
}
</style>
