// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { AjaxPlugin } from 'vux'

Vue.use(AjaxPlugin)

const FastClick = require('fastclick')
FastClick.attach(document.body)

Vue.config.productionTip = false

router.beforeEach(function (to, from, next) {
  store.commit('vux/updateLoadingStatus', {isLoading: true})
  next()
})

router.afterEach(function (to) {
  store.commit('vux/updateLoadingStatus', {isLoading: false})
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
