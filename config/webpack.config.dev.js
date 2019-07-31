const path = require("path");
const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const postcssNormalize = require("postcss-normalize");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const WatchMissingNodeModulesPlugin = require("react-dev-utils/WatchMissingNodeModulesPlugin");
const webpack = require("webpack");

const paths = require("./paths");
const getClientEnvironment = require("./env");

const publicPath = "/";
const publicUrl = "";
const env = getClientEnvironment(publicUrl);

//common function to get style loaders
const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [{
      loader: MiniCssExtractPlugin.loader
    },
    {
      loader: require.resolve("css-loader"),
      options: cssOptions
    },
    {
      loader: require.resolve("postcss-loader"),
      options: {
        indent: "postcss",
        plugins: () => [
          require("postcss-flexbugs-fixes"),
          autoprefixer({
            browsers: [">1%", "last 4 versions", "Firefox ESR", "not ie < 9"],
            flexbox: "no-2009"
          }),
          postcssNormalize()
        ]
      }
    }
  ];
  if (preProcessor) {
    loaders.push({
      loader: require.resolve(preProcessor)
    });
  }
  return loaders;
};

module.exports = {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  entry: [paths.appIndexJs, require.resolve("./polyfills")],
  output: {
    path: paths.appBuild,
    publicPath,
    filename: "static/js/bundle.js",
    chunkFilename: "static/js/[name].chunk.js",
    pathinfo: true,
    devtoolModuleFilenameTemplate: info =>
      path.relative(paths.appSrc, info.absoluteResourcePath).replace(/\\/g, "/")
  },
  module: {
    rules: [
      // Disable require.ensure as it's not a standard language feature.
      // {
      //   parser: {
      //     requireEnsure: false
      //   }
      // },

      // First, run the linter.
      // It's important to do this before Babel processes the JS.
      {
        test: /\.(js|jsx|ts|tsx)$/,
        enforce: "pre",
        use: [{
          options: {
            formatter: require.resolve("react-dev-utils/eslintFormatter"),
            eslintPath: require.resolve("eslint")
          },
          loader: require.resolve("eslint-loader")
        }],
        include: paths.appSrc
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      },
      {
        test: /\.(scss|sass)/,
        exclude: /node_modules/,
        use: getStyleLoaders({
            importLoaders: 1
          },
          "sass-loader"
        )
      },
      {
        test: /\.css$/,
        use: getStyleLoaders({
          importLoaders: 1
        })
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve("url-loader"),
        options: {
          limit: 8192,
          name: "static/media[name].[hash:8].[ext]"
        }
      },
      {
        loader: require.resolve("file-loader"),
        exclude: [
          /\.(js|mjs|jsx|ts|tsx$)/,
          /\.html$/,
          /\.json$/,
          /.(css|scss|sass)/
        ],
        options: {
          name: "static/media/[name].[hash:8].[ext]"
        }
      },
      //字体图标的配置
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [{
          loader: require.resolve("file-loader"),
          options: {
            limit: 8192,
            name: "static/media/font/[name].[ext]"
          }
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: paths.appHtml,
      title: "管理后台测试",
      inject: true,
      favicon: paths.appIco,
      meta: {
        viweport: "width=device-width,initial-scale=1,maximum-scale=1,minimun-scale=1,user-scalable=no",
        name: "Aaron"
      }
    }),
    //独立css文件
    new MiniCssExtractPlugin({
      filename: "static/css/[name].css",
      chunkFilename: "static/css/[id].css"
    }),
    new webpack.NamedModulesPlugin(),
    // Watcher doesn't work well if you mistype casing in a path so we use
    // a plugin that prints an error when you attempt to do this.
    // See https://github.com/facebook/create-react-app/issues/240
    new CaseSensitivePathsPlugin(),
    // If you require a missing module and then `npm install` it, you still have
    // to restart the development server for Webpack to discover it. This plugin
    // makes the discovery automatic so you don't have to restart.
    // See https://github.com/facebook/create-react-app/issues/186
    new WatchMissingNodeModulesPlugin(paths.appNodeModules)
  ],
  devServer: {
    contentBase: path.join(__dirname, "build"),
    compress: true,
    port: 9090
  }
};