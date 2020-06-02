const cp = require("child_process");
const fs = require("fs");
const path = require("path");
const webpack = require("webpack");

const webpackConfig = require("../config/webpack");
webpack(webpackConfig, (err, stats) => {
  if (err) {
    console.log(err);
    return;
  }
  fs.copyFileSync("dist/modax.js", "docs/modax.js");
});
