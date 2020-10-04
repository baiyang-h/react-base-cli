import React from "react";
import { useLocation, useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Layout, Menu } from 'antd';
import { menuData, getMatchRoutes } from '@/router'
import { connect } from 'react-redux'
import { checkHasPermission, isSubMenuOrItem } from '@/libs/method'
import { getterRoles } from "@/store/getters";

import './index.scss'

const { Sider } = Layout;
const { SubMenu } = Menu;

SiderComponent.propTypes = {
  roles: PropTypes.array,         // 角色信息
}

function SiderComponent(props) {

  const { roles } = props
  const location = useLocation(); 
  const history = useHistory(); 

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

  // 获取Icon
  const getIcon = menuItem => menuItem.icon ? <menuItem.icon /> : null

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

  // filter 处理后 已经是 经过 权限后 得到要显示的菜单
  const getNavMenuItems = menuData => menuData.map(menuItem => getSubMenuOrItem(menuItem))

  const handleClickMenuItem = ({ item, key, keyPath, domEvent }) => {
    history.push(key)
  }

  // 默认展开项
  const defaultSelectedKeys = getMatchRoutes(location.pathname).map(match => match.path)

  return (
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
  );
}

const mapStateToProps = state => {
  return {
    roles: getterRoles(state)
  }
}

export default connect(mapStateToProps)(SiderComponent);
