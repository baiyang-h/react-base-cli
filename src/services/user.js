import request, { basePost } from '@/libs/request'

// 登录，获取token
export const request_login = data => basePost('/user/login', data);

// 通过获取用户信息
export const request_getInfo = token => request({
  url: '/user/info',
  method: 'get',
  params: { token }
});

// 测试接口
export const request_test = data => basePost('/base-cli/aaa', data);
