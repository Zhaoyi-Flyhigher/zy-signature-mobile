const path = require("path");
module.exports = {
  mode: "production",
  devtool: false,
  entry: "./src/index.js",
  experiments: {
    outputModule: true,
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].js",
    assetModuleFilename: "svg/[hash][ext][query]",
    library: {
      type: "module",
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.svg$/,
        type: "asset/resource",
      },
    ],
  },
};
