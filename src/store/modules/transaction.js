import defaultPage from './constant'
import axios from "axios";
const state = {
  tansactionDataApi: [],
}

const getters = {}

const actions = {
  Seacrh({ commit }, seacthObj) {
    return axios
      .post(defaultPage.pathApi + "Transaction/Search", seacthObj)
      .then((response) => {
        console.log(response.data)
        let posts = response.data;
        commit('SET_SEARCH', posts);
      });
  },
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