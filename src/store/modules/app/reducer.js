import { handleActions } from 'redux-actions'

export const namespace = 'app'

const initState = {
  // 当前路由信息
  activeRoute: null,
  // 当前菜单路由 相关匹配的 父级菜单信息 match
  matchRoutes: [],
};

export const appReducer = handleActions({
  SET_ACTIVE_ROUTE(state, action) {
    const { route: activeRoute } = action.payload
    return {...state, activeRoute }
  },
  SET_MATCH_ROUTES(state, action) {
    const { matchRoutes } = action.payload
    return {...state, matchRoutes}
  }
}, initState)

