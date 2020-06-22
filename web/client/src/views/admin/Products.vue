<template>
  <div class="edit-product">
    <Loader v-if="loading" />
    <div v-else class="items">
      <router-link
        class="card"
        v-for="(item, i) in items"
        :key="i"
        :to="`/admin/keisti-produkta/${item._id}`"
      >
        <div class="card__image">
            <v-lazy-image
              class="image"
              src=""
              alt="Fallback"
              use-picture
            >
              <source
                media="(max-width: 414px)"
                :srcset="'https://aputplqnen.cloudimg.io/crop/370x370/x/' + item.gallery[0]"
              />
              <source
                media="(max-width: 767px)"
                :srcset="'https://aputplqnen.cloudimg.io/crop/350x350/x/' + item.gallery[0]"
              />
              <source
                media="(min-width: 768px)"
                :srcset="'https://aputplqnen.cloudimg.io/crop/360x360/x/' + item.gallery[0]"
              />
            </v-lazy-image>
        </div>
        <div class="description">
          <router-link class="card__title" :to="`/admin/keisti-produkta/${item._id}`">
            <h2>{{ item.name }}</h2>
          </router-link>
          <div v-if="item.onSale" class="card__original-price">
            {{ item.originalPrice | currency }}
          </div>
          <div class="card__price">
            {{ item.price | currency }}
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import Loader from '@/components/shared/Loader'
import ProductService from '@/services/ProductService'

export default {
  components: {
    Loader
  },
  data () {
    return {
      items: []
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  beforeCreate () {
    this.$store.dispatch('setLoading', true)
  },
  async mounted () {
    try {
      const { data } = await ProductService.getAllProducts()
      this.items = data
    } catch (error) {
      console.error(error)
    } finally {
      this.$store.dispatch('setLoading', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.edit-product {
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  position: relative;
}
.items {
  display: flex;
  flex-wrap: wrap;
  .card {
    display: block;
    margin: 5px;
    border: 1px solid rgba(255,255,255,0.3);
    border-radius: 5px;
    width: 100%;
    @media screen and (min-width: 476px) {
      width: 47%;
    }
    @media screen and (min-width: 768px) {
      width: 31%;
    }
    &__image {
      display: block;
    }
    .description {
      padding: 15px;
    }
    &__title,
    &__price {
      text-align: center;
    }
  }
}
/deep/ .v-lazy-image-loaded {
  width: 100%;
}
</style>
