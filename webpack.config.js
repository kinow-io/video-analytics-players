var path = require("path")
var webpack = require("webpack")
module.exports = {
  entry: {
    clappr: "./src/clappr.js",
    flowplayer: "./src/flowplayer.js",
    main: "./src/index.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    library: "VideoAnalytics",
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"],
            plugins: [
              [
                "transform-runtime",
                {
                  polyfill: false,
                  regenerator: true
                }
              ]
            ]
          }
        }
      }
    ]
  }
}
