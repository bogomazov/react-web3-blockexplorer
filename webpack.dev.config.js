/*eslint-disable*/
const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  context: path.join(__dirname, "src"),
  entry: {
    bundle: [
      "@babel/polyfill",
      "webpack-hot-middleware/client?noInfo=false",
      "./index.js",
    ],
  },
  output: {
    filename: "bundle.js",
    chunkFilename: "[name]_[chunkhash].js",
    path: path.resolve(__dirname, "/build"),
    publicPath: "/static/",
  },
  resolve: {
    extensions: [".js"],
    modules: [path.join(__dirname, "src"), "node_modules"],
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: [
            "@babel/preset-stage-2",
            "@babel/preset-react",
            "@babel/preset-env",
          ],
          plugins: ["react-hot-loader/babel"],
        },
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[path][name].[ext]?[hash:8]",
              limit: 20000,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { localIdentName: "[name]_[local]_[hash:base64:5]" },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
