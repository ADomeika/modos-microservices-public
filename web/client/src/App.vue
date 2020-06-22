<template>
  <div class="main-container">
    <app-header />
    <transition name="slide">
      <div
        class="alert-area"
        v-if="cartWarning">
        <div class="alert-box">
          <div class="alert-content">
            {{
              cartWarningTime && cartWarningTime > 0 ?
              'Iki kol krepšelis išnyks, liko mažiau nei ' + cartWarningTime + (cartWarningTime == 5 ? ' minutės' : ' minučių') :
              $t('main.cartHasBeenRemoved')
            }}
          </div>
          <a class="alert-close" href="#" @click="$store.dispatch('setCartWarning', false)">
            <i class="far fa-times-circle"></i>
          </a>
        </div>
      </div>
    </transition>
    <main>
      <router-view />
    </main>
    <app-footer />
  </div>
</template>

<script>
import appHeader from '@/components/header/Header'

export default {
  components: {
    appHeader,
    appFooter: () => import('@/components/footer/Footer')
  },
  mounted () {
    window.addEventListener('scroll', stick, { passive: true })
    const header = document.querySelector('.header__links')
    const main = document.querySelector('main')
    const sticky = header.offsetTop
    function stick () {
      if (window.pageYOffset > sticky) {
        header.classList.add('sticky')
        main.classList.add('sticky-main')
      } else {
        header.classList.remove('sticky')
        main.classList.remove('sticky-main')
      }
    }
  },
  computed: {
    cartWarning () {
      return this.$store.getters.cartWarning
    },
    cartWarningTime () {
      return this.$store.getters.cartWarningTime
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Kaushan+Script');
.main-container {
  background-color: #000;
}
@media screen and (min-width: 768px) {
  .sticky {
    position: fixed;
    top: 0;
    background-color: rgba(0, 0, 0, 0.8);
    width: 100%;
    border: none;
  }
  .sticky-main {
    padding-top: 77px;
  }
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
html,
body {
  width: 100%;
  overflow-x: hidden;
  background-color: #000;
}
main {
  background: rgba(0,0,0,0.7);
  padding-top: 67px;
  position: relative;
  min-height: 140px;
  @media screen and (min-width: 768px) {
    padding-top: 0;
  }
}
.clearfix:after {
  clear: both;
  content: "";
  display: block;
}
button {
  cursor: pointer;
}
a {
  color: #fff;
  text-decoration: none;
  transition: color .2s linear;
}
main {
  width: 100%;
}
.kaushan {
  font-family: 'Kaushan Script', cursive;
}
div.slick-track {
  display: flex;
  align-items: center;
}
.slick-arrow {
  height: 100%;
  position: absolute;
  z-index: 5;
  width: 40px;
  cursor: pointer;
  bottom: 0;
  color: #fff;
  background-color: transparent;
  border: none;
  &:before {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  &.slick-prev {
    left: 0;
    &:before {
      left: 10px;
      padding: 5px;
      background-color: white;
      border-radius: 50%;
      color: black;
    }
  }
  &.slick-next {
    right: 0;
    &:before {
      right: 10px;
      padding: 5px;
      background-color: white;
      border-radius: 50%;
      color: black;
    }
  }
}
.v-lazy-image {
  filter: blur(10px);
  transition: filter 0.7s;
}
.v-lazy-image-loaded {
  filter: blur(0);
}
.VueCarousel-navigation-button {
  background-color: #fff!important;
  border-radius: 50%!important;
  opacity: 1!important;
}
.VueCarousel-navigation-prev {
  left: 35px!important;
  &:focus,
  &:active {
    outline: none!important;
  }
}
.VueCarousel-navigation-next {
  right: 35px!important;
  &:focus,
  &:active {
    outline: none!important;
  }
}
.alert-area {
  width: 300px;
  max-height: 100%;
  position: fixed;
  top: 20%;
  left: 0;
  z-index: 999999;
}
.alert-box {
  font-size: 1.3rem;
  color: #000;
  background: rgba(255, 255, 255, 0.9);
  line-height: 1.3em;
  padding: 10px 15px;
  position: relative;
  border-radius: 5px;
  transition: opacity 0.5s ease-in;
}
.alert-content {
  margin-right: 15px;
}
.alert-close {
  display: block;
  position: absolute;
  width: 15px;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  color: #000;
}
@media (min-width: 768px) {
  .alert-area {
    width: 350px;
  }
}

.wrapper {
  padding: 5px;
  @media screen and (min-width: 768px) {
    width: 80%;
    margin: 0 auto;
    padding: 20px;
  }
}
/*
 Animations
*/
.slide-enter-active {
  transition: all .6s ease;
}
.slide-leave-active {
  transition: all .6s linear;
}
.slide-enter,
.slide-leave-to {
  transform: translateX(-350px);
}
</style>
