<template>
  <nav class="navigation">
    <router-link
      to="/krepselis"
      class="mobile-only">
      <i class="fas fa-shopping-cart cart-button"></i>
    </router-link>
    <button
      class="navigation__menu"
      @click="openMenu">
      <i
        class="material-icons"
        id="mobile-menu"
        v-click-outside="off">menu</i>
    </button>
    <transition name="slide">
      <div
        class="mobile-menu"
        v-if="isMobileOpen"
        @click="isMobileOpen = false">
        <router-link
          v-for="(route, i) in $t('routes')"
          :key="i"
          :to="route.to"
          class="menu__link"
          :class="{ 'sale-item': route.saleItem }">{{ route.title }}</router-link>
      </div>
    </transition>
    <div class="menu">
      <router-link
        v-for="(route, i) in $t('routes')"
        :key="i"
        :to="route.to"
        class="menu__link"
        :class="{ 'sale-item': route.saleItem, 'dropdown': route.dropdown  }">{{ route.title }}
        <div class="dropdown__content">
          <router-link
            class="dropdown__link"
            :to="route.to + '/' + categories.women.toLowerCase()">{{ categories.women }}
            <div class="dropdown-sub__content">
              <router-link
                v-for="womenLink in subCategories.women"
                :key="womenLink"
                class="dropdown-sub__link"
                :to="`${route.to + '/' + categories.women.toLowerCase()}?subkategorija=${ womenLink.toLowerCase() }`">{{ womenLink }}</router-link>
            </div>
          </router-link>
          <router-link class="dropdown__link" :to="route.to + '/' + categories.girls.toLowerCase()">{{ categories.girls }}
            <div class="dropdown-sub__content">
              <router-link
                v-for="girlsLink in subCategories.girls"
                :key="girlsLink"
                class="dropdown-sub__link"
                :to="`${route.to + '/' + categories.girls.toLowerCase()}?subkategorija=${ girlsLink.toLowerCase() }`">{{ girlsLink }}</router-link>
            </div>
          </router-link>
          <router-link class="dropdown__link" :to="route.to + '/' + categories.men.toLowerCase()">{{ categories.men }}
            <div class="dropdown-sub__content">
              <router-link
                v-for="menLink in subCategories.men"
                :key="menLink"
                class="dropdown-sub__link"
                :to="`${route.to + '/' + categories.men.toLowerCase()}?subkategorija=${ menLink.toLowerCase() }`">{{ menLink }}</router-link>
            </div>
          </router-link>
          <router-link class="dropdown__link" :to="route.to + '/' + categories.boys.toLowerCase()">{{ categories.boys }}
            <div class="dropdown-sub__content">
              <router-link
                v-for="boysLink in subCategories.boys"
                :key="boysLink"
                class="dropdown-sub__link"
                :to="`${route.to + '/' + categories.boys.toLowerCase()}?subkategorija=${ boysLink.toLowerCase() }`">{{ boysLink }}</router-link>
            </div>
          </router-link>
          <router-link class="dropdown__link" :to="route.to + '/' + categories.accessories.toLowerCase()">{{ categories.accessories }}
            <div class="dropdown-sub__content">
              <router-link
                v-for="accessoriesLink in subCategories.accessories"
                :key="accessoriesLink"
                class="dropdown-sub__link"
                :to="`${route.to + '/' + categories.accessories.toLowerCase()}?subkategorija=${ accessoriesLink.toLowerCase() }`">{{ accessoriesLink }}</router-link>
            </div>
          </router-link>
        </div>
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      isMobileOpen: false,
      categories: this.$t('other.categories'),
      subCategories: this.$t('other.subCategories')
    }
  },
  methods: {
    openMenu () {
      this.isMobileOpen = !this.isMobileOpen
    },
    off () {
      this.isMobileOpen = false
    }
  },
  created () {
    document.addEventListener('scroll', () => {
      this.isMobileOpen = false
    }, { passive: true })
  }
}
</script>

<style scoped lang="scss">
.mobile-only {
  margin-right: 15px;
  @media (min-width: 768px) {
    display: none;
  }
}
.navigation {
  z-index: 999;
  @media (max-width: 767px) {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 5px;
  }
  .navigation__menu {
    background: transparent;
    border: none;
    color: #fff;
    &:focus,
    &:active {
      outline: none;
    }
  }

  .mobile-menu {
    position: absolute;
    top: 100%;
    right: 0;
    width: 250px;
    background: rgba(0,0,0,0.7);

    .menu__link {
      width: 100%;
      display: block;
    }
  }

  .menu__link {
    text-align: center;
    padding: 15px;
    text-transform: uppercase;

    &:hover,
    &:active {
      color: #999;
      border-radius: 10px;
    }

    &.sale-item {
      color: rgb(245, 112, 112);

      &:hover,
      &:active {
        color: rgb(241, 46, 46);
      }
    }
  }
  .menu {
    display: none;
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: transform .3s ease;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(250px);
}

@media (min-width: 768px) {
  .navigation {

    .navigation__menu {
      display: none;
    }

    .menu {
      display: flex;
      justify-content: space-around;
      padding: 10px 5%;

      &__link {
        display: inline-block;
        font-size: 14px;
      }
    }
  }
}

@media (min-width: 1025px) {
  .navigation {

    .menu {
      padding: 10px 10%;

      &__link {
        padding: 20px 0;
      }
    }
  }
}
.dropdown__content {
  position: absolute;
  top: 100%;
  width: 140%;
  min-width: 130px;
  left: -20%;
  background-color: rgba(0,0,0,0.7);
  display: none;
}
.dropdown-sub__content {
  border-left: 1px solid #fff;
  position: absolute;
  left: 100%;
  top: 0;
  background-color: rgba(0,0,0,0.7);
  display: none;
}
.dropdown {
  position: relative;

  &:hover .dropdown__content {
    padding-top:10px;
    display: flex;
    flex-direction: column;
  }

  &__link {
    position: relative;
  }

  &__link,
  &-sub__link {
    padding: 10px 15px;

    &:hover {
      color: #999;
    }
  }
}
.dropdown__link:hover .dropdown-sub__content {
  display: flex;
  flex-direction: column;
}
</style>
