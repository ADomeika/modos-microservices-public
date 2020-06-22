<template>
  <div class="admin">
    <div
      class="card"
      v-if="!admin"
    >
      <form
        class="form"
        @submit.prevent="login"
      >
        <div class="form__input">
          <label for="email">{{ $t('views.admin.dashboard.username') }}: </label>
          <input
            type="text"
            id="email"
            name="email"
            v-model="email"
          >
        </div>
        <div class="form__input">
          <label for="password">{{ $t('views.admin.dashboard.password') }}: </label>
          <input
            type="password"
            id="password"
            name="password"
            v-model="password"
          >
        </div>
        <button>{{ $t('views.admin.dashboard.submit') }}</button>
      </form>
    </div>
    <div v-else>
      <div class="buttons">
        <router-link
          to="/admin/naujas-produktas"
          class="admin-link">{{ $t('views.admin.dashboard.addNewProduct') }}</router-link>
        <router-link
          to="/admin/keisti-produkta"
          class="admin-link">{{ $t('views.admin.dashboard.editProduct') }}</router-link>
        <router-link
          to="/admin/uzsakymai"
          class="admin-link">{{ $t('views.admin.dashboard.orders') }}</router-link>
        <router-link
          to="/admin/paveiksliukai"
          class="admin-link">{{ $t('views.admin.dashboard.uploadPictures') }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import setAuthToken from '@/utils/setAuthToken'
import AuthService from '@/services/AuthService'

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthService.login({
          email: this.email,
          password: this.password
        })
        setAuthToken(response.data.token)
        location.reload()
      } catch (error) {
        console.error(error)
      }
    }
  },
  computed: {
    admin () {
      return localStorage.getItem('token')
    }
  }
}
</script>

<style scoped lang="scss">
.admin {
  width: 100%;
  color: #fff;
  padding: 50px 20px;
  @media screen and (min-width: 768px) {
    width: 80%;
    margin: 0 auto;
  }
}
.card {
  border: 1px solid #fff;
  padding: 20px;
  @media screen and (min-width: 768px) {
    width: 50%;
    margin: 0 auto;
  }
}
.form {
  :not(:first-child) {
    padding-top: 10px;
  }
  &__input {
    display: flex;
    flex-wrap: wrap;
    font-size: 1.2em;
    label {
      width: 100%;
      padding-bottom: 10px;
    }
    input {
      width: 100%;
      border: none;
      padding: 5px 10px;
      font-size: 1.2em;
    }
  }
}
.buttons {
  display: flex;
  flex-wrap: wrap;
  .admin-link {
    background-color: transparent;
    border: 2px solid #fff;
    border-radius: 5px;
    color: #fff;
    font-size: 1.4em;
    margin: 10px;
    padding: 10px 15px;
    transition: color, background-color .3s linear;
    &:hover {
      background-color: #fff;
      color: #000;
    }
    &:not(:last-child) {
      margin-right: 10px;
    }
  }
}
</style>
