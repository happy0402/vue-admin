/**
 * Created by Administrator on 2019/5/12.
 */
import Cookies from 'js-cookie'

const state = {
    name: '',
    roles: [],
    token: undefined
}

const mutations = {
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    },
    SET_TOKEN: (state, token) => {
        state.token = token
        Cookies.set('token', token);
    }
}

const actions = {
    setToken({ commit }, token){
        commit('SET_TOKEN', token);
    },
    setUserInfo({ commit }, userInfo) {
        const { userName, roles } = userInfo;
        commit('SET_NAME', userName);
        commit('SET_ROLES', roles);
    },
    resetUserInfo({commit}){
        commit('SET_TOKEN', '');
        commit('SET_ROLES', []);
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}