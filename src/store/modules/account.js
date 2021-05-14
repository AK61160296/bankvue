import defaultPage  from './constant'
import axios from "axios";
const state = {
    AccountDataApi: [],
    status: false,
}
const getters = {
    getAccountEdit() {
        alert()
        return "xxxx"
    }
}
const actions = {
    Seacrh({ commit }, obj) {

        return axios
            .post(defaultPage.pathApi+"Home/Search", obj)
            .then((response) => {
                let posts = response.data;
                commit('SET_SEARCH', posts);
            });
    },
    addAccoount(state, accountData) {
        return axios
            .post(defaultPage.pathApi+"Home/Add", accountData)
            .then((response) => {
                return response
            });
    },
    updateAccount(state, accountData) {
        return axios
            .post(defaultPage.pathApi+"Home/Update", accountData)
            .then((response) => {
                return response
            });
    },
    editAccount(state, id) {
        let obj = { AcId: id }
        return axios
            .post(defaultPage.pathApi+"Home/Edit", obj)
            .then((response) => {
                return response
            });
    },
    updateStatus(state, updateStatus) {
        return axios
            .post(defaultPage.pathApi+"Home/updateStatus", updateStatus)
            .then((response) => {
                return response
            });
    },
}

const mutations = {
    SET_SEARCH(state, posts) {
        state.AccountDataApi = posts
    },

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}