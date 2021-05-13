import axios from "axios";
const state = {
    AccountDataApi: [],
}

const getters = {

}

const actions = {
    Seacrh({ commit }, obj) {
        return axios
            .post("http://localhost:29245/Home/Search", obj)
            .then((response) => {
                let posts = response.data;
                commit('SET_SEARCH', posts);
            });
    },
    addAccoount(state, accountData) {
        return axios
            .post("http://localhost:29245/Home/Add", accountData)
            .then((response) => {
                return response
            });
    },
    updateAccount(state, accountData) {
        return axios
            .post("http://localhost:29245/Home/Update", accountData)
            .then((response) => {
                return response
            });
    }
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