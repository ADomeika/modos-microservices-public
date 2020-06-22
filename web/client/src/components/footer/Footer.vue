<template>
  <footer class="footer">
    <div class="contact-information">
      <div class="contact-information__contact">
        <ul class="list">
          <li class="list__item">{{ $t('components.footer.telephone') }}: <a href="tel:+370 647 56423">+370 647 56423</a>, <a href="tel:+370 645 79463">+370 645 79463</a></li>
          <li class="list__item">{{ $t('components.footer.email') }}: <a href="mailto:modos.design.info@gmail.com">modos.design.info@gmail.com</a></li>
          <li class="list__item">Facebook: <a href="https://www.facebook.com/MoDosDesign">facebook.com/MoDosDesign</a></li>
          <li class="list__item">Instagram: <a href="https://www.instagram.com/modosdesign">instagram.com/modosdesign</a></li>
        </ul>
      </div>
      <div class="contact-information__menu">
        <router-link v-for="(route, i) in routes" :key="i" :to="route.to">{{ route.title }}</router-link>
      </div>
    </div>
    <div class="copyright">
      <p>{{ $t('components.footer.copyright') }} &copy; MoDo's Design</p>
    </div>
  </footer>
</template>

<script>
import { routeCollection } from '@/collections/routeCollection'

export default {
  data () {
    return {
      routes: routeCollection
    }
  }
}
</script>

<style scoped lang="scss">
.footer {
  color: #fff;
  display: flex;
  flex-flow: column;
  width: 100%;
  @media screen and (min-width: 768px) {
    width: 80%;
    margin: 0 auto;
  }
  .contact-information {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    &__contact,
    &__menu {
      width: 100%;
      text-align: center;
      @media screen and (min-width: 768px) {
        width: 50%;
      }
    }
    &__contact {
      .list {
        margin: 10px;
        list-style: none;
        text-align: left;
        &__item {
          padding: 2px;
          a:hover {
            color: #666;
          }
        }
      }
    }
    &__menu {
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: flex-start;
      padding: 10px;
      a:hover {
        color: #666;
      }
    }
  }
  .copyright {
    text-align: center;
    width: 100%;
    padding: 10px 0 20px;
  }
}
</style>
