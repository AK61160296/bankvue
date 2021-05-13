import Vue from 'vue'
import Vuex from 'vuex'
import account from './modules/account'
import transaction from './modules/transaction'
import user from './modules/user'
import VueAxios from "vue-axios";
import axios from "axios";
Vue.use(VueAxios, axios);
Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    account,
    transaction,
    user
  },
//   strict: debug
})