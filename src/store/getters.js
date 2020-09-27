import { namespace as appNamespace } from './modules/app/reducer'
import { namespace as userNamespace } from './modules/user/reducer'

// app
export const getterActiveRoute = state => state[appNamespace].activeRoute                       // 每次 active 路由
export const getterMatchRoutes= state => state[appNamespace].matchRoutes                         // 当前选中的路由 匹配的 match

// user
export const getterToken = state => state[userNamespace].token
export const getterRoles = state => state[userNamespace].roles
export const getterAdmin = state => state[userNamespace].admin
