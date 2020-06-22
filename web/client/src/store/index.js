import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import state from './modules/state'
import getters from './modules/getters'
import mutations from './modules/mutations'
import actions from './modules/actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  plugins: [createPersistedState()],
  getters,
  mutations,
  actions
})
