<template>
  <div class="add-new-product">
    <div v-show="uploaded && !loading">
      <h1 class="title">{{ $t('components.admin.newProduct.success') }}</h1>
    </div>
    <Loader v-show="loading" />
    <ProductForm
      @onSubmitForm="onSubmitForm"
      v-show="!loading && !uploaded"
    />
  </div>
</template>

<script>
import ProductService from '@/services/ProductService'
import Loader from '../shared/Loader'

export default {
  components: {
    Loader,
    ProductForm: () => import('./ProductForm/Form')
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  data () {
    return {
      uploaded: false
    }
  },
  methods: {
    onSubmitForm (product) {
      this.$store.dispatch('setLoading', true)
      try {
        await ProductService.addNewProduct(product)
        this.uploaded = true
      } catch (error) {
        alert('Atsitiko kazkas negero')
        console.error(error)
      } finally {
        this.$store.dispatch('setLoading', false)
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    if (this.$store.getters.loading) {
      alert('Palaukite kol įsikels')
      next(false)
    } else {
      next()
    }
  }
}
</script>

<style scoped lang="scss">
.add-new-product {
  position: relative;
}
.title {
  text-align: center;
}
</style>
