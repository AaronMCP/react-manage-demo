const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/app.js',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'bundle.js'
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: '管理后台测试',
        hash: true,
        favicon: path.resolve(__dirname, 'public/favicon.ico'),
        meta: {
          viweport: 'width=device-width,initial-scale=1,maximum-scale=1,minimun-scale=1,user-scalable=no'
        }
      })
    ]
}