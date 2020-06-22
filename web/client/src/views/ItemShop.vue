<template>
  <div class="shop-item">
    <Loader v-if="loading" />
    <ItemGallery v-if="!loading && product" :gallery="product.gallery" />
    <ItemInformation v-if="!loading && product" :item="product" />
  </div>
</template>

<script>
import ItemGallery from '@/components/itemshop/ItemGallery'
import ItemInformation from '@/components/itemshop/ItemInformation'
import Loader from '@/components/shared/Loader'
import { mapGetters } from 'vuex'
import ProductService from '@/services/ProductService'

export default {
  data () {
    return {
      product: null
    }
  },
  components: {
    ItemGallery,
    ItemInformation,
    Loader
  },
  computed: {
    ...mapGetters([
      'loading'
    ])
  },
  methods: {
    async fetchProduct (id) {
      try {
        const data = await ProductService.getProduct(id)
        this.product = data.data
        this.$store.dispatch('setLoading', false)
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted () {
    this.$store.dispatch('setLoading', true)
    this.fetchProduct(this.$route.params.id)
  }
}
</script>

<style lang="scss" scoped>
.shop-item {
  position: relative;
  width: 100%;
  @media screen and (min-width: 1025px) {
    display: flex;
    justify-content: space-between;
  }
}
</style>
