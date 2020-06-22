<template>
  <div class="add-new-product">
    <div v-if="uploaded && !loading">
      <h1 class="title">{{ $t('views.admin.addedSuccessfully') }}!</h1>
    </div>
    <Loader v-if="loading" />
    <Form
      v-if="product && !loading"
      @onSubmitForm="onSubmitForm"
      :product="product"
    />
  </div>
</template>

<script>
import ProductService from '@/services/ProductService'
import Loader from '@/components/shared/Loader'

export default {
  components: {
    Loader,
    Form: () => import('@/components/admin/product/Form')
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  data () {
    return {
      uploaded: false,
      product: null
    }
  },
  methods: {
    async onSubmitForm (product) {
      this.$store.dispatch('setLoading', true)
      try {
        await ProductService.editProduct(product._id, product)
        alert('Pakeista Sekmingai')
      } catch (error) {
        console.error(error)
      } finally {
        this.$store.dispatch('setLoading', false)
      }
    },
    async getProduct (id) {
      try {
        const { data } = await ProductService.getProduct(id)
        this.product = data
      } catch (error) {
        console.error(error)
      } finally {
        this.$store.dispatch('setLoading', false)
      }
    }
  },
  beforeCreate () {
    this.$store.dispatch('setLoading', true)
  },
  mounted () {
    this.getProduct(this.$route.params.id)
  },
  beforeRouteLeave (to, from, next) {
    if (this.$store.getters.loading) {
      alert('Palaukite kol atsinaujins')
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
