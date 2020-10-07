const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // app.use(proxy('/api', { target: 'http://localhost:5000/' }));
  app.use('/base-cli', createProxyMiddleware({ 
    target: 'http://www.wttx56.com/mock/257',
    changeOrigin: true,
    pathRewrite: {
      // '^/api/old-path': '/api/new-path', // rewrite path
      // '^/api/remove/path': '/path', // remove base path
    },
    router: {
      // 'dev.localhost:3000': 'http://localhost:8000',
    },
  }));
};
