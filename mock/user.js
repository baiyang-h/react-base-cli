const tokens = {
  admin: {
    token: 'admin-token'
  },
  user: {
    token: 'user-token'
  }
};

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super admin',
    name: 'Super Admin'
  },
  'user-token': {
    roles: ['user'],
    introduction: 'I am an user',
    name: 'Normal Other'
  }
};

module.exports = [
  // 获取 token
  {
    url: '/user/login',
    type: 'post',
    response: req => {
      const { username } = req.body;
      const token = tokens[username];

      if(!token) {
        return {
          code: 60204,
          message: '获取token失败',
          success: false
        }
      }

      return {
        code: 20000,
        data: token,
        message: '获取token成功',
        success: true
      }
    }
  },
  // 获取用户信息
  {
    url: '/user/info',
    type: 'get',
    response: req => {
      const { token } = req.query;
      const info = users[token];

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: '获取用户信息失败',
          success: false
        }
      }

      return {
        code: 20000,
        data: info,
        message: '获取用户信息成功',
        success: true
      }
    }
  },
];
