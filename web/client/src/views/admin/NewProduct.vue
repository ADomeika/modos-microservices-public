<template>
  <div class="add-new-product">
    <div v-if="uploaded && !loading">
      <h1 class="title">{{ $t('views.admin.addedSuccessfully') }}!</h1>
    </div>
    <Loader v-if="loading" />
    <Form
      @onSubmitForm="onSubmitForm"
      v-if="!loading"
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
      uploaded: false
    }
  },
  methods: {
    async onSubmitForm (product) {
      // if (!this.imageGallery) this.invalidForm = true
      this.$store.dispatch('setLoading', true)
      try {
        await ProductService.addNewProduct(product)
      } catch (error) {
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
