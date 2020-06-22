<template>
  <div class="home-shop--container">
    <Loader v-if="loading" />
    <picture class="main-background" v-show="!loading">
      <source media="(min-width: 1250px)" srcset="@/assets/background-logo.jpg">
      <source media="(min-width: 1025px)" srcset="@/assets/resized/threequarters/background-logo.jpg">
      <source media="(min-width: 678px)" srcset="@/assets/resized/half/background-logo.jpg">
      <source srcset="@/assets/resized/quarter/background-logo.jpg">
      <img src="" alt="Pagrindine nuotrauka" id="parallax">
    </picture>
    <div class="shop" v-if="!loading">
      <slick ref="slick" class="carousel" :options="slickOptions">
        <router-link :to="`/${$t('views.home.shop')}/${$t('other.categories').women}`">
          <div class="shop__item">
            <picture class="image">
              <source media="(min-width: 768px)" srcset="@/assets/resized/half/moterims.jpg">
              <source media="(min-width: 495px)" srcset="@/assets/moterims.jpg">
              <source srcset="@/assets/resized/half/moterims.jpg">
              <img src="" alt="Nuotrauka moterims">
            </picture>
            <span class="category">
              {{ $t('other.categories').women }}
            </span>
          </div>
        </router-link>
        <router-link :to="`/${$t('views.home.shop')}/${$t('other.categories').men}`">
          <div class="shop__item">
            <picture class="image">
              <source media="(min-width: 768px)" srcset="@/assets/resized/half/vyrams.jpg">
              <source media="(min-width: 495px)" srcset="@/assets/vyrams.jpg">
              <source srcset="@/assets/resized/half/vyrams.jpg">
              <img src="" alt="Nuotrauka vyrams">
            </picture>
            <span class="category">
              {{ $t('other.categories').men }}
            </span>
          </div>
        </router-link>
        <router-link :to="`/${$t('views.home.shop')}/${$t('other.categories').girls}`">
          <div class="shop__item">
            <picture class="image">
              <source media="(min-width: 768px)" srcset="@/assets/resized/half/mergaitems.jpg">
              <source media="(min-width: 495px)" srcset="@/assets/mergaitems.jpg">
              <source srcset="@/assets/resized/half/mergaitems.jpg">
              <img src="" alt="Nuotrauka mergaitems">
            </picture>
            <span class="category">
              {{ $t('other.categories').girls }}
            </span>
          </div>
        </router-link>
        <router-link :to="`/${$t('views.home.shop')}/${$t('other.categories').boys}`">
          <div class="shop__item">
            <picture class="image">
              <source media="(min-width: 768px)" srcset="@/assets/resized/half/berniukams.jpg">
              <source media="(min-width: 495px)" srcset="@/assets/berniukams.jpg">
              <source srcset="@/assets/resized/half/berniukams.jpg">
              <img src="" alt="Nuotrauka berniukams">
            </picture>
            <span class="category">
              {{ $t('other.categories').boys }}
            </span>
          </div>
        </router-link>
        <router-link :to="`/${$t('views.home.shop')}/${$t('other.categories').accessories}`">
          <div class="shop__item">
            <picture class="image">
              <source media="(min-width: 768px)" srcset="@/assets/resized/half/aksesuarai.jpg">
              <source media="(min-width: 495px)" srcset="@/assets/aksesuarai.jpg">
              <source srcset="@/assets/resized/half/aksesuarai.jpg">
              <img src="" alt="Nuotrauka aksesuarai">
            </picture>
            <span class="category">
              {{ $t('other.categories').accessories }}
            </span>
          </div>
        </router-link>
      </slick>
    </div>
  </div>
</template>

<script>
import 'slick-carousel/slick/slick.css'
import Loader from '@/components/shared/Loader'

export default {
  components: {
    Slick: () => import('vue-slick'),
    Loader
  },
  data () {
    return {
      loading: true,
      slickOptions: {
        lazyLoad: 'ondemand',
        slidesToShow: 3,
        prevArrow: '<i class="fa fa-arrow-left slick-prev"></i>',
        nextArrow: '<i class="fa fa-arrow-right slick-next"></i>',
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1
            }
          }
        ]
      }
    }
  },
  mounted () {
    this.loading = false
    const parallax = document.getElementById('parallax')
    window.addEventListener('scroll', () => {
      let offset = window.pageYOffset
      parallax.style.transform = 'translateY(-' + offset * 0.04 + 'vw)'
    })
  },
  beforeCreate () {
    this.$ua.trackView('/')
  }
}
</script>

<style scoped lang="scss">
.home-shop--container {
  background-color: rgba(0, 0, 0, 0.9);
  position: relative;
  @media (min-width: 768px) {
    margin: 0 auto;
    width: 80%;
  }
}
.main-background {
  display: block;
  height: 60vw;
  overflow-y: hidden;
  width: 100%;
  @media screen and (min-width: 768px) {
    height: 40vw;
  }
  @media screen and (min-width: 1250px) {
    height: 35vw;
  }
  img {
    width: 100%;
  }
}
.shop {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
  @media screen and (min-width: 768px) {
    width: 100%;
  }
  &__item {
    flex-basis: 100%;
    position: relative;
    @media screen and (min-width: 768px) {
      flex-basis: 45%;
    }
    @media screen and (min-width: 1025px) {
      flex-basis: 40%;
    }
    .category {
      background-color: rgba(0,0,0,0.6);
      font-size: 2em;
      position: absolute;
      text-align: center;
      top: 50px;
      width: 100%;
    }
  }
  .carousel {
    width: 100%;
  }
}
.image {
  display: block;
  width: 100%;
  img {
    height: 350px;
    object-fit: cover;
    width: 100%;
  }
}
</style>
