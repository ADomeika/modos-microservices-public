<template>
  <header class="header">
    <section class="header__logo">
      <div class="head">
        <div class="social-network">
          <a href="https://www.facebook.com/MoDosDesign/">
            <i class="fab fa-facebook fa-2x"></i>
          </a>
          <a href="https://www.instagram.com/modosdesign/">
            <i class="fab fa-instagram fa-2x"></i>
          </a>
          <a href="mailto:modos@modosdesign.lt">
            <i class="far fa-envelope fa-2x"></i>
          </a>
        </div>
        <div class="logo">
          <h1 class="kaushan"><router-link to="/">MoDo's Design</router-link></h1>
        </div>
        <div class="side-help">
          <router-link to="/krepselis" title="Krepselio nuoroda">
            <i class="fas fa-shopping-cart fa-2x cart-button">
              <div class="items-in-cart">{{ cartQuantity }}</div>
            </i>
          </router-link>
        </div>
      </div>
    </section>
    <section class="header__links"><app-nav /></section>
  </header>
</template>

<script>
import appNav from './Navigation'

export default {
  components: {
    appNav
  },
  computed: {
    cartQuantity () {
      return this.$store.getters.cartQuantity
    }
  }
}
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  z-index: 9999;
  position: fixed;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  top: 0;
  display: flex;
  flex-wrap: wrap;
  background-color: rgba(0,0,0,0.5);
  height: 70px;
  border-bottom: 1px solid #fff;
  @media screen and (min-width: 768px) {
    position: relative;
    height: 100%;
  }
  section {
    &.header__logo {
      flex-basis: 70%;
      @media screen and (min-width: 768px) {
        position: relative;
      }
      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: .4;
        z-index: -1;
        background-image: url('../../assets/header-background.jpg');
        background-repeat: no-repeat;
        background-size: 100%;
        border-bottom: 1px solid #fff;
      }
      @media screen and (min-width: 768px) {
        flex-basis: 100%;
        display: flex;
        align-items: center;
      }
    }
    &.header__links {
      flex-basis: 30%;
      text-align: center;
      padding-right: 6px;
      @media screen and (min-width: 768px) {
        flex-basis: 100%;
      }
    }
  }
  h1 {
    margin: 0;
    padding: 0;
  }
  .head {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media screen and (min-width: 768px) {
      padding: 20px 25px;
    }
    @media screen and (min-width: 1025px) {
      width: 80%;
      margin: 0 auto;
    }

    .logo {
      color: #fff;
      padding: 5px 15px;
      @media screen and (min-width: 768px) {
        font-size: 1.5em;
        text-align: center;
        flex: 2;
        display: inline-block;
      }
    }

    .social-network,
    .side-help {
      display: none;
      @media screen and (min-width: 768px) {
        flex: 1;
        display: inline-block;
        padding: 5px 10px;
      }
    }
    .side-help {
      text-align: right;
    }

    .social-network a:not(:last-child),
    .side-help a:not(:last-child) {
      margin-right: 10px;
    }

    .social-network .fa-facebook {
      color: #fff;
      transition: background-color .2s linear;
      padding: 0 2px;
      &:hover,
      &:active {
      color: #4267b2;
        background-color: #fff;
      }
    }

    .social-network .fa-instagram {
      color: #fff;
      transition: background-color .2s linear;
      padding: 0 2px;
      &:hover,
      &:active {
        background-color: linear-gradient(145deg, #3051F1 10%, #C92BB7 70%) no-repeat;
      }
    }

    .social-network .fa-envelope {
      color: #fff;
      transition: background-color .2s linear;
      padding: 0 2px;
      &:hover,
      &:active {
      color: #e94134;
        background-color: #fff;
      }
    }
  }
}
.cart-button {
  transition: color .2s linear;
  &:hover {
    color: #999;
  }
  &:hover .items-in-cart {
    background-color: #999;
  }
}
.cart-button {
  position: relative;
  .items-in-cart {
    position: absolute;
    top: -10px;
    right: -10px;
    border: 1px solid #000;
    border-radius: 50%;
    color: #000;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25px;
    height: 25px;
    background-color: #fff;
    transition: background-color .2s linear;
  }
}
</style>
