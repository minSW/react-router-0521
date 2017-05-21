var path =require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: [
    './src/index.js',
    './src/style.css',
    'webpack-dev-server/client?http://0.0.0.0:4000',
    'webpack/hot/only-dev-server'
  ],

  output: {
    path: '/',
    filename: "index_bundle.js"
  },

  devServer: {
    filename: 'index_bundle.js',
    publicPath: '/',
    historyApiFallback: true,
    contentBase: './public',
    disableHostCheck: true,
    proxy: {
      "**": "http://localhost:3000" // express 서버주소
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },

  plugins: [
    HTMLWebpackPluginConfig,
    new webpack.HotModuleReplacementPlugin()
  ],

  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"]
  }
};
