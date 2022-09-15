import '@babel/polyfill'
import 'mutationobserver-shim'

import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.filter("toCurrency", function (value) {
  if (!value) return 0.00;
  var formatter = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
  });
  return formatter.format(value);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')