import React from 'react';
import { Route } from 'react-router-dom'
import { constantRouters, appRouters } from './router.config'
import __menuConfig from './menu.config'
import {join} from "path";
import { formatterMenu, getFlatData } from './util'
import AuthorizedRoute from '@/components/Authorized'

// 对于应用 app 的公共前缀
export const baseName = '/app'

// 处理过的所有菜单信息 1. path都改为了新增 baseName 前缀的绝对路径，对本是 url 的 path 不变， 2. 如果子路由没有 authority 会根据父级，除非自己写了 authority 权限
export const menuData = formatterMenu(__menuConfig, baseName)

// 拉平菜单
export const flatMenuData = getFlatData(menuData)

// 处理过的所有 App 应用路由信息
export const appRouterData = appRouters.map(router => {
  const path = join(baseName, router.path)
  /*
  1. 菜单路径和路由路径相匹配 得到菜单信息。
  2. 不匹配 {}
  */
  const menuItem = flatMenuData.find(item => {
    return item.path === path
  }) || {};
  return {
    ...router,
    path,
    name: router.name || menuItem.name,
    title: router.title || menuItem.title,
    authority: router.authority || menuItem.authority,
  }
})

// 对于当前路径，返回所有匹配的菜单 matches， 
// 因为如果是没有权限的菜单，直接就是 403 了，所以执行 __recursive(menuData) 就不改了， 按理这个 menuData 应该是做过处理后的有权限菜单，不能是初始化时静态写死的菜单
export function getMatchRoutes(path) {
  let matches = [];
  const __recursive = data => {
    data.forEach(menuItem => {
      // 有匹配
      if(path.indexOf(menuItem.path) !== -1) {
        matches.push(menuItem)
        if(menuItem.children) {
          __recursive(menuItem.children)
        }
      }
    })
  }
  __recursive(menuData)
  return matches
}

// 渲染生成所有常量路由 <Route> 方法 ， 用于外部调用的是下面的 renderConstantRouters
const __renderConstantRouters = (routes=[]) => routes.map(
  route => <Route 
    path={route.path} 
    key={route.path} 
    exact
    render={ () => <route.component /> } 
  />
)

// 渲染生成所有 App 应用路由 <Route> 方法，  用于外部调用的是下面的 renderAppRoutes
const __renderAppRoutes = (routes=[]) => routes.map(
  route => <AuthorizedRoute
    exact
    path={ route.path }
    key={ route.path }
    authority={ route.authority }
    component={route.component}
  />
)

export const renderConstantRouters = () => {
  return __renderConstantRouters(constantRouters)
}

export const renderAppRoutes = () => {
  return __renderAppRoutes(appRouterData)
}
