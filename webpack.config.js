const path = require("path")

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "lib"),
  },
  module: {
    rules: [
      {
        // also added typescript files for future
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        include: path.resolve(__dirname, "src"),
        exclude: /develop/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
}
