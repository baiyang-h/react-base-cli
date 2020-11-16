import request, { basePost } from '@/libs/request'

// 登录，获取token
export const request_err404 = data => basePost('/err/404', data);

// 通过获取用户信息
export const request_err500 = config => request({
  url: '/err/500',
  method: 'post',
  ...config
});
