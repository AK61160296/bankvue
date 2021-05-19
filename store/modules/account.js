import defaultPage from './constant'
import axios from "axios";
const state = {
    AccountDataApi: [],
    status: false,
}
const getters = {
    getAccountEdit() {

    }
}
const actions = {
    Seacrh({ commit }, obj) {

        return axios
            .post(defaultPage.pathApi + "Home/Search", obj)
            .then((response) => {
                let posts = response.data;
                commit('SET_SEARCH', posts);
            });
    },
    async addAccoount(state, accountDetail) {
        return axios
            .post(defaultPage.pathApi + "Home/Add", accountDetail)
            .then((response) => {
                return response
            });
    },
    updateAccount(state, accountDetail) {
        return axios
            .post(defaultPage.pathApi + "Home/Update", accountDetail)
            .then((response) => {
                return response
            });
    },
    editAccount(state, id) {
        let obj = { AcId: id }
        return axios
            .post(defaultPage.pathApi + "Home/Edit", obj)
            .then((response) => {
                return response
            });
    },
    updateStatus(state, updateStatus) {
        return axios
            .post(defaultPage.pathApi + "Home/updateStatus", updateStatus)
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