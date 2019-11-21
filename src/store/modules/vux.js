const vux = {
  namespaced: true,
  state: {
    isLoading: false,
    loadingText: '加载中...'
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
