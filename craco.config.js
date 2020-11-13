const path = require('path')
const mockServer = require('./mock/mock-server')
const sassResourcesLoader = require('craco-sass-resources-loader');

module.exports = {
    // style: {
    //     css: {
    //         loaderOptions: {
    //             sourceMap: true,
    //         }
    //     },
    //     sass: {
    //         loaderOptions: {
    //             sourceMap: true,
    //         }
    //     },
    // },
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