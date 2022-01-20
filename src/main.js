import Vue from 'vue'
import App from './App.vue'

import './web3'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
