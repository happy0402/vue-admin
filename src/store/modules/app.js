import Cookies from 'js-cookie'

const state = {
    appMsg: {
        appCode: undefined,
        appName: ''
    },
    language: Cookies.get('language'),
    sidebar: {
        opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true
    },
    routes: [],
    searchRoutes: [],
}

const mutations = {
    TOGGLE_SIDEBAR: state => {
        state.sidebar.opened = !state.sidebar.opened
        // state.sidebar.withoutAnimation = false
        if (state.sidebar.opened) {
            Cookies.set('sidebarStatus', 1)
        } else {
            Cookies.set('sidebarStatus', 0)
        }
    },
    SET_APPMSG: appMsg => {
        state.appMsg = appMsg;
    },
    SET_LANGUAGE: (state, language) => {
        state.language = language
        Cookies.set('language', language)
    },
    SET_ROUTES: (state, routes) => {
        state.routes = routes
    },
    ADD_SEARCH_ROUTE: (state, route) => {
        state.searchRoutes.push(route)
    }
}

const actions = {
    setAppMsg({ commit }, appMsg){
        commit('SET_APPMSG', appMsg)
    },
    setLanguage({ commit }, language) {
        commit('SET_LANGUAGE', language)
    },
    setRoutes({ commit }, routes) {
        commit('SET_ROUTES', routes)
    },
    addSearchRoute({ commit }, route){
        commit('ADD_SEARCH_ROUTE', route)
    },
    toggleSidebar({ commit }) {
        commit('TOGGLE_SIDEBAR')
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}