import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Axios from 'axios'
import Utils from '../utils/utils'


Vue.config.productionTip = false
Vue.prototype.$http = Axios
Vue.prototype.utils = Utils

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
