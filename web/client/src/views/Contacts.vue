<template>
  <div class="contacts">
    <h1 class="title">{{ $t('views.contact.contactUs') }}</h1>
    <div class="form-group" v-if="!messageSent">
      <form class="form" @submit.prevent="sendMessage">
        <p>{{ $t('views.contact.yourName') }}:
          <input
            :placeholder="$t('views.contact.yourName')"
            v-model="fullName"
            @blur="$v.fullName.$touch()">
        </p>
        <transition name="fade" mode="out-in">
          <div v-if="$v.fullName.$dirty && !$v.fullName.required" class="error">{{ $t('views.contact.required') }}</div>
          <div v-if="$v.fullName.$dirty && !$v.fullName.mustBeFullName && fullName.length > 0" class="error">{{ $t('views.contact.lettersOnly') }}</div>
        </transition>
        <p>{{ $t('views.contact.yourEmail') }}:
          <input
            placeholder="example@gmail.com"
            v-model="email"
            @blur="$v.email.$touch()">
        </p>
        <transition name="fade" mode="out-in">
          <div key="required" v-if="$v.email.$dirty && !$v.email.required" class="error">{{ $t('views.contact.required') }}</div>
          <div key="email" v-if="$v.email.$dirty && !$v.email.email" class="error">{{ $t('views.contact.realEmail') }}</div>
        </transition>
        <p>{{ $t('views.contact.yourMessage') }}:
          <textarea
            :placeholder="$t('views.contact.yourMessage')"
            rows="5"
            v-model="message"
            @blur="$v.message.$touch()"></textarea>
        </p>
        <transition name="fade">
          <div v-if="$v.message.$dirty && !$v.message.required" class="error">{{ $t('views.contact.required') }}</div>
        </transition>
        <button :disabled="isDisabled">{{ $t('views.contact.sendMessage') }}</button>
      </form>
    </div>
    <h1 v-else>{{ $t('views.contact.messageSent') }}.</h1>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import ContactsService from '../services/ContactsService'
const fullNameRegEx = /^([a-z']+(-| )?)+$/i
const mustBeFullName = (value) => fullNameRegEx.test(value)

export default {
  data () {
    return {
      fullName: '',
      email: '',
      message: '',
      messageSent: false
    }
  },
  computed: {
    isDisabled () {
      return this.$v.$invalid
    }
  },
  methods: {
    async sendMessage () {
      this.$v.$touch()
      if (this.$v.$invalid) return
      const body = {
        fullName: this.fullName,
        email: this.email,
        message: this.message
      }
      try {
        await ContactsService.sendMessage(body)
        this.messageSent = true
      } catch (error) {
        console.log(error)
      }
    }
  },
  validations: {
    fullName: { required, mustBeFullName },
    email: { required, email },
    message: { required }
  },
  beforeCreate () {
    this.$ua.trackView('/contacts')
  }
}
</script>

<style scoped lang="scss">
.contacts {
  width: 100%;
  color: #fff;
  @media screen and (min-width: 768px) {
    width: 80%;
    margin: 0 auto;
  }
}
.title {
  text-align: center;
  padding: 30px 0;
}
.form {
  width: 100%;
  height: 440px;
  max-width: 800px;
  margin: 20px auto ;
  padding: 20px 30px;
  box-sizing: border-box;
  font-family: 'Montserrat',sans-serif;
}
input,
textarea {
  background: none;
  border: none;
  border-bottom: 2px solid rgb(255, 255, 255);
  box-sizing: border-box;
  color: #fff;
  font-family: 'Montserrat',sans-serif;
  font-size: 1.1em;
  letter-spacing: 0.1em;
  outline: none;
  padding: 10px;
  resize: none;
  transition: all .3s;
  width: 100%;
}
input:focus,
textarea:focus {
  border-bottom: 2px solid #adadad
}
p:before {
  content: attr(type);
  display: block;
  margin: 28px 0 0;
  font-size: 14px;
  color: #ccc
}
button {
  float: right;
  padding: 8px 12px;
  margin: 8px 0 0;
  font-family: 'Montserrat',sans-serif;
  font-size: 1.1em;
  border: 2px solid #fff;
  border-radius: 5px;
  background: 0;
  color: #fff;
  cursor: pointer;
  transition: all .3s;
  &[disabled="disabled"] {
    cursor: not-allowed;
  }
}
button:hover {
  background: #3c3c41;
}
span {
  margin:0 5px 0 15px
}
textarea {
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.9) #fff;
}
textarea::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px #000;
  background-color: #fff;
  border-radius: 10px;
}
textarea::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.9);
  box-shadow: inset 0 0 1px #fff;
  border-radius: 10px;
}
textarea::-webkit-scrollbar {
  width: 10px;
  cursor: initial;
}
textarea::-webkit-scrollbar-thumb:hover {
  background: #000;
}
/*
  Animations
*/
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity .5s;
}
.fade-leave-active {
  transition: opacity .5s;
  opacity: 0;
}
.fade-move {
  transition: transform .5s;
}
</style>
