//eslint-disable
'use strict';

// 环境变量设置
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

// 发生未处理错误时 抛出错误
process.on('unhandledRejection', err => {
  throw err;
});

const fs = require('fs');
const chalk = require('react-dev-utils/chalk');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const clearConsole = require('react-dev-utils/clearConsole');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');

const {
  choosePort,
  createCompiler,
  prepareProxy,
  prepareUrls
} = require('react-dev-utils/WebpackDevServerUtils');
const openBroswer = require('react-dev-utils/openBrowser');
const { checkBrowsers } = require('react-dev-utils/browsersHelper');
const paths = require('../config/paths');
const createDevServerConfig = require('../config/webpackDevServer.config');

const useYarn = fs.existsSync(paths.yarnLockFile);
const isInteractive = process.stdout.isTTY; // 是否终端

// 必要文件的检查
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1);
}

// 默认端口的设置
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || '0.0.0.0';

// 浏览器配置
checkBrowsers(paths.appPath, isInteractive)
  .then(() => {
    // 确定端口
    return choosePort(HOST, DEFAULT_PORT);
  }).then( port => {
    if(port === null) {
      return;
    }
    const config = require('../config/webpack.config.dev');
    const protocol = process.env.HTTPS === 'true' ? 'https': 'http';
    const appName = require(paths.appPackageJson).name;
    // 暂时没有使用typeScript
    //const useTypeScript = fs.existsSync(paths.appTsConfig);
    const urls = prepareUrls(protocol, HOST, port);
    // const devSocket = {
    //   warnings: warnings => 
    //     devServer.sockWrite(devServer.sockets, 'warnings', warnings),
    //   errors: errors =>
    //     devServer.sockWrite(devServer.sockets, 'errors', errors),
    // };
    // webpack编译配置
    const compiler = createCompiler({
      appName,
      config,
      // devSocket,
      urls,
      useYarn,
      webpack
    });
    // 加载proxy配置
    const proxySetting = require(paths.appPackageJson).proxy;
    const proxyConfig = prepareProxy(proxySetting, paths.appPublic);
    // webpack服务配置
    const serverConfig = createDevServerConfig(
      proxyConfig,
      urls.lanUrlForConfig
    );
    const devServer = new WebpackDevServer(compiler, serverConfig);
    // 执行webpackServer
    devServer.listen(port, HOST, err => {
      if (err) {
        return console.log(err);
      }
      if (isInteractive) {
        clearConsole();
      }
      console.log(chalk.cyan('Starting the development server...\n'));
      openBroswer(urls.localUrlForBrowser);
    });

    ['SIGINT', 'SIGTERM'].forEach(function(sig) {
      process.on(sig, function() {
        devServer.close();
        process.exit();
      });
    });
  })
  .catch(err => {
    if(err && err.message) {
      console.log(err.message);
    }
    process.exit(1);
  });
