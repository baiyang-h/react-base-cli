import axios from "axios";
import { message } from "antd";
import { removeToken } from './token'
import { loginOutActions } from '@/store/modules/user/reducer'
import history from '@/router/history'

const errorHandle = r => {
  if (r.status) {
    switch (r.status) {

      case 304:
        // ...
        break;

      // 401: 未登录
      // 未登录则跳转登录页面，并携带当前页面的路径
      // 在登录成功后返回当前页面，这一步需要在登录页操作。
      case 401:
        history.replace('/')
        break;

      // 403 token过期
      // 登录过期对用户进行提示
      // 清除本地token和清空vuex中token对象
      // 跳转登录页面
      case 403:
        message.error('登录过期，请重新登录');
        // 清除token
        removeToken();
        // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
        loginOutActions()
        setTimeout(() => {
          history.replace('/login')
        }, 1000);
        break;

      // 404请求不存在
      case 404:
        message.error('网络请求不存在');
        break;
      // 其他错误，直接抛出错误提示
      case 500:
        // ...
        break;
      default:
        message.error(r.data.message)
    }
  }
}

console.log(process.env);
/*
if (process.env.NODE_ENV == 'development') {    
  axios.defaults.baseURL = 'https://www.baidu.com';} 
else if (process.env.NODE_ENV == 'debug') {    
  axios.defaults.baseURL = 'https://www.ceshi.com';
} 
else if (process.env.NODE_ENV == 'production') {    
  axios.defaults.baseURL = 'https://www.production.com';
}
*/
const service = axios.create({
  // baseURL: process.env.REACT_APP_A,    // url = base url + request url
  timeout: 10000,
  headers: {
    post: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  },
});

service.interceptors.request.use(
  function (config) {
    // 每次发送请求之前可以判断是否存在 token
    // 如果存在，则统一在 http 请求的header都加上 token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    /*
    const token = store.state.token;        
    token && (config.headers.token = token);  
    */
    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  // 响应 20x 成功的走这里
  function (response) {
    // ...

    /*
    1. 可以处理好 response 返回数据 ， return response.data  直接处理好返回数据
    2. 可以根据你想要的需求做拦截判断
      if (response.data.code === 300) {
        message.error(response.data.msg)
        return Promise.reject(response)
      } 
  */
    return response;
  },
  // 响应 3xx、4xx、5xx 等 走这里
  function (error) {
    // error.response  可以获取到 错误的res

    const { response } = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围
      // errorHandle(response);
      return Promise.reject(response);
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      if (!window.navigator.onLine) {
        // store.commit("changeNetwork", false);
        alert('网络加载中')
      } else {
        return Promise.reject(error);
      }
    }
  }
);

// 简易版 post 请求
export const basePost = (url, data) => {
  return service({
    method: "post",
    url,
    data,
  });
};

export default service;
