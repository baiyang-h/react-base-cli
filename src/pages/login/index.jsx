import React from 'react'
import { withRouter } from "react-router";
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form, Input, Button, message } from 'antd';
import { setToken } from "@/libs/token";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { request_login } from "@/services/user";
import { loginActions } from '@/store/modules/user/reducer'

import './index.scss'

// 类型判断
Login.propTypes = {
  loginActions: PropTypes.func,
  history: PropTypes.object
}

function Login(props) {

  // 登录
  const onFinish = async userInfo => {
    let { data } = await request_login(userInfo)
    if(data.success) {
      let token = data.data.token
      // 1. 在 cookie 中设置 token   2. reducer 中保存 token
      setToken(token);
      props.loginActions({ token })
      props.history.replace('/')
    } else {
      message.error(data.message);
    }
  };

  return <div className='login-container'>
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="admin | user" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form.Item>
    </Form>
  </div>;
}


const mapDispatchToProps = {
  loginActions
}

export default connect(null, mapDispatchToProps)(withRouter(Login))
