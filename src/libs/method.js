import { join } from 'path'

// reducer 中是名字 增加上 namespace 命名空间
export const resolveReducerName = (namespace, name) => join(namespace.toUpperCase(), '/', name)

/* ============================== 菜单部分  ============================= */
/**
 * @description 根据登录信息的权限，来得到路由是否有权限
 * @param authority: Array|undefined    菜单/路由 手动设置的自定义权限列表 ['admin', 'user'], undefined没设置权限控制，表示都有权限
 * @param roles: Array      用户登录获取到的用户信息，含角色权限信息
 * @return {boolean}   true 表示有权限， false  无权限
 */
export const checkHasPermission = (authority, roles) => {
  let hasPermission = false;
  // 如果角色是超级管理员直接都可以访问
  if(roles.includes('admin')) {
    return true
  }
  if(!authority) {
    hasPermission = true
  } else {
    roles.forEach(role => {
      if(authority.includes(role)) {
        hasPermission = true
      }
    })
  }
  return hasPermission
}

// 返回一个布尔，是否有子菜单， true：Submenu，false：Item
export const isSubMenuOrItem = menuItem => !!menuItem.children
