const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");
module.exports = {
  entry: path.resolve(__dirname, "../src/index.js"),
  output: {
    filename: "modax.js",
    library: "mdx",
    libraryExport: "default",
    libraryTarget: "umd",
  },

  module: {
    rules: [
      {
        test: /\.scss/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpg)$/,
        loader: "url-loader",
      },

      {
        test: /\.js$/,
        use: "babel-loader",
      },

      {
        test: /\.ts$/,
        use: "ts-loader",
      },
      {
        test: /\.svg$/,
        use: {
          loader: "svg-inline-loader",
          options: {
            removeSVGTagAttrs: false,
          },
        },
      },
    ],
  },

  devServer: {
    port: 8099,
    host: '0.0.0.0'
  },
  plugins: [
    new HtmlPlugin({
      inject: false,
      template: "index.html",
    }),
  ],
};
