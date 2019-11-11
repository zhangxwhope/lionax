const vux = {
  namespaced: true,
  state: {
    isLoading: false
  },
  getters: {

  },
  actions: {

  },
  mutations: {
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    }
  }
}

export default vux
