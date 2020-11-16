import { dynamicWrapper } from './util'

// import tableRouter from "./modules/table";
// import formRouter from "./modules/form";
// import nestedRouter from "./modules/nested";
// import errRouter from "./modules/err";

// 常量路由
export const constantRouters = [
  {
    title: 'Login',
    path: '/login',
    name: 'Login',
    component: dynamicWrapper(() => import('@/pages/login'))
  },
  // Error
  {
    title: '403',
    path: '/403',
    name: '403',
    component: dynamicWrapper(() => import('@/pages/error-page/403'))
  },
  {
    title: '404',
    path: '/404',
    name: '404',
    component: dynamicWrapper(() => import('@/pages/error-page/404'))
  },
  {
    title: '500',
    path: '/500',
    name: '500',
    component: dynamicWrapper(() => import('@/pages/error-page/500'))
  }
]

// app应用 菜单路由
export const appRouters = [
  // Home
  {
    path: '/home',
    name: 'Home',
    component: dynamicWrapper(() => import('@/pages/home'))
  },

  // Permission
  {
    path: '/permission/page',
    component: dynamicWrapper(() => import('@/pages/permission/page'))
  },
  {
    path: '/permission/role',
    component: dynamicWrapper(() => import('@/pages/permission/role'))
  },

  // Table
  {
    path: '/table',
    component: dynamicWrapper(() => import('@/pages/table'))
  },

  // Form
  {
    path: '/form',
    component: dynamicWrapper(() => import('@/pages/form'))
  },

  // Nested
  {
    path: '/nested/menu1/menu1-1',
    component: dynamicWrapper(() => import('@/pages/nested/menu1/menu1-1'))
  },
  {
    path: '/nested/menu1/menu1-2/menu1-2-1',
    component: dynamicWrapper(() => import('@/pages/nested/menu1/menu1-2/menu1-2-1'))
  },
  {
    path: '/nested/menu1/menu1-2/menu1-2-2',
    component: dynamicWrapper(() => import('@/pages/nested/menu1/menu1-2/menu1-2-2'))
  },
  {
    path: '/nested/menu1/menu1-3',
    component: dynamicWrapper(() => import('@/pages/nested/menu1/menu1-3'))
  },
  {
    path: '/nested/menu2',
    component: dynamicWrapper(() => import('@/pages/nested/menu2'))
  },
  // Error
  {
    path: '/test',
    component: dynamicWrapper(() => import('@/pages/test'))
  },
]

export default [...constantRouters, ...appRouters]
