import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import { auth } from "@/firebase";


Vue.config.productionTip = false

auth.onAuthStateChanged(function (user) {
  if (user) {
    store.dispatch('setUsuario', user);
  }
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
});