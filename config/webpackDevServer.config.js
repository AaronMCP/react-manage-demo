'use strict';

const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const evalSourceMapMiddleware = require('react-dev-utils/evalSourceMapMiddleware');
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');
const ignoredFiles = require('react-dev-utils/ignoredFiles');
const config = require('./webpack.config.dev');
const paths = require('./paths');

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const host = process.env.HOST || '0.0.0.0';

module.exports = function (proxy, allowedHost) {
  return {
    // true时，绕过主机检查，不建议这样做，因为不检查主机的应用程序容易受到DNS重新连接攻击
    disableHostCheck: !proxy || process.env.DANGEROUSLY_DISABLE_HOST_CHECK === 'true',
    // 开启gzip
    compress: true,
    // 删除 webpackdevserver启动时的日志
    clientLogLevel: 'none',
    // 告诉服务器从哪个目录中提供内容。只有在你想要提供静态文件时才需要，默认为false，即禁用contentBase
    contentBase: paths.appPublic,
    // true时，contentBase中的文件会触发热更新
    watchContentBase: true,
    // 热更新
    hot: true,
    // 此路径下的打包文件可在浏览器中访问 默认为'/'
    publicPath: config.output.publicPath,
    // 除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见
    quiet: true,
    // 文件变化监听
    watchOptions: {
      ignored: ignoredFiles(paths.appNodeModules),
      // poll: 1000 // 每秒检查一次变动
    },
    // 通过https提供服务
    https: protocol === 'https',
    host,
    // 当出现编译器错误或警告时，在浏览器中显示全屏覆盖层。默认禁用。
    overlay: false,
    // 禁止路径中带有.
    historyApiFallback: {
      disableDotRule: true,
    },
    public: allowedHost,
    proxy,
    before(app, server) {
      // 可以从webpack获取源内容以覆盖错误
      app.use(evalSourceMapMiddleware(server));
      // 可以从运行时错误覆盖中打开文件
      app.use(errorOverlayMiddleware());
      app.use(noopServiceWorkerMiddleware());
    }
  };
};