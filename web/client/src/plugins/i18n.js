import Vue from 'vue'
import VueI18n from 'vue-i18n'

import { routeCollection, routeCollectionEN } from '@/collections/routeCollection'
import { lithuanianCountries, englishCountries } from '@/collections/countries'
import { languages, defaultLocale } from '../locales/index'

Vue.use(VueI18n)

const messages = Object.assign(languages)
messages.lt.routes = routeCollection
messages.en.routes = routeCollectionEN

messages.lt.countries = lithuanianCountries
messages.en.countries = englishCountries

export const i18n = new VueI18n({
  // locale: navigator.userLanguage || navigator.language,
  locale: defaultLocale,
  fallbackLocale: 'en',
  messages
})
