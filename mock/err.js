module.exports = [
  // 获取 token
  {
    url: '/err/404',
    type: 'post',
    response: req => {
      return {
        code: 404,
        message: '404',
        success: false
      }
    }
  },
  // 获取用户信息
  {
    url: '/err/500',
    type: 'post',
    response: req => {
      return {
        code: 500,
        message: '500',
        success: false
      }
    }
  },
];
