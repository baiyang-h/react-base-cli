import React, { useEffect } from 'react';
import { Switch, Route, Redirect, useHistory, useLocation } from 'react-router-dom'
import { message } from 'antd';
import PropTypes from 'prop-types'
import {getToken, removeToken} from "@/libs/token";
import path from 'path'
import { connect } from 'react-redux'
import { baseName, renderConstantRouters } from './router'
import './App.scss'
import { setUserActions, loginOutActions } from '@/store/modules/user/reducer'
import { getterRoles } from "./store/getters";
import { request_getInfo } from "@/services/user";

import Layout from './layout'
import Loading from '@/components/Loading'

App.propTypes = {
  roles: PropTypes.array,         // 角色信息
  setUserActions: PropTypes.func, // 设置用户信息
  loginOutActions: PropTypes.func // 退出
}

function App(props) {
  
  const { roles, setUserActions, loginOutActions } = props

  const location = useLocation(); 
  const history = useHistory(); 
  
  // 登出到登录页，1. 清除相应 token，2. 清除相应 stroe，3. 跳转到 login 页
  const __loginOut = () => {
    removeToken()
    loginOutActions()
    history.push('/login')
  }
  

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  // 即如果没有角色信息的话，不进行渲染，要等到获取到用户信息，才进行渲染
  if(!roles.length && location.pathname !== '/login') return <Loading />

  return (
    <div className="App">
      <Switch>
        <Route exact path='/' render={() => <Redirect to={path.join(baseName, '/home')} /> }  />
        { renderConstantRouters() }
        <Route  path={ baseName } component={ Layout } />
        <Route  path='*' render={() => <Redirect to='/404' /> }  />
      </Switch>
    </div>
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
