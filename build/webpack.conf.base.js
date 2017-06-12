const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 生成html
const CleanWebpackPlugin = require("clean-webpack-plugin"); // 清除打包出的目录
const ExtractTextPlugin = require("extract-text-webpack-plugin"); // 提取css

const root = path.resolve(__dirname, "../source");
const config = {
  entry: { // 入口文件
    vendor: ["vue", "vue-router"],
    app: `${root}/src/main.js`
  },
  output: { // 输出配置
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].js",
    publicPath: "/"
  },
  resolve: {
    extensions: [".js", ".vue", ".sass"],
    alias: {
      "vue$": "vue/dist/vue.js",
      "src": `${root}/src`
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        enforce: "pre",
        include: [`${root}/src`]
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: [`${root}/src`]
      },
      {
        test: /\.css/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.scss/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader!sass-loader"
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "file-loader?name=imges/[name].[ext]"
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "file-loader?name=file/[name].[ext]"
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(path.resolve(__dirname, "../dist"), {
      root: path.resolve(__dirname, "../")
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor"
    }),
    new HtmlWebpackPlugin({
      template: `${root}/index.html`,
      title: "Leo",
      filename: "index.html",
      inject: true
    }),
    new webpack.LoaderOptionsPlugin({
      vue: {
          loaders: {
            css: ExtractTextPlugin.extract({
              fallback: "vue-style-loader",
              use: "css-loader"
            }),
            sass: ExtractTextPlugin.extract({
              fallback: "vue-style-loader",
              use: "css-loader!sass-loader"
            })
          }
        }
    }),
    new ExtractTextPlugin({ filename: "app.css", allChunks: true })
  ]
};

module.exports = config;
