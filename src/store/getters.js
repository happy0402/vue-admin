const getters = {
    appMsg: state => state.app.appMsg,
    language: state => state.app.language,
    routes: state => state.app.routes,
    searchRoutes: state => state.app.searchRoutes,
    sidebar: state => state.app.sidebar,
    userName: state => state.user.name,
    roles: state => state.user.roles,
    power: state => state.user.power,
    token: state => state.user.token,
    headerView: state => state.settings.headerView,
    tagsView: state => state.settings.tagsView,
    visitedViews: state => state.tagsView.visitedViews
}

export default getters