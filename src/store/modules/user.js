import defaultPage from './constant'
import axios from "axios";
const state = {
  userList: [],
  userIdLogin: null,
  userName: "",
}

const getters = {}

const actions = {
  logIn({ commit }, userDetail) {
    commit('SET_USERLOGIN', userDetail);
  },
  getUserData({ commit }) {
    return axios
      .post(defaultPage.pathApi + "Home/Userlist")
      .then((response) => {
        let posts = response.data;
        commit('SET_USERLIST', posts);
      });
  },
  logOut({ commit }) {
    commit('SET_USERLOGOUT');
  }
  //loaduserlist
  //login
  //logout
}

const mutations = {
  SET_USERLIST(state, posts) {
    state.userList = posts
  },
  SET_USERLOGIN(state, userDetail) {
    state.userIdLogin = userDetail.userId
    state.userName = userDetail.userName
  },
  SET_USERLOGOUT(state) {
    state.userIdLogin = null
    state.userName = ""
  }

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}