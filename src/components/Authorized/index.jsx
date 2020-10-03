import React from "react";
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom';
import { getterRoles } from "@/store/getters";
import { checkHasPermission } from '@/libs/method'

const AuthorizedRoute = props => {
  // authority: 菜单/路由中设置的值，roles: 后台返回的角色信息
  const { component: Component, authority, roles, ...args } = props
  let hasPermission = checkHasPermission(authority, roles);
  return (
    <Route {...args} render={props => {
      return hasPermission ? <Component {...props} /> : <Redirect to='/403' />
    }} />
  )
}

const mapStateToProps = state => ({
  roles: getterRoles(state)
})

export default connect(mapStateToProps)(AuthorizedRoute)
