import Vue from 'vue'
import VueRouter from 'vue-router'
import vuetify from './plugins/vuetify'
import { routes } from "./router/routes";
import App from './App.vue'

import { store } from './store/store'

Vue.config.productionTip = false
Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes
});

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
