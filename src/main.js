import Vue from 'vue'
import App from './App'
import router from './router'
// import VueRecource from 'vue-resource'
import Axios from 'axios'

Vue.config.productionTip = false;
// Vue.use(VueRecource)
Vue.prototype.$http=Axios;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
