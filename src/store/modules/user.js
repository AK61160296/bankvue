import defaultPage  from './constant'
import axios from "axios";
const state = {
  userList: [],
  userIdLogin: "",
  userName: "",
}

const getters = {}

const actions = {
  Login({commit},userDetail){
    commit('SET_USERLOGIN', userDetail);
  },  
  getUserData({commit}) {
    return axios
      .post(defaultPage.pathApi + "Home/Userlist")
      .then((response) => {
        let posts = response.data;
        commit('SET_USERLIST', posts);
      });
  },
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
  USERLOGOUT(){
    state.userIdLogin = ""
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