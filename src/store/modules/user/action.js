import { createActions } from 'redux-actions';

export const {
  dispatchLogin,
  login,
  dispatchGetInfo,
  getInfo,
  dispatchLoginOut,
  loginOut
} = createActions({
    // 登录
    LOGIN: token => ({ token }),
    // 获取用户信息
    GET_INFO: ({ roles, admin }) => ({ roles, admin}),
  },
  'DISPATCH_LOGIN',
  'DISPATCH_GET_INFO',
  'DISPATCH_LOGIN_OUT',
  'LOGIN_OUT',
);
