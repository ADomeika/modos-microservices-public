export default {
  setLoading: ({ commit }, payload) => {
    commit('setLoading', payload)
  },
  setDelivery: ({ commit }, payload) => {
    commit('setDelivery', payload)
  },
  setCartId: ({ commit }, payload) => {
    commit('setCartId', payload)
  },
  setCartQuantity: ({ commit }, payload) => {
    commit('setCartQuantity', payload)
  },
  setCartCheck: ({ commit }, payload) => {
    commit('setCartCheck', payload)
  },
  setCartWarning: ({ commit }, payload) => {
    commit('setCartWarning', payload)
  },
  setCartWarningTime: ({ commit }, payload) => {
    commit('setCartWarningTime', payload)
  }
}
