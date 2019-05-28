/**
 * Created by Administrator on 2019/5/19.
 */
const state = {
    visitedViews: []
}

const mutations = {
    ADD_VISITED_VIEW:(state, view) => {
        if (state.visitedViews.some(v => v.path === view.path)) return
        state.visitedViews.push(
            Object.assign({}, view, {
                title: view.meta.title || 'no-name'
            })
        )
    },
    DEL_VISITED_VIEW: (state, view) => {
        for (let [i, v] of state.visitedViews.entries()) {
            if (v.path === view.path) {
                state.visitedViews.splice(i, 1)
                break
            }
        }
    },
    CLEAR_VIEWS: (state) => {
        state.visitedViews = []
    }
}

const actions = {
    addVisitedView:({ commit }, view) =>{
        commit('ADD_VISITED_VIEW', view)
    },
    delVisitedView:({ commit }, view) =>{
        commit('DEL_VISITED_VIEW', view)
    },
    clearViews: ({ commit }) => {
        commit('CLEAR_VIEWS')
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}