# react-base-cli



## 分析 Bundle (包) 大小


```bash
npm install --save source-map-explorer
yarn add source-map-explorer
```
```json
"scripts": {
+    "analyze": "source-map-explorer build/static/js/main.*",
     "start": "react-scripts start",
     "build": "react-scripts build",
     "test": "react-scripts test",
```
然后分析 bundle(包) 运行生产构建然后运行分析脚本。
```bash
npm run build
npm run analyze
```




## @craco/craco


如果我们不想在暴露 webpack 配置文件的情况下，来修改项目的一些配置，那么我们需要下载 [`@craco/craco`](https://www.npmjs.com/package/@craco/craco#configuration-overview) 模块，来配置一个 `_craco.config.js_` 文件进行配置。
```bash
yarn add @craco/craco
```


## create-react-app脚手架中配置webpack的方法


使用 `npm run eject `暴露 webpack 配置文件，进行配置
```bash
npm run eject
```
如可以在项目目录中配置如下文件
```javascript
const path = require('path')
const mockServer = require('./mock/mock-server')
const sassResourcesLoader = require('craco-sass-resources-loader');

module.exports = {
    plugins: [
        {
            plugin: sassResourcesLoader,
            options: {
                resources: [
                    path.resolve(__dirname, './src/styles/common/variable.scss'),
                    path.resolve(__dirname, './src/styles/common/mixin.scss'),
                ],
            },
        },
    ],
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        },
        plugins: [],
        configure: {  },
        // configure: (webpackConfig, { env, paths }) => {
        //     console.log(webpackConfig)
        //     return webpackConfig;
        // }
    },
    devServer: {
        before: function(app) {
            mockServer(app)
        },
        proxy: {
            '/base-cli': {
                target: 'http://www.wttx56.com/mock/257',
                // ws: false,
                changeOrigin: true,
                pathRewrite: {
                    // '^/api/old-path': '/api/new-path', // rewrite path
                    // '^/api/remove/path': '/path', // remove base path
                },
                router: {
                    // 'dev.localhost:3000': 'http://localhost:8000',
                },
            }
        }
    },
}
```
使用 [`sassResourcesLoader`](https://github.com/tilap/craco-sass-resources-loader) 依赖，来配置 sass 全局变量。


## 装饰器


```bash
npm install @babel/plugin-proposal-decorators -S
```


## 样式相关


### 局部样式和全局样式


局部样式，需要使用 `import from` 导入
```css
// a.module.css   
.a {
  color: chartreuse;
}
```
全局样式，直接通过 `import` 引入
```css
.a {
  font-style: italic;
}
```
```jsx
import React from "react";
import styles from '@/styles/a.module.css'   // 局部
import '@/styles/a.css'   // 全局

function Home() {
  console.log(styles)   // { a: xx }
  return <div>
    <h1 className='a'>Home</h1>
    <div className={styles.a}>styles</div>
  </div>
}

export default Home
```
不会和其他 `.a` 类名冲突，局部样式是 `{a: "a_a__2Gw1k"}`，会自动转义成如下类名。
```jsx
<div class="a_a__2Gw1k"></div>
```


### sass 和 less 的局部、全局配置


```css
// b.module.scss

.b {
  background: antiquewhite;
}
.bb {
  background: red;
}
```
```css
// b.module.scss

.b {
  text-decoration: underline;
}
```
```jsx
import React from "react";
import _scss from '@/styles/b.module.scss'   // 局部
import '@/styles/b.scss'  // 全局

function Home() {
  console.log(styles, _scss)
  return <div>
    <h1 className='a b'>Home</h1>
    <div className={_scss.dd}>123</div>
  </div>
}

export default Home

```
如果想设置全局的 sass 样式，我能够在任何文件中直接使用的话，我们需要下载一个 `sass-resources-loader` 模块。
```bash
npm i sass-resources-loader
```
```css
// variable.scss

$orange: orange;
```
```css
// mixin.scss

@mixin test($color: red) {
  border: 3px solid $color;
  background: red;
}
```
在webpack中配置
```javascript
{
  test: /\.scss$/,
    use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader'
      }, {
        loader: 'sass-loader'
      },{
        loader: 'sass-resources-loader',
        options: {
          resources: [
            // resolve方法第二个参数为scss配置文件地址，如果有多个，就进行依次添加即可
            path.resolve(__dirname, './../src/assets/scss/output.scss')
          ]
        }
      }
    ]
}
```
在 react-create-app 中 直接如下设置
```javascript
if (preProcessor) {
  loaders.push(
    {
      loader: require.resolve('resolve-url-loader'),
      options: {
        sourceMap: isEnvProduction && shouldUseSourceMap,
      },
    },
    {
      loader: require.resolve(preProcessor),
      options: {
        sourceMap: true,
      },
    },
    {
      loader: 'sass-resources-loader',
      options: {
        resources: [
          path.resolve(__dirname, './../src/styles/common/variable.scss'),
          path.resolve(__dirname, './../src/styles/common/mixin.scss'),
        ],
      }
    }
  );
}
```


## React Router


安装相关依赖
```bash
npm i react-router react-router-dom -S
```
```jsx
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
```
```jsx
<div className="App">
  <Switch>
    <Route exact path='/' render={() => <Redirect to={path.join(baseName, '/home')} /> }  />
    { renderConstantRouters() }
    <Route  path={ baseName } component={ Layout } />
    <Route  path='*' render={() => <Redirect to='/404' /> }  />
  </Switch>
</div>
```


## Redux 状态管理


安装相关依赖
```bash
npm install react-redux redux redux-thunk redux-promise redux-actions -S
```
核心文件 `store/index.js` , 注意 注册 `reduxDebug` 使 谷歌插件 可以使用 redux 工具。
```javascript
/**
 * 状态管理
 */
import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
// import createSagaMiddleware from 'redux-saga'
// import { all } from 'redux-saga/effects'
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';

// import userSaga  from './modules/user/saga'

import { namespace as appNamespace, appReducer } from './modules/app/reducer'
import { namespace as userNamespace, userReducer } from './modules/user/reducer'

const reducers = combineReducers({
  [appNamespace]: appReducer,
  [userNamespace]: userReducer
})

// 浏览器redux查看插件
const reduxDebug = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f

/*
compose(fn1, fn2):
  ƒ () {
    return a(b.apply(void 0, arguments));
  }
*/

// export const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducers,
  compose(
    applyMiddleware(
      thunkMiddleware,
      promiseMiddleware,
      /*sagaMiddleware*/
    ),
    reduxDebug
  )
)

// export function* rootSaga() {
//   yield all([
//     ...userSaga,
//   ])
// }

// sagaMiddleware.run(rootSaga);

export default store
```
getters 对于 相应 state 的值得返回函数
```javascript
import { namespace as appNamespace } from './modules/app/reducer'
import { namespace as userNamespace } from './modules/user/reducer'

// app
export const getterActiveRoute = state => state[appNamespace].activeRoute                       // 每次 active 路由
export const getterMatchRoutes= state => state[appNamespace].matchRoutes                         // 当前选中的路由 匹配的 match

// user
export const getterToken = state => state[userNamespace].token
export const getterRoles = state => state[userNamespace].roles
export const getterAdmin = state => state[userNamespace].admin
```
`reducer` 这里只写一个 user 例子，使用 `redux-actions` 做处理，直接在里面写了 Action 函数。简单举一例子：

1. `LOGIN` 常量 最后会得到是命名空间下的路径（`'USER/LOGIN'`）
1. `loginActions` 是一个函数，他会在需要的页面中通过 `props.loginActions(param)` 来触发 `dispatch` 发送一个 `action`。其中 `action` 的 `type` 就是 `createAction(LOGIN)` 的 `LOGIN` 常量，即上面的常量值。
1. `reducer` 函数中的 `[loginActions]` 最终会被处理成 `LOGIN` 常量的值。
```javascript
import {handleActions, createAction} from "redux-actions";
import { getToken } from '@/libs/token'
import { resolveReducerName } from '@/libs/method'

export const namespace = 'user';

const LOGIN = resolveReducerName(namespace, 'LOGIN')
const SET_USER = resolveReducerName(namespace, 'SET_USER')
const LOGIN_OUT = resolveReducerName(namespace, 'LOGIN_OUT')

// Action Creators
export const loginActions = createAction(LOGIN)
export const setUserActions = createAction(SET_USER)
export const loginOutActions = createAction(LOGIN_OUT)

const initState = {
  token: getToken(),
  roles: [],
  admin: {}
};

export const userReducer = handleActions({
  [loginActions](state, action) {
    const { token } = action.payload
    return { ...state, token }
  },
  [setUserActions](state, action) {
    const { roles, admin } = action.payload
    return {
      ...state,
      roles,
      admin
    }
  },
  [loginOutActions](state, action) {
    console.log(23234)
    return {
      token: null,
      roles: [],
      admin: {}
    }
  }
}, initState)
```
App.js 中调用触发 action
```javascript
function App(props){
  
  console.log(props.roles)  // 获取 redux 中的 roles
  
  ......
  // 触发 dispatch 发送一个 action
  props.setUserActions({
    roles: data.data.roles,
    admin: data.data
  })
  ......
}

const mapStateToProps = state => {
  return {
    roles: getterRoles(state)
  }
} 
  
const mapDispatchToProps = {
  setUserActions,
  loginOutActions
}

connect(mapStateToProps, mapDispatchToProps)(App);
```


## redux-saga


## browserslist 浏览器兼容配置


推荐使用在 `package.json` 设置，也可以使用一个 `.browserslistrc` 文件配置。
```json
"browserslist": {
  "production": [
    ">0.2%",
    "not dead",
    "not op_mini all"
  ],
  "development": [
    "last 1 chrome version",
    "last 1 firefox version",
    "last 1 safari version"
  ]
},
```


## webpack配置


### alias


别名
```javascript
'@': path.resolve(__dirname, '../src'),
```


## 跨域部分


### 1. 在webpack中跨域


使用 `yarn eject` 命令 将react-scripts中一些重要的配置文件弹射出来，然后对文件`config/webpackDevServer.js` 文件的 `poxy` 选项进行配置更改 
```javascript
proxy:{
  "/api":{
    target:"http://47.96.0.211:9000",
      changeOrigin:true,
        pathRewrite:{
          "^/api":""
        }
  }
},
```


### 2. http-proxy-middleware解决跨域


```bash
$ npm install http-proxy-middleware --save
$ # 或
$ yarn add http-proxy-middleware
```
接下来，创建 `src/setupProxy.js` 并将以下内容放入该文件中：
```javascript
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // app.use(proxy('/api', { target: 'http://localhost:5000/' }));
  app.use('/base-cli', createProxyMiddleware({ 
    target: 'http://www.wttx56.com/mock/257',
    changeOrigin: true,
    pathRewrite: {
      // '^/api/old-path': '/api/new-path', // rewrite path
      // '^/api/remove/path': '/path', // remove base path
    },
    router: {
      // when request.headers.host == 'dev.localhost:3000',
      // override target 'http://www.example.org' to 'http://localhost:8000'
      // 'dev.localhost:3000': 'http://localhost:8000',
    },
  }));
};
```


### 3. 在package.json中配置


增加下面属性
```javascript
"proxy": "http://localhost:4000",
```


## 路由


与路由相关的主要有两处地方，1. 菜单，2. 路由配置。


### menu.config.js


对于菜单的配置，将其写在 `menu.config.js` 文件中
```javascript
const menuConfig = [
  {
    title: '首页',
    path: 'home',
    name: 'Home',
    icon: '',
  },
  {
    title: 'Permission',
    path: 'permission',
    name: 'Permission',
    icon: '',
    // authority: ['admin', 'user'],
    children: [
      {
        title: 'Page Permission',
        path: 'page',
        name: 'PagePermission',
      },
      {
        title: '角色管理',
        path: 'role',
        name: 'RolePermission',
        authority: ['admin'],
      }
    ]
  },
  {
    title: 'Table',
    path: 'table',
    name: 'Table',
    icon: '',
  },
  {
    title: 'Form',
    path: 'form',
    name: 'Form',
    icon: '',
  },
  {
    title: '路由嵌套',
    path: 'nested',
    name: 'Nested',
    icon: '',
    children: [
      {
        title: '菜单 1',
        path: 'menu1',
        name: 'Menu1',
        children: [
          {
            title: '菜单 1-1',
            path: 'menu1-1',
            name: 'Menu1-1',
          },
          {
            title: '菜单 1-2',
            path: 'menu1-2',
            name: 'Menu1-2',
            children: [
              {
                title: '菜单 1-2-1',
                path: 'menu1-2-1',
                name: 'Menu1-2-1',
              },
              {
                title: '菜单 1-2-2',
                path: 'menu1-2-2',
                name: 'Menu1-2-2',
              }
            ]
          },
          {
            title: '菜单 1-3',
            path: 'menu1-3',
            name: 'Menu1-3',
          }
        ]
      },
      {
        title: '菜单 2',
        path: 'menu2',
        name: 'Menu2',
      }
    ]
  }
]

export default menuConfig
```

1. 对于不是菜单的路由，或者不显示主菜单的子菜单，可以直接在路由文件配置就行，或者在该菜单配置上增加 `hidden: true` 属性。
1. 对于不在菜单上显示的菜单子模块信息，使用 hidden 属性配置，比如 `/app/table/1` 不显示菜单，因为存在 matches，一些不显示的菜单子路由，但是需要知道他的 matches。
1. 记得菜单上配置好了，相关的路由还需要在配置文件中配置一下。



一般我们会有以下几种属性
```json
{
  title: String         菜单标题
  path: String          菜单路径
  name: String          菜单别名
  icon: String          菜单图标
  hidden: Boolean 或 无该属性。   true 时隐藏菜单，否则显示
  authority: Array       ['admin', 'user'],  权限信息
      在路由配置中，只有没有设置 `authority` 属性 或者 `authority` 不是 `admin` 的时候才需要做权限验证。


  // 该项目 只是做一个简单的魔板，所以暂时 meta 部分 的 affix、noCache 不做， 
  meta: {
    去掉了：isSubmenu: Boolean    是否是多级菜单，即是否有子菜单，true是，false不是， 改为了通过children来表示是否有子菜单
    affix: Boolean        是否在tagsView中默认永远显示，不被删除， 如：让首页默认显示
    noCache: Boolean      如果设置为true，则表示不需要缓存。主要用于tagsView中，用户缓存。  如果不设置或者false，因为keep-alive的原因会缓存。。
  }
}
```


### router.config.js


将路由分为了常量路由和应用路由，常量路由就类似于 Login、404、403 等，这些不需要权限验证的，开始就直接注册的路由，而应用路由就是指菜单部分的应用路由。
```javascript
import { dynamicWrapper } from './util'

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
]

export default [...constantRouters, ...appRouters]
```
封装了 `dynamicWrapper` 进行路由懒加载。
```javascript
// 路由懒加载
export const dynamicWrapper = loader => {
  return Loadable({
    loader,
    loading: Loading
  })
}
```


### 路由核心文件


`router/index.js` 其中定义了一些需要用到的常用变量和方法
```javascript
// 对于应用 app 的公共前缀
export const baseName = '/app'

// 处理过的所有菜单信息 1. path都改为了新增 baseName 前缀的绝对路径，对本是 url 的 path 不变， 2. 如果子路由没有 authority 会根据父级，除非自己写了 authority 权限
export const menuData = formatterMenu(__menuConfig, baseName)

// 拉平菜单  对树形菜单拉平，进行扁平化
export const flatMenuData = getFlatData(menuData)

/*
处理所有 App 应用路由信息， 生成新的 应用 routers
1. 修改 path，补齐，重写
2. 重写 name，如果 router.confis.js 配置有则用菜单配置，否则使用 menu.confis.js，都没有 undefined
3. 重写 title，如果 router.confis.js 配置有则用菜单配置，否则使用 menu.confis.js，都没有 undefined
4. 重写 authority，如果 router.confis.js 配置有则用菜单配置，否则使用 menu.confis.js，都没有 undefined
*/
export const appRouterData = ......

// 对于当前路径，返回所有匹配的菜单 matches， 
export function getMatchRoutes(path) {...}

// 渲染生成所有常量路由 <Route> 方法 ， 用于外部调用的是下面的 renderConstantRouters
const __renderConstantRouters = ......

// 渲染生成所有 App 应用路由 <Route> 方法，  用于外部调用的是下面的 renderAppRoutes
const __renderAppRoutes = ......

// 上面两个方法 实际真正暴露出去的方法
export const renderConstantRouters = () => {
  return __renderConstantRouters(constantRouters)
}
export const renderAppRoutes = () => {
  return __renderAppRoutes(appRouterData)
}
```


## App初始化项目


我们在 App.js 文件中调用 `renderConstantRouters()` 方法进行常规路由的渲染。
```jsx
<Switch>
  <Route exact path='/' render={() => <Redirect to={path.join(baseName, '/home')} /> }  />
  { renderConstantRouters() }
  <Route  path={ baseName } component={ Layout } />
  <Route  path='*' render={() => <Redirect to='/404' /> }  />
</Switch>
```
 同时我们需要对 `location.pathname` 的路径名字改变而触发 `useEffect` 函数，进行重新计算
```javascript
useEffect(() => {
  const token = getToken();
  if(token) {
    if(location.pathname === '/login') {
      history.replace('/')
    } else {
      // 是否有登录角色
      const hasRoles = roles && roles.length > 0
      if(!hasRoles) {
        // 获取用户信息
        request_getInfo(token).then(r => {
          let { data } = r
          if(data.success) {
            setUserActions({
              roles: data.data.roles,
              admin: data.data
            })
          } else {
            message.error(data.message);
          }
        }).catch(e => {
          message.error(e);
          __loginOut()
        })
      }
    }
  } else {
    if(location.pathname !== '/login') {
      __loginOut()
    }
  }
}, [location.pathname])
```

1. 获取 token，如果没有 token 的话，则重新到 login 页，进行重新账号登录
1. 如果有 token 的话，
   1. 是否还是login页，如果是的话，则重定向到 `/`
   1. 如果不是，则是否有 roles 角色，如果无角色信息则 发送请求 获取用户信息，将角色信息、用户信息存储到 redux 中





## Layout 应用部分


通过 `renderAppRoutes()` 方法 来定义上 Route 标签， 根据 应用 路由来进行渲染
```jsx
<Layout>
  <MySider />
  <Layout>
    <MyHeader />
    <Content style={{ margin: '24px 16px 0' }}>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        <Switch>
          { renderAppRoutes().concat(<Route path='*' key={404} render={() => <Redirect to='/404' /> }  />) }
        </Switch>
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>
</Layout>
```


## 权限部分


权限部分，只要分为 菜单显示部分和路由部分


### 菜单权限


```javascript
/**
   * @description 根据角色信息和本地静态菜单进行处理，返回所有有权限的、并且要显示的菜单
   *    1. 首先查看菜单是否有 hidden 属性和 根据 roles checkHasPermission来判断是否有权限的菜单
   *    2. 如果主菜单有权限，那么再递归对子菜单进行同样的遍历处理
   *    3. 如果子菜单 children 为0， 则主菜单也不显示，如果子菜单全部都是 hidden: true 或者 没有权限，即最后 children 为 0， 则主菜单也不显示
   * @param {*} menuData 自定义本地所有菜单
   */
const getPermissionNavMenu = (menuData=[]) => {
  return menuData.filter(menuItem => {
    if(!menuItem.hidden && checkHasPermission(menuItem.authority, roles)) {
      if(menuItem.children) {
        if(menuItem.children.length) {
          let childMenuItems = getPermissionNavMenu(menuItem.children)
          if(childMenuItems.length) {
            menuItem.children = childMenuItems
            return true
          } else {
            return false
          }
        } else {
          return false
        }
      } else {
        return true
      }
    } else {
      return false
    }
  })
}
```
调用 `getPermissionNavMenu()` 来对 `menuData` 菜单配置中的数据进行权限处理，返回的有权限的菜单。通过 `checkHasPermission()` 方法来进行权限验证。
```javascript
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
```
通过下面的方法来判断是否是 Submenu 还是 Menu 
```javascript
const getNavMenuItems = menuData => menuData.map(menuItem => getSubMenuOrItem(menuItem))

// 判断是 SubMenu 还是 Item， 返回相应的 菜单组件
const getSubMenuOrItem = menuItem => {
  if(isSubMenuOrItem(menuItem)) {
    return <SubMenu
    key={menuItem.path}
    icon={getIcon(menuItem)}
    title={menuItem.title}
    >
      {getNavMenuItems(menuItem.children)}
        </SubMenu>
      } else {
        return <Menu.Item
        key={menuItem.path}
        icon={getIcon(menuItem)}
          >
              { menuItem.title }
        </Menu.Item>
      }
  }
```
最后渲染
```jsx
<Sider>
      <div className="logo" />
      <Menu 
        theme="dark" 
        mode="inline" 
        defaultSelectedKeys={defaultSelectedKeys}
        defaultOpenKeys={defaultSelectedKeys}
        onClick={handleClickMenuItem}
      >
        { getNavMenuItems(getPermissionNavMenu(menuData)) }
      </Menu>
    </Sider>
```
