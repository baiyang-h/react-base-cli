import { handleActions } from 'redux-actions'

export const namespace = 'permission'

const initState = {
  // 所有路由 (展开)
  routes: [],
  // 有权限判断部分的路由
  menuRoutes: [],
};

export const permissionReducer = handleActions({

}, initState)
