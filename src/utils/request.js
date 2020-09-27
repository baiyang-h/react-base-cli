import axios from 'axios';

const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 10000,
  headers: {
    post: {
      'Content-Type': "application/json;charset=UTF-8"
    }
  }
});

service.interceptors.request.use(function (config) {

  return config;
}, function (error) {
  console.log(error);
  return Promise.reject(error);
});

service.interceptors.response.use(function (response) {

  return response;
}, function (error) {
  console.log(error);
  return Promise.reject(error);
});

// 简易版 post 请求
export const basePost = (url, data) => {
  return service({
    method: 'post',
    url,
    data
  })
};

export default service;
