<template>
  <div>
    <div v-if="!$route.params.id">
      <h1 class="large-text" >{{ category }}</h1>
      <Sortation v-if="!loading" :products="products" />
      <div class="shop">
        <Loader v-if="loading" />
        <Card
          v-for="item in filteredProducts"
          :key="item.id"
          :item="item"
          v-else
        />
        <Loader v-if="loadingNext && !loading" />
        <h1
          v-if="filteredProducts.length < 1 && !loading"
          class="text-white"
        >{{ $t('components.nothingYet') }}...</h1>
      </div>
    </div>
    <router-view v-else></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import _ from 'lodash'
import Card from './shop/Card'
import Sortation from './shop/Sortation'
import Loader from './shared/Loader'
import ProductService from '@/services/ProductService'

export default {
  components: {
    Card,
    Loader,
    Sortation
  },
  data () {
    return {
      category: this.$route.params.category,
      chosenCategory: '',
      products: [],
      bottom: false,
      counter: 0,
      windowWidth: window.innerWidth,
      loadingNext: false,
      allFetched: false
    }
  },
  computed: {
    ...mapGetters([
      'loading'
    ]),
    selectedSubCategory () {
      return this.$route.query.subkategorija
    },
    selectedSize () {
      return this.$route.query.dydis
    },
    filteredProducts () {
      if (!this.selectedSubCategory && !this.selectedSize) {
        return this.products
      } else if (!this.selectedSubCategory && this.selectedSize) {
        return this.products.filter(product => {
          return product.sizes.find(size => {
            return size.size === this.selectedSize
          })
        })
      } else if (this.selectedSubCategory && !this.selectedSize) {
        return this.products.filter(product => {
          return this.selectedSubCategory === product.subCategory.toLowerCase()
        })
      } else {
        return this.products.filter(product => {
          return this.selectedSubCategory === product.subCategory.toLowerCase() &&
            product.sizes.find(size => {
              return size.size === this.selectedSize
            })
        })
      }
    },
    perPage () {
      if (this.windowWidth < 416) return 2
      else if (this.windowWidth < 768) return 4
      else if (this.windowWidth < 1485) return 6
      else return 8
    }
  },
  methods: {
    capitalize (category) {
      return category.charAt(0).toUpperCase() + category.slice(1)
    },
    async fetchProducts (category, subCategory, size, page, perpage) {
      if (page > 0) this.loadingNext = true
      try {
        const data = await ProductService.getProducts(category, subCategory, size, page, perpage)
        if (data.data.length < this.perPage) {
          this.allFetched = true
        }
        this.products.push(...data.data)
        this.loadingNext = false
      } catch (error) {
        console.error(error)
      } finally {
        this.$store.dispatch('setLoading', false)
      }
    },
    bottomVisible () {
      const scrollY = window.scrollY
      const visible = document.documentElement.clientHeight
      const pageHeight = document.documentElement.scrollHeight - 290
      const bottomOfPage = visible + scrollY >= pageHeight
      return bottomOfPage || pageHeight < visible
    }
  },
  beforeMount () {
    this.$store.dispatch('setLoading', true)
  },
  created () {
    if (!this.$route.params.id) {
      this.fetchProducts(this.capitalize(this.category), this.selectedSubCategory, this.selectedSize, 0, this.perPage)
    }
    window.addEventListener('scroll', _.throttle(() => {
      this.bottom = this.bottomVisible()
    }, 200))
  },
  watch: {
    '$route' (to, from) {
      this.$store.dispatch('setLoading', true)
      this.category = to.params.category
      this.counter = 0
      this.products = []
      this.allFetched = false
      if (!this.$route.params.id) {
        this.fetchProducts(this.capitalize(this.category), this.selectedSubCategory, this.selectedSize, 0, this.perPage)
      }
    },
    bottom (bottom) {
      if (!this.allFetched && !this.$route.params.id) {
        if (bottom) {
          this.counter++
          this.fetchProducts(this.capitalize(this.category), this.selectedSubCategory, this.selectedSize, this.counter, this.perPage)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.text-white {
  padding-top: 15px;
  color: #fff;
}
.shop {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  justify-content: space-evenly;
  padding: 20px 0;
  @media screen and (min-width: 768px) {
    justify-content: flex-start;
  }
}
.large-text {
  font-size: 2em;
  color: #fff;
  text-transform: capitalize;
  text-align: center;
  padding: 20px 0;
}
</style>
