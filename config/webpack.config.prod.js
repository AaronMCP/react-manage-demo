'use strict';
const autoprefixer = require('autoprefixer');
const fs = require('fs');
const path = require('path');
const isWsl = require('is-wsl');
const webpack = require('webpack');
const resolve = require('resolve');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const ForkTsCheckerWebpackPlugin = require('react-dev-utils/ForkTsCheckerWebpackPlugin');
const typescriptFormatter = require('react-dev-utils/typescriptFormatter');
const postcssNormalize = require('postcss-normalize');

const paths = require('./paths');
const getClientEnvironment = require("./env");

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP === 'true';
// 检测typeScript
const useTypeScript = fs.existsSync(paths.appTsConfig);
// 是否需要内联模块
const shouldInlineRuntimeChunk = process.env.INLINE_RUNTIME_CHUNK !== 'false';
const publicPath = paths.servedPath;
const publicUrl = publicPath.slice(0, 1);
const env = getClientEnvironment(publicUrl);

if (env.stringified['process.env'].NODE_ENV !== '"production"') {
  throw new Error('Production builds must have NODE_ENV=production.');
}

module.exports = {
  mode: 'production',
  bail: true,
  devtool: 'cheap-module-source-map',
  entry: [
    paths.appIndexJs,
    require.resolve("./polyfills"),
  ],
  output: {
    path: paths.appBuild,
    filename: 'static/js/[name].[hash:8].js',
    publicPath,
    devtoolModuleFilenameTemplate: info =>
      path.relative(paths.appSrc, info.absoluteResourcePath).replace(/\\/g, "/")
  },
  resolve: {
    modules: ['node_modules', paths.appNodeModules].concat(
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    ),
    extensions: ['.js', '.json', '.jsx'],
    alias: {
      'react-native': 'react-native-web',
    },
    plugins: [new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson])]
  },
  module: {
    strictExportPresence: true,
    rules: [
      // 禁用require.ensure
      // {
      //   parser: {
      //     requireEnsure: false
      //   }
      // },

      // babel处理js之前执行这些操作
      {
        test: /\.(js|jsx|ts|tsx)$/,
        enforce: 'pre',
        use: [{
          options: {
            formatter: require.resolve('react-dev-utils/eslintFormatter'),
            eslintPath: require.resolve('eslint')
          },
          loader: require.resolve('eslint-loader')
        }],
        include: paths.appSrc
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ["transform-class-properties"]
          }
        }
      },
      {
        test: /\.(jpg|png|gif|bmp|jpeg)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'static/media/[name]-[hash:8].[ext]'
        }
      },
      {
        test: /\.(css|scss)$/,
        use: [{
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              sourceMap: shouldUseSourceMap
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              indent: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer(),
                postcssNormalize()
              ]
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        loader: "file-loader",
        exclude: [/\.(js|jsx|ts|tsx)$/, /\.html$/, /\.json$/, /.(css|scss|sass)/],
        options: {
          name: "static/media/[name].[hash:8].[ext]"
        }
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      // 优化分离js块
      new TerserPlugin({
        terserOptions: {
          parse: {
            // 
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            // Disabled because of an issue with Uglify breaking seemingly valid code:
            // https://github.com/facebook/create-react-app/issues/2376
            // Pending further investigation:
            // https://github.com/mishoo/UglifyJS2/issues/2011
            comparisons: false,
            // Disabled because of an issue with Terser breaking valid code:
            // https://github.com/facebook/create-react-app/issues/5250
            // Pending futher investigation:
            // https://github.com/terser-js/terser/issues/120
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            // Turned on because emoji and regex is not minified properly using default
            // https://github.com/facebook/create-react-app/issues/2488
            ascii_only: true,
          },
        },
        // 使用多进程并行运行提高构建速度，在适用于Linux的Windows子系统上禁用
        parallel: !isWsl,
        // Enable file caching
        cache: true,
        sourceMap: shouldUseSourceMap,
      }),
      // 优化css的输出
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          map: shouldUseSourceMap ?
            {
              // `inline: false` forces the sourcemap to be output into a
              // separate file
              inline: false,
              // `annotation: true` appends the sourceMappingURL to the end of
              // the css file, helping the browser find the sourcemap
              annotation: true,
            } :
            false,
        },
      }),
      //使用service-work.js进行预先缓存文件
      new WorkboxWebpackPlugin.GenerateSW({
        clientsClaim: true,
        exclude: [/\.map$/, /asset-manifest\.json$/],
        importWorkboxFrom: 'cdn',
        navigateFallback: publicUrl + '/index.html',
        navigateFallbackBlacklist: [
          // Exclude URLs starting with /_, as they're likely an API call
          new RegExp('^/_'),
          // Exclude URLs containing a dot, as they're likely a resource in
          // public/ and not a SPA route
          new RegExp('/[^/]+\\.[^/]+$'),
        ],
      }),
    ],
    splitChunks: {
      chunks: 'all',
      name: false,
    },
    runtimeChunk: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.deployEntryHtml,
      filename: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      }
    }),
    new webpack.DefinePlugin(env.stringified),
    new ManifestPlugin({
      fileName: "asset-manifest.json",
      publicPath: publicPath,
    }),
    // Inlines the webpack runtime script. This script is too small to warrant
    // a network request.
    shouldInlineRuntimeChunk && new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime~.+[.]js/]),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // This gives some necessary context to module not found errors, such as
    // the requesting resource.
    new ModuleNotFoundPlugin(paths.appPath),
    // TypeScript type checking
    useTypeScript &&
    new ForkTsCheckerWebpackPlugin({
      typescript: resolve.sync('typescript', {
        basedir: paths.appNodeModules,
      }),
      async: true,
      useTypescriptIncrementalApi: true,
      checkSyntacticErrors: true,
      tsconfig: paths.appTsConfig,
      reportFiles: [
        '**',
        '!**/__tests__/**',
        '!**/?(*.)(spec|test).*',
        '!**/src/setupProxy.*',
        '!**/src/setupTests.*',
      ],
      watch: paths.appSrc,
      silent: true,
      // The formatter is invoked directly in WebpackDevServerUtils during development
      formatter: typescriptFormatter,
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css'
    })
  ].filter(Boolean),
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
};