/*
@description：该文件表示的就是项目的菜单，通过该文件来配置菜单项目。
  1. 对于不是菜单的路由，不是菜单的路由，或者不显示主菜单的子菜单，直接在路由文件中配置就行。该文件只配置主菜单相关的信息。
  2. 对于不在菜单上显示的 菜单子模块信息， 使用 hidden 属性配置， 比如 /app/table/1  不显示菜单， 因为存在 matches ，一些不显示的菜单子路由，但是需要知道他的matches
  3. 记得 菜单上配置好了，相关的 路由在 路由配置文件中配置好

{
  title: String         菜单标题
  path: String          菜单路径
  name: String          菜单别名
  icon: String          菜单图标
  hidden: Boolean 或 无该属性。   true 时隐藏菜单，否则显示
  authority: Array       ['admin', 'user'],  权限信息
      在路由配置中，只有没有设置 `authority` 属性 或者 `authority` 不是 `admin` 的时候才需要做权限验证。


  // 该项目 只是做一个简单的魔板，所以暂时 meta 部分 的 affix、noCache 不做， 只到缓存
  meta: {
    去掉了：isSubmenu: Boolean    是否是多级菜单，即是否有子菜单，true是，false不是， 改为了通过children来表示是否有子菜单
    affix: Boolean        是否在tagsView中默认永远显示，不被删除， 如：让首页默认显示
    noCache: Boolean      如果设置为true，则表示不需要缓存。主要用于tagsView中，用户缓存。  如果不设置或者false，因为keep-alive的原因会缓存。。
  }
}
*/

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
