<template>
  <div class="sortation">
    <div class="sortation__methods">
      <div class="sortation__method selection subcategory" @click="subCategorySelection = !subCategorySelection">
        <div class="selection__box">
          {{ selectedSubCategory }}
          <i class="fas fa-arrow-down selection__box--arrow"></i>
        </div>
        <div class="selection__items" v-if="subCategorySelection">
          <ul>
            <li
              class="selection__item"
              @click="changeSubCategorySelection($t('components.shop.sortation.allProducts'))">{{ $t('components.shop.sortation.allProducts') }}</li>
            <li
              class="selection__item"
              v-for="subCategory in subCategories"
              :key="subCategory"
              @click="changeSubCategorySelection(subCategory)">{{ subCategory }}</li>
          </ul>
        </div>
      </div>

      <div class="sortation__method selection size" @click="sizeSelection = !sizeSelection">
        <div class="selection__box">
          {{ selectedSize }}
          <i class="fas fa-arrow-down selection__box--arrow"></i>
        </div>
        <div class="selection__items" v-if="sizeSelection">
          <ul>
            <li
              class="selection__item"
              @click="changeSizeSelection($t('components.shop.sortation.allSizes'))">{{ $t('components.shop.sortation.allSizes') }}</li>
            <li
              class="selection__item"
              v-for="size in sizes"
              :key="size"
              @click="changeSizeSelection(size)">{{ size }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['products'],
  data () {
    return {
      subCategorySelection: false,
      sizeSelection: false
    }
  },
  methods: {
    changeSubCategorySelection (item) {
      if (item === this.$t('components.shop.sortation.allProducts')) {
        let query = Object.assign({}, this.$route.query)
        delete query.subkategorija
        this.$router.replace({ query })
        return
      }
      if (this.$route.query.dydis) {
        this.$router.push({ query: { subkategorija: item.toLowerCase(), dydis: this.$route.query.dydis } })
      } else {
        this.$router.push({ query: { subkategorija: item.toLowerCase() } })
      }
    },
    changeSizeSelection (item) {
      if (item === this.$t('components.shop.sortation.allSizes')) {
        const query = Object.assign({}, this.$route.query)
        delete query.dydis
        this.$router.replace({ query })
        return
      }
      if (this.$route.query.subkategorija) {
        this.$router.push({ query: { subkategorija: this.$route.query.subkategorija, dydis: item } })
      } else {
        this.$router.push({ query: { dydis: item } })
      }
    },
    capitalize (category) {
      return category.charAt(0).toUpperCase() + category.slice(1)
    }
  },
  computed: {
    sizes () {
      switch (this.$route.params.category) {
        case 'vyrams':
        case 'men':
        case 'moterims':
        case 'women':
          return [ 'XS', 'S', 'M', 'L', 'XL', 'XXL' ]
        case 'berniukams':
        case 'boys':
        case 'mergaitems':
        case 'girls':
          return [
            '86', '86-92', '92', '98', '98-104', '104',
            '110', '110-116', '116', '122', '122-128',
            '128', '134', '134-140', '140'
          ]
        default:
          return [ this.$t('other.oneSize') ]
      }
    },
    subCategories () {
      switch (this.$route.params.category) {
        case 'vyrams':
        case 'men':
          return this.$t('other.subCategories').men
        case 'moterims':
        case 'women':
          return this.$t('other.subCategories').women
        case 'berniukams':
        case 'boys':
          return this.$t('other.subCategories').boys
        case 'mergaitems':
        case 'girls':
          return this.$t('other.subCategories').girls
        default:
          return this.$t('other.subCategories').accessories
      }
    },
    selectedSubCategory () {
      const subCategory = this.$route.query.subkategorija || this.$t('components.shop.sortation.allProducts')
      return this.capitalize(subCategory)
    },
    selectedSize () {
      return this.$route.query.dydis || this.$t('components.shop.sortation.allSizes')
    }
  }
}
</script>

<style scoped lang="scss">
.sortation {
  width: 100%;
  padding: 10px;
  &__methods {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  &__method {
    height: 50px;
    @media screen and (min-width: 768px) {
      margin-right: 1%;
    }
    &:not(:last-child) {
      margin-bottom: 5px;
      @media screen and (min-width: 768px) {
        margin-bottom: 0;
      }
    }
  }
  .subcategory,
  .size {
    width: 100%;
    @media screen and (min-width: 415px) {
      width: 48%;
    }
  }
  .selection {
    position: relative;
    padding: 2px;
    height: 100%;
    background: white;
    padding: 15px 10px;
    cursor: pointer;
    &__items {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      background-color: #fff;
      z-index: 2;
      ul {
        list-style: none;
        max-height: 288px;
        overflow-y: auto;
      }
    }
    &__item {
      padding: 15px 10px;
      &:hover,
      &:focus {
        background-color: #ccc;
      }
    }
    &__box {
      position: relative;
      &--arrow {
        position: absolute;
        top: 50%;
        right: 5px;
        transform: translateY(-50%);
      }
    }
  }
  &__action {
    float: right;
    width: 20%;
    .filter-button {
      font-size: 0.8em;
      font-weight: bold;
      width: 100%;
      height: 100%;
      border: 2px solid #444;
      background-color: #fff;
      &:active,
      &:focus {
        outline: 3px solid #333;
      }
    }
  }
}
</style>
