import axios from "axios";
import errorHandle from './error'

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
        console.log('request', config)
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
        console.log('error', error, error.response)

        const { response } = error;
        if (response) {
            // 请求已发出，但是不在2xx的范围
            errorHandle(response);
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
export const basePost = (url, data, config={}) => {
    return service({
        method: "post",
        url,
        data,
        ...config
    });
};

export default service;
