const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");
const argv = process.argv;
const isDebug = !argv.includes("--release");

const DIST_DTR = path.resolve(__dirname,'./dist');

module.exports = {
  mode: isDebug ? "development" : "production",
  output: {
    libraryTarget: "umd",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.(css|less)$/i,
        use: [
          "isomorphic-style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              esModule: false, // !!!important
            },
          },
          "postcss-loader",
          "less-loader",
        ],
      },
    ],
  },
  devtool: isDebug ? "inline-cheap-module-source-map" : "source-map",
  optimization:{
    // minimize: true,
    // minimizer: [
    //   new TerserPlugin({
    //     extractComments: false,
    //   })
    // ],
    splitChunks:{

    }
  }
};
