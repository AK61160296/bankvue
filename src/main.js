import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueAxios from "vue-axios";
import axios from "axios";
import VueSimpleAlert from "vue-simple-alert";
import store from './store'
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.config.productionTip = false
Vue.use(VueAxios, axios);
Vue.use(VueSimpleAlert);

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
