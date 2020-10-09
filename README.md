具体细节查看 master 分支，该分支对各个配置进行了展开，这里只针对 `@craco/craco` 模块，当我们在不暴露 `webapck` 配置文件的情况下，即不执行 `npm run eject`，通过该模块来进行设置。

```bash
yarn add @craco/craco
```

具体配置可以查看[文档](!https://www.npmjs.com/package/@craco/craco#configuration-overview)，以下只显示了部分内容

```js
const path = require('path')
const mockServer = require('./mock/mock-server')
const sassResourcesLoader = require('craco-sass-resources-loader');

module.exports = {
    plugins: [
        {
            plugin: sassResourcesLoader,
            options: {
                resources: [
                    path.resolve(__dirname, './src/styles/common/variable.scss'),
                    path.resolve(__dirname, './src/styles/common/mixin.scss'),
                ],
            },
        },
    ],
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        },
        plugins: [],
        configure: {  },
        // configure: (webpackConfig, { env, paths }) => {
        //     console.log(webpackConfig)
        //     return webpackConfig;
        // }
    },
    devServer: {
        before: function(app) {
            mockServer(app)
        },
        proxy: {
            '/base-cli': {
                target: 'http://www.wttx56.com/mock/257',
                // ws: false,
                changeOrigin: true,
                pathRewrite: {
                    // '^/api/old-path': '/api/new-path', // rewrite path
                    // '^/api/remove/path': '/path', // remove base path
                },
                router: {
                    // 'dev.localhost:3000': 'http://localhost:8000',
                },
            }
        }
    },
}
```

使用 `sassResourcesLoader` 依赖，来配置 sass 全局变量。

