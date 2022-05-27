import path from "path";
import nodeExternals from "webpack-node-externals";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

export default {
  mode: "production",
  target: "node",
  externals: [nodeExternals()],
  entry: "./__main__.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".wasm", ".ts", ".tsx", ".mjs", ".cjs", ".js", ".json"],
    plugins: [
      new TsconfigPathsPlugin({
        baseUrl: ".",
        configFile: "./tsconfig.json",
      }),
    ],
  },
  output: {
    path: path.join(__dirname, "build"),
  },
};
