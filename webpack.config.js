const path = require("path")
const includeFolder = path.resolve(__dirname, "src")

module.exports = {
  entry: "./src/Index.js",
  mode: "production",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "lib"),
    library: "dynamic-table-react",
    libraryTarget: "umd",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        include: includeFolder,
        use: ["css-loader"],
      },
      {
        // also added typescript files for future
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        include: includeFolder,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  externals: {
    react: "react",
    "react-dom": "react-dom",
  },
}
