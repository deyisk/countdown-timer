const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    index: path.resolve(__dirname, "src", "index.js"),
  },
  output: {
    filename: "js/[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
      inject: "body",
      writePDF: {
        format: "Letter",
        margin: {
          top: "1in",
          left: "1in",
          right: "1in",
          bottom: "1in",
        },
      },
    }),
  ],

  plugins: [
    new MiniCssExtractPlugin({
      linkType: "text/css",
      filename: "css/[name].min.css",
    }),

    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "src", "index.html"),
      chunks: ["main"],
    }),
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: {
          loader: "file-loader?name=/assets/images/[name].[ext]",
        },
      },
    ],
  },
  devtool: "source-map",
  devServer: {
    static: "./dist",
  },
};
