const path = require('path');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    name: 'realworld-react',
    mode: 'development', // 실서비스: production
    devtool: 'eval', // 빠르게
    resolve: { // 파일 확장자 적용
        extensions: ['.js', '.jsx']
    },

    // 아래가 중요!
    entry: {
        app: ['./src/index'],
    }, // 입력

    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            options: {
                presets: [
                    ['@babel/preset-env', {
                        targets: {
                            browsers: ['> 1% in KR'],
                        },
                        debug: true,
                    }],
                    '@babel/preset-react'
                ],
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                    'react-refresh/babel'
                ],

            }
        }],
    },
    plugins: [
        new RefreshWebpackPlugin(),
    ],

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
        publicPath: '/dist/',
    }, // 출력
    devServer: {
        devMiddleware: { publicPath: '/dist' },
        static: path.join(__dirname, 'public'),
        historyApiFallback: true, // HTML5 History API를 사용하는 SPA에 유용
        hot: true,
        port: 8081, // 원하는 포트 번호
        open: true
    }
};