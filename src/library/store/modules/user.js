/**
 * Created by Administrator on 2019/5/12.
 */
import Cookies from 'js-cookie'

const state = {
    name: '',
    roles: [],
    power: 0,
    token: undefined
}

const mutations = {
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    },
    SET_ROWER: (state, power) => {
        state.power = power
    },
    SET_TOKEN: (state, token) => {
        state.token = token
        Cookies.set('token', token)
    }
}

const actions = {
    setUserInfo({ commit }, userInfo) {
        const { userName, roles, power, token } = userInfo
        commit('SET_NAME', userName)
        commit('SET_ROLES', roles)
        commit('SET_ROWER', power)
        commit('SET_TOKEN', token)
    },
    resetUserInfo({commit}){
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}