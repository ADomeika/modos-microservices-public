<template>
  <div class="item-gallery">
    <transition name="fade">
      <div class="full-screen-carousel-holder" v-if="isGalleryFullScreen" @click.self="isGalleryFullScreen = false">
        <i class="fas fa-times fa-3x close-full-screen" @click="isGalleryFullScreen = false"></i>
        <Slick ref="test" :options="slickOptions" class="carousel" @init="handleInit">
          <div class="image-holder" v-for="(item, i) in gallery" :key="i">
            <img :src="'https://aputplqnen.cloudimg.io/width/800/x/' + item" alt="Nuotrauka" />
          </div>
        </Slick>
      </div>
    </transition>
    <Slick ref="slick" :options="slickOptions" class="carousel">
      <div class="image-holder" v-for="(item, i) in gallery" :key="i">
        <img :src="'https://aputplqnen.cloudimg.io/width/450/x/' + item" alt="Nuotrauka" @click="openFullScreen(i)" />
      </div>
    </Slick>
    <div class="gallery">
      <div class="image" v-for="(item, i) in gallery" :key="i" @click="changeSlide(i)">
        <v-lazy-image
          src=""
          alt="Nuotrauka"
          use-picture>
          <source :srcset="'https://aputplqnen.cloudimg.io/crop/385x385/x/' + item">
          <source media="(max-width: 400px)" :srcset="'https://aputplqnen.cloudimg.io/crop/100x100/x/' + item">
          <source media="(max-width: 550px)" :srcset="'https://aputplqnen.cloudimg.io/crop/150x150/x/' + item">
          <source media="(max-width: 767px)" :srcset="'https://aputplqnen.cloudimg.io/crop/220x220/x/' + item">
          <source media="(max-width: 1024px)" :srcset="'https://aputplqnen.cloudimg.io/crop/145x145/x/' + item">
          <source media="(max-width: 1264px)" :srcset="'https://aputplqnen.cloudimg.io/crop/100x100/x/' + item">
          <source media="(min-width: 1265px)" :srcset="'https://aputplqnen.cloudimg.io/crop/180x180/x/' + item">
        </v-lazy-image>
      </div>
    </div>
  </div>
</template>

<script>
import Slick from 'vue-slick'

export default {
  props: ['gallery'],
  components: {
    Slick
  },
  methods: {
    changeSlide (id) {
      this.$refs.slick.goTo(id)
    },
    openFullScreen (id) {
      this.isGalleryFullScreen = true
    },
    handleInit (event, slick) {
      slick.currentSlide = this.$refs.slick.currentSlide()
    }
  },
  data () {
    return {
      slickOptions: {
        lazyLoad: 'ondemand',
        infinite: true,
        slidesToShow: 1,
        prevArrow: '<i class="fa fa-arrow-left slick-prev"></i>',
        nextArrow: '<i class="fa fa-arrow-right slick-next"></i>'
      },
      isGalleryFullScreen: false
    }
  }
}
</script>

<style scoped lang="scss">
.image-holder {
  text-align: center;
}
.item-gallery {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  @media screen and (min-width: 1025px) {
    width: 50%;
  }
}
.carousel {
  margin: 10px 10px 0;
  @media screen and (min-width: 768px) {
    width: 60%;
    margin: 0 auto;
  }
  @media screen and (min-width: 1025px) {
    width: 90%;
    margin: 0 auto;
  }
  div img {
    margin: 0 auto;
    width: 100%;
    height: 100%;
    max-height: 550px;
    max-width: 300px;
    transition: opacity .2s linear;
    object-fit: contain;
    cursor: zoom-in;
    @media screen and (min-width: 410px) {
      max-width: 350px;
    }
    @media screen and (min-width: 768px) {
      max-width: 400px
    }
    @media screen and (min-width: 1350px) {
      max-width: 450px;
    }
  }
}
.gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 20px 20px;
  @media screen and (min-width: 768px) {
    width: 60%;
    margin: 0 auto 40px;
  }
  @media screen and (min-width: 1025px) {
    width: 70%;
    margin: 0 auto;
  }
  .image {
    width: 33%;
    padding: 5px;
    picture {
      display: block;
      width: 100%;
      height: 100%;
      /deep/ .v-lazy-image-loaded {
        min-height: 150px;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
.full-screen-carousel-holder {
  background-color: rgba(0,0,0,.7);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99999;
  overflow: auto;
  div.carousel div img {
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 99vh;
    cursor: unset;
  }
  .close-full-screen {
    position: absolute;
    right: 0;
    top: 0;
    width: 50px;
    height: 50px;
    color: #fff;
    cursor: pointer;
    z-index: 6;
  }
}
/*
  Animations
*/
.fade-enter,
.fade-leave {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity .5s;
}
</style>
