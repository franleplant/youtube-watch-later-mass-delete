const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  devtool: "source-map",
  entry: {
    background: "./src/background",
    popup: "./src/popup",
    contentScript: "./src/contentScript",
    options: "./src/options",
  },
  output: {
    path: path.join(__dirname, "distribution"),
    filename: "[name].js",
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "babel-loader",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "**/*",
          context: "src",
          to: "",
          filter: (path) => {
            const denyList = [".ts", ".js"];

            return !denyList.some((denied) => path.endsWith(denied));
          },
        },
      ],
    }),
  ],
};
