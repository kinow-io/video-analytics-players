var path = require("path")
var webpack = require("webpack")
module.exports = {
  entry: {
    clappr: "./src/clappr.js",
    flowplayer: "./src/flowplayer.js",
    videojs: "./src/videojs.js",
    main: "./src/index.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    library: "VideoAnalytics",
    libraryTarget: "umd"
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              [
                "@babel/plugin-transform-runtime",
                {
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
