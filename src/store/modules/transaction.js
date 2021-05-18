import defaultPage from './constant'
import axios from "axios";
const state = {
  tansactionDataApi: [],
  optionAccount: [],
}

const getters = {}

const actions = {
  Seacrh({ commit }, seacthData) {
    return axios
      .post(defaultPage.pathApi + "Transaction/Search", seacthData)
      .then((response) => {
        let posts = response.data;
        commit('SET_SEARCH', posts);
      });
  },
  Transfer(state, trasactionDetail) {
    return axios
      .post(defaultPage.pathApi + "Transaction/Transfer", trasactionDetail)
      .then((response) => {
        return response
      });
  },
  depositWithdraw(state, trasactionDetail) {
    return axios
      .post(defaultPage.pathApi + "Transaction/Deposit_Withdraw", trasactionDetail)
      .then((response) => {
        return response
      });
  },
  optionAccount(state,postUserId) {
    return axios
      .post(defaultPage.pathApi + "Transaction/Option_account",postUserId)
      .then((response) => {
        return response
      });
  },
  getBalance(state,postAccountId) {
    return axios
      .post(defaultPage.pathApi + "Transaction/Balance",postAccountId)
      .then((response) => {
        return response
      });
  }
}

const mutations = {
  SET_SEARCH(state, posts) {
    state.tansactionDataApi = posts
  },

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}