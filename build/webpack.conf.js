const path = require("path");

const root = path.resolve(__dirname, "../source");
module.exports = {
  entry: { // 入口文件
    app: `${root}/src/main.js`
  },
  output: { // 输出配置
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].js",
    publicPath: "http://localhost:8080/dist"
  },
  resolve: {
    extensions: [".js", ".vue", ".sass"],
    alias: {
      "vue$": "vue/dist/vue.js",
      "static": `${root}/static`,
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
        test: /\.scss/,
        loader: "style!css!sass"
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader"
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader"
      }
    ]
  }
};
