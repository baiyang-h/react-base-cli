import React from 'react'
import { useHistory } from 'react-router';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Layout, Button, Modal } from 'antd';
import { removeToken } from "@/libs/token";
import { loginOutActions } from '@/store/modules/user/reducer'
import './index.scss'

const { Header } = Layout;

_Header.propTypes = {
  loginOutActions: PropTypes.func // 退出
}

function _Header(props) {

  const history = useHistory(); 

  // 登出到登录页，1. 清除相应 token，2. 清除相应 stroe，3. 跳转到 login 页
  const loginOut = () => {

    Modal.warning({
      title: '此操作将退出，您确定要退出吗？',
      onOk() {
        removeToken()
        props.loginOutActions()
        history.push('/login')
      }
    });
  }

  return <Header className="site-layout-sub-header-background" style={{ padding: 0 }}>
    <Button type="link" className="login-out" onClick={ loginOut }>退出</Button>
  </Header>
}

const mapDispatchToProps = {
  loginOutActions
}

export default connect(null, mapDispatchToProps)(_Header)