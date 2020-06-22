<template>
  <div class="wrapper">
    <div v-if="!$route.params.category">
      <div class="home-shop">
        <div class="shop">
          <div
            class="shop__item"
            v-for="(shopItem, i) in shopItems"
            :key="i">
            <router-link :to="shopItem.link">
              <picture class="image">
                <source media="(min-width: 768px)" :srcset="getImgUrl() + '/resized/half/' + shopItem.image">
                <source media="(min-width: 495px)" :srcset="getImgUrl() + '/' + shopItem.image">
                <source :srcset="getImgUrl() + '/resized/half/' + shopItem.image">
                <img src="" :alt="'Nuotrauka' + shopItem.category">
              </picture>
              <span class="category">{{ shopItem.category }}</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      shopItems: [
        {
          link: `${this.$route.path}/${this.$t('other.categories').women.toLowerCase()}`,
          image: 'moterims.jpg',
          category: this.$t('other.categories').women
        },
        {
          link: `${this.$route.path}/${this.$t('other.categories').men.toLowerCase()}`,
          image: 'vyrams.jpg',
          category: this.$t('other.categories').men
        },
        {
          link: `${this.$route.path}/${this.$t('other.categories').girls.toLowerCase()}`,
          image: 'mergaitems.jpg',
          category: this.$t('other.categories').girls
        },
        {
          link: `${this.$route.path}/${this.$t('other.categories').boys.toLowerCase()}`,
          image: 'berniukams.jpg',
          category: this.$t('other.categories').boys
        },
        {
          link: `${this.$route.path}/${this.$t('other.categories').accessories.toLowerCase()}`,
          image: 'aksesuarai.jpg',
          category: this.$t('other.categories').accessories
        }
      ]
    }
  },
  methods: {
    getImgUrl () {
      return '../assets'
    }
  },
  beforeCreate () {
    this.$ua.trackView(this.$route.path)
  }
}
</script>

<style lang="scss" scoped>
.shop {
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  &__item {
    margin: 15px;
    flex-basis: 100%;
    position: relative;
    transition: transform .2s linear;
    @media screen and (min-width: 560px) {
      flex-basis: 40%;
    }
    &:hover {
      transform: translateY(-10px);
    }
    .category {
      position: absolute;
      left: 0;
      top: 50px;
      background-color: rgba(0,0,0,0.6);
      width: 100%;
      text-align: center;
      font-size: 2em;
    }
    img {
      width: 100%;
      height: 300px;
      object-fit: cover;
    }
  }
}
</style>
