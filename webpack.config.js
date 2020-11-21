const path = require("path")
const includeFolder = path.resolve(__dirname, "src")
const outputFolder = path.resolve(__dirname, "lib")

module.exports = (env, argv) => {
  const mode = env ? (env.mode == "dev" ? "development" : "production") : "production"
  console.log(`running in ${mode} mode`)

  return {
    entry: "./src/Index.js",
    mode,
    output: {
      filename: "index.js",
      path: outputFolder,
      library: "dynamic-table-react",
      libraryTarget: "umd",
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          include: includeFolder,
          use: ["style-loader", "css-loader"],
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
}
