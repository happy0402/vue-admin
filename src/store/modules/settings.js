/**
 * Created by Administrator on 2019/5/18.
 */
import Cookies from 'js-cookie'
const state = {
    headerView: Cookies.get('headerView') || 'embed', // 'hidden' | 'fixed' | 'embed'
    tagsView: Cookies.get('tagsView') === 'false' ? false : true
}

const mutations = {
    SET_HEADER_VIEW: (state, headerView) => {
        state.headerView = headerView
        Cookies.set('headerView', headerView)
    },
    SET_TAGS_VIEW: (state, tagsView) => {
        state.tagsView = tagsView
    },
    TOGGLE_TAGS_VIEW: (state) => {
        state.tagsView = !state.tagsView
        Cookies.set('tagsView', state.tagsView)
    }
}

const actions = {
    setHeaderView: ({ commit }, headerView) => {
        commit('SET_HEADER_VIEW', headerView)
    },
    setTagsView: ({ commit }, tagsView) => {
        commit('SET_TAGS_VIEW', tagsView)
    },
    toggleTagsView: ({ commit }) => {
        commit('TOGGLE_TAGS_VIEW')
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}