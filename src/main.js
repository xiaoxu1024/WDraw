import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Dialog from '@/components/dialog'

Vue.config.productionTip = false
Vue.prototype.$confirm = Dialog

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
